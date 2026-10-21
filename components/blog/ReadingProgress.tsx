import { useEffect, useRef, type RefObject } from "react";

type ReadingProgressProps = {
  targetRef: RefObject<HTMLElement | null>;
};

/**
 * 1px progress line sitting on the bottom edge of the navbar, with a small
 * pulsing dot at its leading end. Progress is measured over the article body
 * only (not related posts or the footer). Writes CSS variables straight to
 * the DOM (--p for the progress, --rp-top for the navbar edge), so scrolling
 * never re-renders React; the line and the dot are both driven by transforms
 * in globals.css.
 */
export default function ReadingProgress({ targetRef }: ReadingProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  // The navbar is fixed and its height depends on the breakpoint (and changes
  // when the mobile drawer opens), so the edge is measured instead of hardcoded.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const nav = document.querySelector<HTMLElement>(".navbar");
    if (!nav) return;

    const place = () => {
      bar.style.setProperty("--rp-top", `${nav.getBoundingClientRect().bottom}px`);
    };
    place();

    const observer = new ResizeObserver(place);
    observer.observe(nav);
    window.addEventListener("resize", place);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
    };
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    const target = targetRef.current;
    if (!bar || !target) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance <= 0 ? (rect.top <= 0 ? 1 : 0) : -rect.top / distance;
      const p = Math.min(1, Math.max(0, progress));
      bar.style.setProperty("--p", p.toFixed(4));
      bar.toggleAttribute("data-started", p > 0);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [targetRef]);

  return (
    <div ref={barRef} className="blog-reading-progress" aria-hidden="true">
      <span className="blog-reading-progress-line" />
      <span className="blog-reading-progress-track">
        <span className="blog-reading-progress-dot" />
      </span>
    </div>
  );
}
