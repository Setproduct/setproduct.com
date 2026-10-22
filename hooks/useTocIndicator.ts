import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

// useLayoutEffect warns during SSR; on the server there is nothing to measure.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Matches the H3 group transition in globals.css (280ms) plus a margin. */
const FOLLOW_MS = 340;
/** Glide between items; same duration as the font-weight change in CSS. */
const GLIDE_MS = 320;

const KEYS = ["--x", "--y", "--w", "--h"] as const;
type Box = Record<(typeof KEYS)[number], number>;

/** Folding H3 groups in the TOC (see TableOfContents.tsx). */
const COLLAPSIBLE = ".blogpost_toc-sub";

/** cubic-bezier(0.22, 1, 0.36, 1), the easing used across the TOC. */
function easeOut(t: number): number {
  const x1 = 0.22;
  const y1 = 1;
  const x2 = 0.36;
  const y2 = 1;
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  // Newton iterations for the curve parameter that gives x = t.
  let s = t;
  for (let i = 0; i < 6; i++) {
    const x = ((ax * s + bx) * s + cx) * s - t;
    const dx = (3 * ax * s + 2 * bx) * s + cx;
    if (Math.abs(x) < 1e-4 || dx === 0) break;
    s -= x / dx;
  }
  s = Math.min(1, Math.max(0, s));
  return ((ay * s + by) * s + cy) * s;
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Moves one shared indicator element to the active item of a list
 * (the "focus relay" pattern).
 *
 * The motion is a small rAF tween instead of a CSS transition. The target can
 * move while the indicator travels (the previous H3 group folds up after a
 * short delay, the bold weight widens the active link). A CSS transition
 * restarts from scratch on every new value, which made the indicator stall
 * near the end and arrive late. The tween keeps a fixed 320ms clock and
 * re-measures the target every frame: `value = from + (target - from) * ease(t)`,
 * so a moving target only bends the path and the arrival time stays the same.
 *
 * Writes `--x`, `--y`, `--w`, `--h` on the indicator and toggles `is-visible`;
 * the CSS decides how to use the box (a pill uses all four values, a side
 * line uses `--x`, `--y`, `--h`). The indicator lives inside the scrolling
 * list, so scrolling the list needs no work.
 */
export function useTocIndicator(
  listRef: RefObject<HTMLElement | null>,
  indicatorRef: RefObject<HTMLElement | null>,
  activeSelector: string | null,
  /**
   * Changes when a height animation starts inside the list (an H3 group
   * unfolding). For FOLLOW_MS afterwards the indicator is re-measured every
   * frame, so it rides along with the moving items.
   */
  followKey?: unknown,
) {
  const shown = useRef(false);
  const current = useRef<Box | null>(null);
  const targetEl = useRef<HTMLElement | null>(null);
  const glide = useRef<{ from: Box; start: number } | null>(null);
  const followUntil = useRef(0);
  const frame = useRef(0);
  const placeRef = useRef<() => void>(() => {});
  const loopRef = useRef<() => void>(() => {});

  const write = (indicator: HTMLElement, box: Box) => {
    for (const key of KEYS) indicator.style.setProperty(key, `${box[key]}px`);
    current.current = box;
  };

  placeRef.current = () => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const target = activeSelector ? list.querySelector<HTMLElement>(activeSelector) : null;
    if (!target) {
      indicator.classList.remove("is-visible");
      shown.current = false;
      targetEl.current = null;
      glide.current = null;
      return;
    }

    const box = list.getBoundingClientRect();
    const rect = target.getBoundingClientRect();

    // Aim at where the target will end up, not where it is right now. Only
    // the group that contains (or follows) the active item stays open, so
    // every collapsible group above the target is going to fold to zero.
    // Subtracting their current height gives a stable destination while they
    // fold, and the indicator never overshoots and comes back.
    let shift = 0;
    for (const group of Array.from(list.querySelectorAll<HTMLElement>(COLLAPSIBLE))) {
      if (group.contains(target)) continue;
      if (group.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING) {
        shift += group.getBoundingClientRect().height;
      }
    }

    const to: Box = {
      "--x": rect.left - box.left + list.scrollLeft,
      "--y": rect.top - box.top + list.scrollTop - shift,
      "--w": rect.width,
      "--h": rect.height,
    };

    // First placement or re-appearing: snap, never fly in from the corner.
    if (!shown.current || !current.current) {
      write(indicator, to);
      targetEl.current = target;
      glide.current = null;
      indicator.classList.add("is-visible");
      shown.current = true;
      return;
    }

    const now = performance.now();
    if (target !== targetEl.current) {
      targetEl.current = target;
      glide.current = prefersReducedMotion() ? null : { from: { ...current.current }, start: now };
    }

    const g = glide.current;
    if (!g) {
      write(indicator, to);
      return;
    }
    const t = Math.min(1, (now - g.start) / GLIDE_MS);
    const e = easeOut(t);
    const next = {} as Box;
    for (const key of KEYS) next[key] = g.from[key] + (to[key] - g.from[key]) * e;
    write(indicator, next);
    if (t >= 1) glide.current = null;
    else loopRef.current();
  };

  // One rAF loop while a glide or a follow window is active.
  loopRef.current = () => {
    if (frame.current) return;
    const tick = () => {
      frame.current = 0;
      placeRef.current();
      if (glide.current || performance.now() < followUntil.current) loopRef.current();
    };
    frame.current = requestAnimationFrame(tick);
  };

  // Re-measure after every commit: the active item or the unfolded H3 group
  // may have changed.
  useIsoLayoutEffect(() => {
    placeRef.current();
  });

  useEffect(() => {
    if (followKey === undefined) return;
    followUntil.current = performance.now() + FOLLOW_MS;
    loopRef.current();
  }, [followKey]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => placeRef.current());
    observer.observe(list);
    for (const child of Array.from(list.children)) observer.observe(child);
    return () => observer.disconnect();
  }, [listRef]);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
    },
    [],
  );
}
