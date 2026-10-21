import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

// useLayoutEffect warns during SSR; on the server there is nothing to measure.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Matches the H3 group transition in globals.css (280ms) plus a margin. */
const FOLLOW_MS = 340;

/**
 * Moves one shared indicator element to the active item of a list
 * (the "focus relay" pattern).
 *
 * The hook only measures. It writes `--x`, `--y`, `--w`, `--h` on the
 * indicator and toggles `is-visible`; every bit of motion is a CSS
 * transition, and the CSS decides how to use the box (a pill uses all four
 * values, a side line uses only `--x`, `--y`, `--h`).
 *
 * Cost: one measurement per render of the TOC (a handful per article, the
 * TOC re-renders only when the active section changes) plus a
 * ResizeObserver for late layout changes (font load, line clamp, window
 * resize). There is no scroll listener: the indicator lives inside the
 * scrolling list, so it scrolls together with the items.
 *
 * The first placement, and re-appearing after being hidden, skip the
 * transition so the indicator never flies in from the corner.
 */
export function useTocIndicator(
  listRef: RefObject<HTMLElement | null>,
  indicatorRef: RefObject<HTMLElement | null>,
  activeSelector: string | null,
  /**
   * Changes when a height animation starts inside the list (an H3 group
   * unfolding). For FOLLOW_MS afterwards the indicator is re-measured every
   * frame, so it rides along with the moving items instead of jumping at
   * the end.
   */
  followKey?: unknown,
) {
  const shown = useRef(false);
  const placeRef = useRef<() => void>(() => {});

  placeRef.current = () => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const target = activeSelector ? list.querySelector<HTMLElement>(activeSelector) : null;
    if (!target) {
      indicator.classList.remove("is-visible");
      shown.current = false;
      return;
    }

    const box = list.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    const values: Record<string, number> = {
      "--x": Math.round(rect.left - box.left + list.scrollLeft),
      "--y": Math.round(rect.top - box.top + list.scrollTop),
      "--w": Math.round(rect.width),
      "--h": Math.round(rect.height),
    };
    const apply = () => {
      for (const [name, value] of Object.entries(values)) {
        indicator.style.setProperty(name, `${value}px`);
      }
    };

    if (shown.current) {
      apply();
      return;
    }

    // Snap into place without animating, then hand motion back to CSS.
    indicator.style.transition = "none";
    apply();
    void indicator.offsetWidth;
    indicator.style.transition = "";
    indicator.classList.add("is-visible");
    shown.current = true;
  };

  // Re-measure after every commit: the active item, the unfolded H3 group or
  // the bold weight of the active item may all have moved things around.
  useIsoLayoutEffect(() => {
    placeRef.current();
  });

  useEffect(() => {
    if (followKey === undefined) return;
    let frame = 0;
    const until = performance.now() + FOLLOW_MS;
    const tick = () => {
      placeRef.current();
      if (performance.now() < until) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [followKey]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => placeRef.current());
    observer.observe(list);
    for (const child of Array.from(list.children)) observer.observe(child);
    return () => observer.disconnect();
  }, [listRef]);
}
