import { useCallback, useMemo } from "react";
import { event } from "../lib/gtag";
import { useActiveHeading } from "./useActiveHeading";
import type { BlogHeading } from "../types/blog";

/** Below this many H2 a table of contents adds noise, not navigation. */
export const MIN_TOC_SECTIONS = 3;

/**
 * Shared wiring for article pages (blog, resources, license): filters out
 * short articles, runs the scroll-spy once for both the desktop sidebar and
 * the mobile bar, and reports TOC usage to GA4.
 */
export function useArticleToc(headings: BlogHeading[], page: string) {
  const items = useMemo(
    () =>
      headings.filter((h) => h.level === 2).length >= MIN_TOC_SECTIONS ? headings : [],
    [headings],
  );
  const ids = useMemo(() => items.map((h) => h.id), [items]);
  const { activeId, selectHeading } = useActiveHeading(ids);

  const navigate = useCallback(
    (location: "sidebar" | "mobile") => (item: BlogHeading, position: number) => {
      selectHeading(item.id);
      event("toc_click", {
        location,
        page,
        heading_id: item.id,
        heading_level: item.level,
        position,
        total: items.length,
      });
    },
    [selectHeading, page, items.length],
  );

  const onSidebarNavigate = useMemo(() => navigate("sidebar"), [navigate]);
  const onMobileNavigate = useMemo(() => navigate("mobile"), [navigate]);
  const onMobileOpen = useCallback(() => event("toc_open", { location: "mobile", page }), [page]);

  return { items, activeId, onSidebarNavigate, onMobileNavigate, onMobileOpen };
}
