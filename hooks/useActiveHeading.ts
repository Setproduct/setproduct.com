import { useCallback, useEffect, useRef, useState } from "react";

let settleToken = 0;

/** Fallback when the heading has no computed scroll-margin-top. */
const FALLBACK_OFFSET = 130;
/** Extra px below the scroll-margin line that still counts as "reached". */
const LINE_TOLERANCE = 12;
/** How long a click-selected heading wins over scroll tracking. */
const CLICK_LOCK_MS = 1200;
/** Post-jump correction for late layout shifts (lazy images). */
const SETTLE_STEP_MS = 700;
const SETTLE_ATTEMPTS = 3;
const SETTLE_TOLERANCE = 4;

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
  const settleTimer = useRef<number | undefined>(undefined);
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
      window.clearTimeout(settleTimer.current);
    },
    [],
  );

  /**
   * Highlight a heading right away on click, before smooth scroll ends.
   *
   * Lazy images above or around the target finish loading after the jump and
   * change height (their width/height attributes are generic), which pushes
   * the heading away from the reading line. A few short follow-up checks pull
   * it back into place.
   */
  const selectHeading = useCallback((id: string) => {
    lockUntil.current = Date.now() + CLICK_LOCK_MS;
    clickedId.current = id;
    settleUntil.current = Date.now() + SETTLE_STEP_MS * (SETTLE_ATTEMPTS + 1);
    setActiveId(id);
    window.clearTimeout(unlockTimer.current);
    unlockTimer.current = window.setTimeout(() => {
      lockUntil.current = 0;
      recompute.current();
    }, CLICK_LOCK_MS);

    window.clearTimeout(settleTimer.current);
    const token = ++settleToken;
    const cancel = () => {
      settleToken += 1;
      window.clearTimeout(settleTimer.current);
    };
    // Any real user input stops the correction so it never fights the reader.
    window.addEventListener("wheel", cancel, { once: true, passive: true });
    window.addEventListener("touchstart", cancel, { once: true, passive: true });
    window.addEventListener("keydown", cancel, { once: true });
    let attempts = 0;
    const settle = () => {
      if (token !== settleToken) return;
      const el = document.getElementById(id);
      if (!el) return;
      const margin = parseFloat(window.getComputedStyle(el).scrollMarginTop) || 0;
      const diff = el.getBoundingClientRect().top - margin;
      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
      if (Math.abs(diff) > SETTLE_TOLERANCE && !(atBottom && diff > 0)) {
        window.scrollTo({ top: window.scrollY + diff, behavior: "auto" });
      }
      attempts += 1;
      if (attempts < SETTLE_ATTEMPTS) settleTimer.current = window.setTimeout(settle, SETTLE_STEP_MS);
    };
    settleTimer.current = window.setTimeout(settle, SETTLE_STEP_MS);
  }, []);

  return { activeId, selectHeading };
}
