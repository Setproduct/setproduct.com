import { useCallback, useEffect, useRef, useState } from "react";

/** Fallback when the heading has no computed scroll-margin-top. */
const FALLBACK_OFFSET = 130;
/** Extra px below the scroll-margin line that still counts as "reached". */
const LINE_TOLERANCE = 12;
/** How long a click-selected heading wins over scroll tracking. */
const CLICK_LOCK_MS = 1200;
/** Glide duration grows with distance, within these bounds. */
const GLIDE_MIN_MS = 450;
const GLIDE_MAX_MS = 1000;
/** After the glide the heading stays pinned while late images load. */
const PIN_MS = 1500;
const PIN_TOLERANCE = 2;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function headingTarget(el: HTMLElement) {
  const margin = parseFloat(window.getComputedStyle(el).scrollMarginTop) || 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(max, window.scrollY + el.getBoundingClientRect().top - margin));
}

/**
 * Scroll-spy for a table of contents.
 *
 * The active heading is the last one whose top edge has already crossed the
 * reading line (the heading's own scroll-margin-top). This keeps the item
 * highlighted for the whole section, not only while its heading is on screen,
 * and works the same when scrolling up or down.
 *
 * Performance: one passive scroll listener throttled with rAF, state is
 * updated only when the active id actually changes, so the TOC re-renders a
 * handful of times per article instead of every frame.
 */
export function useActiveHeading(ids: readonly string[]) {
  const [activeId, setActiveId] = useState("");
  const lockUntil = useRef(0);
  const clickedId = useRef("");
  const settleUntil = useRef(0);
  const recompute = useRef<() => void>(() => {});
  const unlockTimer = useRef<number | undefined>(undefined);
  const stopGlide = useRef<() => void>(() => {});
  const key = ids.join("|");

  useEffect(() => {
    if (!key) return;

    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    let frame = 0;
    let line = FALLBACK_OFFSET;

    const measureLine = () => {
      const margin = parseFloat(window.getComputedStyle(elements[0]).scrollMarginTop);
      line = (Number.isFinite(margin) && margin > 0 ? margin : FALLBACK_OFFSET) + LINE_TOLERANCE;
    };

    const compute = () => {
      frame = 0;
      if (Date.now() < lockUntil.current) return;
      let current = "";
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }

      // At the very bottom of the page the last sections can never reach the
      // reading line. If the reader jumped there from the TOC, keep the
      // clicked heading highlighted while it is on screen.
      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
      if (atBottom && clickedId.current) {
        const clicked = elements.find((el) => el.id === clickedId.current);
        if (clicked && clicked.getBoundingClientRect().top < window.innerHeight) {
          current = clicked.id;
        }
      } else if (!atBottom && Date.now() > settleUntil.current) {
        clickedId.current = "";
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };
    const handleResize = () => {
      measureLine();
      schedule();
    };
    const handleScrollEnd = () => {
      lockUntil.current = 0;
      schedule();
    };

    recompute.current = schedule;
    measureLine();
    compute();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("scrollend", handleScrollEnd);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scrollend", handleScrollEnd);
      if (frame) window.cancelAnimationFrame(frame);
      recompute.current = () => {};
    };
  }, [key]);

  useEffect(
    () => () => {
      window.clearTimeout(unlockTimer.current);
      stopGlide.current();
    },
    [],
  );

  /**
   * Highlight a heading right away on click and glide the page to it.
   *
   * The glide is driven by rAF instead of the native smooth scroll: lazy
   * images finish loading during the jump and change height, which moves the
   * heading. Native smooth scroll keeps its old target, and any mid-flight
   * correction restarts it from zero speed, so the page (and the reading
   * progress dot) visibly stalls near the end. Here the target is re-read on
   * every frame, so the motion stays one continuous curve. After landing the
   * heading stays pinned for a moment while late images settle.
   *
   * Any real user input (wheel, touch, keys) stops it at once.
   */
  const selectHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    lockUntil.current = Date.now() + CLICK_LOCK_MS;
    clickedId.current = id;
    setActiveId(id);
    window.clearTimeout(unlockTimer.current);
    unlockTimer.current = window.setTimeout(() => {
      lockUntil.current = 0;
      recompute.current();
    }, CLICK_LOCK_MS);

    stopGlide.current();
    if (!el) return;
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(window.history.state, "", `#${id}`);
    }

    const startY = window.scrollY;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const distance = Math.abs(headingTarget(el) - startY);
    const duration = reduced
      ? 0
      : Math.min(GLIDE_MAX_MS, Math.max(GLIDE_MIN_MS, 300 + Math.sqrt(distance) * 6));
    settleUntil.current = Date.now() + duration + PIN_MS;

    let frame = 0;
    const startedAt = performance.now();
    const stop = () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
      stopGlide.current = () => {};
    };
    const step = (now: number) => {
      const elapsed = now - startedAt;
      const target = headingTarget(el);
      if (elapsed < duration) {
        const y = startY + (target - startY) * easeInOutCubic(elapsed / duration);
        // "instant" overrides `scroll-behavior: smooth` from <html>.
        window.scrollTo({ top: y, behavior: "instant" });
      } else {
        if (Math.abs(target - window.scrollY) > PIN_TOLERANCE) {
          window.scrollTo({ top: target, behavior: "instant" });
        }
        if (elapsed >= duration + PIN_MS) return stop();
      }
      frame = window.requestAnimationFrame(step);
    };
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    stopGlide.current = stop;
    frame = window.requestAnimationFrame(step);
  }, []);

  return { activeId, selectHeading };
}
