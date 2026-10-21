import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useTocIndicator } from "../../hooks/useTocIndicator";
import type { BlogHeading } from "../../types/blog";

export type TocItem = BlogHeading;

type TocEntry = TocItem & { parentId: string; position: number };

type TocSection = TocEntry & { children: TocEntry[] };

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

/** Groups the flat list into H2 sections with their H3 children. */
function buildSections(entries: TocEntry[]): TocSection[] {
  const sections: TocSection[] = [];
  for (const entry of entries) {
    if (entry.level === 2 || sections.length === 0) {
      sections.push({ ...entry, children: [] });
    } else {
      sections[sections.length - 1].children.push(entry);
    }
  }
  return sections;
}

/**
 * How long the reader has to stay in a section before its H3 group unfolds.
 * Fast scrolling through several sections then only moves the H2 pill and
 * never makes the list pump open and shut.
 */
const EXPAND_DELAY_MS = 150;

/** Height transition of the H3 group, see .blogpost_toc-sub in globals.css. */
const GROUP_MS = 280;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Desktop table of contents (hidden at 479px and below, see .blogpost_toc in
 * globals.css). H2 are always listed; H3 unfold only under the H2 the reader
 * is currently in, so a 40-heading post still fits the sidebar. The list has
 * its own scroll and keeps the active item in view.
 *
 * H3 groups are always in the markup and unfold with a height transition
 * (grid rows 0fr → 1fr), so the items below slide instead of jumping. The
 * unfold waits EXPAND_DELAY_MS after the section changes; a click in the TOC
 * or reduced motion unfolds at once.
 *
 * The highlight is one shared pill (H2) and one shared side line (H3) that
 * glide between items instead of each link switching its own background.
 */
export default function TableOfContents({
  items,
  activeId,
  onNavigate,
  title = "On this page",
}: TableOfContentsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const olRef = useRef<HTMLOListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const fadeRef = useRef<HTMLSpanElement>(null);
  const entries = useMemo(() => buildTocEntries(items), [items]);
  const sections = useMemo(() => buildSections(entries), [entries]);
  const activeParentId = entries.find((entry) => entry.id === activeId)?.parentId ?? "";

  const [expandedId, setExpandedId] = useState(activeParentId);
  const expandNow = useRef(false);

  useEffect(() => {
    if (activeParentId === expandedId) return;
    if (expandNow.current || prefersReducedMotion()) {
      expandNow.current = false;
      setExpandedId(activeParentId);
      return;
    }
    const timer = window.setTimeout(() => setExpandedId(activeParentId), EXPAND_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeParentId, expandedId]);

  useTocIndicator(
    listRef,
    pillRef,
    activeParentId ? ".blogpost_navigation-link.fs-cmsfilter_active" : null,
    expandedId,
  );
  useTocIndicator(
    listRef,
    lineRef,
    activeId && activeId !== activeParentId ? ".blogpost_toc-sub.is-open .is-sub .is-active" : null,
    expandedId,
  );

  // Progressive blur at the bottom edge: shown only while there is more list
  // below. State goes straight to data attributes, so scrolling the list
  // never re-renders React.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => {
      const overflow = list.scrollHeight - list.clientHeight > 1;
      const atEnd = list.scrollTop + list.clientHeight >= list.scrollHeight - 1;
      list.toggleAttribute("data-more", overflow && !atEnd);
    };
    update();
    list.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(list);
    if (olRef.current) observer.observe(olRef.current);
    return () => {
      list.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  // Keep the active item in view. When a group has just started to unfold or
  // fold, wait for the height transition so the scroll target is measured in
  // its final place and the list does not scroll twice.
  const lastExpanded = useRef(expandedId);
  useEffect(() => {
    const groupMoved = lastExpanded.current !== expandedId;
    lastExpanded.current = expandedId;
    const delay = groupMoved && !prefersReducedMotion() ? GROUP_MS : 0;

    const timer = window.setTimeout(() => {
      const list = listRef.current;
      if (!list || list.scrollHeight <= list.clientHeight) return;
      // An H3 inside a still folded group has no height yet: aim at its H2.
      const targetId = activeParentId === expandedId ? activeId || activeParentId : activeParentId;
      if (!targetId) return;
      const el = list.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(targetId)}"]`);
      if (!el) return;
      const box = list.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      const top = rect.top - box.top + list.scrollTop;
      // For an H2 measure only its own link, not the unfolded group under it.
      const link = el.querySelector<HTMLElement>(":scope > .blogpost_navigation-link") ?? el;
      const bottom = top + link.offsetHeight;
      const gap = 8;
      // Keep the active item clear of the blurred bottom edge.
      const bottomGap = (fadeRef.current?.offsetHeight ?? 0) + gap;
      if (top - gap < list.scrollTop) {
        list.scrollTo({ top: top - gap, behavior: "smooth" });
      } else if (bottom + bottomGap > list.scrollTop + list.clientHeight) {
        list.scrollTo({ top: bottom + bottomGap - list.clientHeight, behavior: "smooth" });
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [activeId, activeParentId, expandedId]);

  if (items.length === 0) return null;

  const renderLink = (entry: TocEntry) => {
    const isH3 = entry.level === 3;
    const isCurrent = entry.id === activeId;
    const isActive = isH3 ? isCurrent : entry.id === activeParentId;
    return (
      <a
        href={`#${entry.id}`}
        aria-current={isCurrent ? "location" : undefined}
        className={`blogpost_navigation-link w-inline-block${
          isActive ? (isH3 ? " is-active" : " fs-cmsfilter_active") : ""
        }`}
        onClick={() => {
          expandNow.current = true;
          onNavigate(entry, entry.position);
        }}
      >
        <span className={`blogpost_navigation-text ${isH3 ? "text-size-tiny" : "text-size-small"}`}>
          {entry.text}
        </span>
      </a>
    );
  };

  return (
    <nav aria-label="Table of contents" className="blogpost_toc">
      <p className="text-size-medium text-weight-bold">{title}</p>
      <div className="spacer-8" />
      <div ref={listRef} className="blogpost_toc-scroll">
        <span ref={pillRef} className="blogpost_toc-pill" aria-hidden="true" />
        <span ref={lineRef} className="blogpost_toc-line" aria-hidden="true" />
        <ol ref={olRef} className="blogpost_toc-list">
          {sections.map((section) => {
            const isOpen = section.id === expandedId;
            return (
              <li key={section.id} data-toc-id={section.id} className="blogpost_navigation-link-wr">
                {renderLink(section)}
                {section.children.length > 0 ? (
                  <div className={`blogpost_toc-sub${isOpen ? " is-open" : ""}`} inert={!isOpen}>
                    <ol className="blogpost_toc-sub-list">
                      {section.children.map((child, index) => (
                        <li
                          key={child.id}
                          data-toc-id={child.id}
                          className="blogpost_navigation-link-wr is-sub"
                          style={{ "--i": index } as CSSProperties}
                        >
                          {renderLink(child)}
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
        <span ref={fadeRef} className="blogpost_toc-fade" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>
    </nav>
  );
}
