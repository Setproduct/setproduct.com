import { useEffect, useRef, type RefObject } from "react";

type ReadingProgressProps = {
  targetRef: RefObject<HTMLElement | null>;
};

/**
 * 1px progress line pinned to the top edge of the viewport, with a small
 * pulsing dot at its leading end. Progress is measured over the article body
 * only (not related posts or the footer). Writes one CSS variable (--p,
 * 0..1) straight to the DOM, so scrolling never re-renders React; the line
 * and the dot are both driven by transforms in globals.css.
 */
export default function ReadingProgress({ targetRef }: ReadingProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

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
