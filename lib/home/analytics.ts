import { useEffect, type MouseEvent } from "react";
import { describeHref, trackNav } from "../nav/analytics";

/**
 * GA4 instrumentation for the home page.
 *
 * Markup contract:
 * - every home block has `data-home-section="<id>"` (hero, feed, publish_band…);
 * - a clickable card or row may carry `data-home-position="<n>"` (1-based),
 *   so reports show which slot in a block gets the clicks.
 *
 * Events:
 * - `home_click`: one per click (left or middle button) on a link or button
 *   inside a home section. Params: section, position, link_url, link_text,
 *   outbound, page_path.
 * - `home_section_view`: once per section per page view, when the top of the
 *   section crosses 60% of the viewport height. Params: section, order.
 *
 * Publish links additionally fire `publish_cta_click` through the global
 * listener in lib/publish.ts; the two events answer different questions
 * (where on the home page vs. which placement sells), so both are kept.
 */

export type HomeSection =
  | "hero"
  | "feed"
  | "publish_band"
  | "most_read"
  | "guides"
  | "resources"
  | "kits"
  | "faq";

function getSection(el: Element): HTMLElement | null {
  return el.closest<HTMLElement>("[data-home-section]");
}

function sendHomeClick(target: EventTarget | null) {
  if (!(target instanceof Element)) return;
  const control = target.closest<HTMLElement>("a, button");
  if (!control) return;
  const section = getSection(control);
  if (!section) return;

  const positionEl = control.closest<HTMLElement>("[data-home-position]");
  const position = positionEl ? Number(positionEl.dataset.homePosition) : undefined;
  const text = (control.getAttribute("aria-label") || control.textContent || "").replace(/\s+/g, " ").trim();

  let linkUrl: string | undefined;
  let outbound: boolean | undefined;
  if (control instanceof HTMLAnchorElement) {
    const described = describeHref(control);
    linkUrl = described.url;
    outbound = described.outbound;
  }

  trackNav("home_click", {
    section: section.dataset.homeSection,
    position: Number.isFinite(position) ? position : undefined,
    link_url: linkUrl,
    link_text: text,
    outbound,
    page_path: window.location.pathname,
  });
}

/** Attach to <main> as onClick. */
export function handleHomeClick(e: MouseEvent<HTMLElement>) {
  sendHomeClick(e.target);
}

/** Attach to <main> as onAuxClick (middle button opens a new tab). */
export function handleHomeAuxClick(e: MouseEvent<HTMLElement>) {
  if (e.button !== 1) return;
  sendHomeClick(e.target);
}

/** Fires `home_section_view` once per `[data-home-section]` element. */
export function useHomeSectionViews() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main [data-home-section]"));
    if (sections.length === 0) return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const id = el.dataset.homeSection;
          observer.unobserve(el);
          if (!id || seen.has(id)) continue;
          seen.add(id);
          trackNav("home_section_view", {
            section: id,
            order: sections.indexOf(el) + 1,
            page_path: window.location.pathname,
          });
        }
      },
      // A section counts as seen once its top passes 60% of the viewport.
      { rootMargin: "0px 0px -40% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
