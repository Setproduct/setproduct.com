import { useEffect, useState } from "react";

/** Anything with a `current` number: a ref filled by the layout. */
type OffsetSource = { readonly current: number };

/** How far below the sticky bars a section counts as "being read". */
const READING_LINE = 32;

/**
 * Scroll spy for the docs navigation.
 *
 * The active section is the last one whose top has crossed the reading line
 * (the height of the sticky bars plus READING_LINE). At the very bottom of the
 * page the last section wins even if it is too short to reach the line.
 * One passive scroll listener, throttled to one check per frame, and state
 * changes only when the id changes.
 */
export function useActiveSection(ids: readonly string[], offset: OffsetSource): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (list.length === 0) {
      setActiveId(null);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const line = offset.current + READING_LINE;
      let next: string | null = null;

      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) next = id;
        else break;
      }

      const root = document.documentElement;
      const atBottom = window.scrollY > 0 && window.innerHeight + window.scrollY >= root.scrollHeight - 2;
      if (atBottom) next = list[list.length - 1];

      setActiveId((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key, offset]);

  return activeId;
}
