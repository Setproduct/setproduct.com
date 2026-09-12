import { useEffect, type RefObject } from "react";

/**
 * JavaScript fallback for the hero background parallax.
 *
 * The primary implementation is pure CSS (`animation-timeline: view()` in
 * `styles/globals.css`). Safari before version 26 and older Firefox builds do
 * not understand scroll-driven animations, so their `@supports` block is
 * skipped entirely and the background would stay frozen against the viewport.
 *
 * This hook only attaches a scroll listener when the native CSS path is
 * unavailable, so browsers with support keep the zero-JS route. It mirrors the
 * exact travel of the `hero-parallax` keyframes (±6% of the layer height) and
 * respects the same `prefers-reduced-motion` and breakpoint conditions.
 */
export function useHeroParallax(
  sectionRef: RefObject<HTMLElement | null>,
  layerRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer) return;

    // Native scroll-driven animations are available — CSS owns the transform.
    if (
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline: view()")
    ) {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 991px)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;

    const update = () => {
      frame = 0;

      // Match the CSS media queries: desktop only, motion allowed.
      if (!desktopQuery.matches || reducedQuery.matches) {
        layer.style.transform = "";
        return;
      }

      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height || 1;
      const layerHeight = layer.offsetHeight || sectionHeight;

      // 0 when the hero top reaches the viewport top, 1 once it scrolled away.
      const raw = -rect.top / sectionHeight;
      const progress = Math.min(Math.max(raw, 0), 1);

      // ±6% of the layer height, identical to the hero-parallax keyframes.
      // The layer has 12% slack top and bottom, so no edge gap can appear.
      const shift = ((progress * 12 - 6) / 100) * layerHeight;

      layer.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    desktopQuery.addEventListener("change", onScroll);
    reducedQuery.addEventListener("change", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktopQuery.removeEventListener("change", onScroll);
      reducedQuery.removeEventListener("change", onScroll);
      layer.style.transform = "";
    };
  }, [sectionRef, layerRef]);
}
