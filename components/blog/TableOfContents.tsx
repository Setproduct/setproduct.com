import { useEffect, useMemo, useRef } from "react";
import type { BlogHeading } from "../../types/blog";

export type TocItem = BlogHeading;

type TocEntry = TocItem & { parentId: string; position: number };

type TableOfContentsProps = {
  items: TocItem[];
  activeId: string;
  onNavigate: (item: TocItem, position: number) => void;
  title?: string;
};

/** Attaches each H3 to the H2 above it. Position is 1-based in document order. */
export function buildTocEntries(items: TocItem[]): TocEntry[] {
  let parentId = "";
  return items.map((item, index) => {
    if (item.level === 2) parentId = item.id;
    return { ...item, parentId: item.level === 2 ? item.id : parentId, position: index + 1 };
  });
}

/**
 * Desktop table of contents (hidden below 992px, see .blogpost_toc in
 * globals.css). H2 are always listed; H3 unfold only under the H2 the reader
 * is currently in, so a 40-heading post still fits the sidebar. The list has
 * its own scroll and keeps the active item in view.
 */
export default function TableOfContents({
  items,
  activeId,
  onNavigate,
  title = "On this page",
}: TableOfContentsProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const entries = useMemo(() => buildTocEntries(items), [items]);
  const activeParentId = entries.find((entry) => entry.id === activeId)?.parentId ?? "";
  const visible = entries.filter(
    (entry) => entry.level === 2 || (activeParentId !== "" && entry.parentId === activeParentId),
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list || list.scrollHeight <= list.clientHeight) return;
    const targetId = activeId || activeParentId;
    if (!targetId) return;
    const el = list.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(targetId)}"]`);
    if (!el) return;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    const gap = 8;
    if (top - gap < list.scrollTop) {
      list.scrollTo({ top: top - gap, behavior: "smooth" });
    } else if (bottom + gap > list.scrollTop + list.clientHeight) {
      list.scrollTo({ top: bottom + gap - list.clientHeight, behavior: "smooth" });
    }
  }, [activeId, activeParentId]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="blogpost_toc">
      <p className="text-size-medium text-weight-bold">{title}</p>
      <div className="spacer-16" />
      <ol ref={listRef} className="blogpost_toc-list">
        {visible.map((entry) => {
          const isH3 = entry.level === 3;
          const isCurrent = entry.id === activeId;
          const isActive = isH3 ? isCurrent : entry.id === activeParentId;
          return (
            <li
              key={entry.id}
              data-toc-id={entry.id}
              className={`blogpost_navigation-link-wr${isH3 ? " is-sub" : ""}`}
            >
              <a
                href={`#${entry.id}`}
                aria-current={isCurrent ? "location" : undefined}
                className={`blogpost_navigation-link w-inline-block${
                  isActive ? (isH3 ? " is-active" : " fs-cmsfilter_active") : ""
                }`}
                onClick={() => onNavigate(entry, entry.position)}
              >
                <span
                  className={`blogpost_navigation-text ${isH3 ? "text-size-small" : "text-size-regular"}`}
                >
                  {entry.text}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
