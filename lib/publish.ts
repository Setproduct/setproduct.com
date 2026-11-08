import { event } from "./gtag";

/**
 * Paid publishing (publish.setproduct.com) link helpers.
 *
 * Every on-site link to the publishing portal goes through
 * getPublishLinkProps(), so that:
 * - the portal can attribute each visit to the placement that sent it
 *   (utm_medium = placement, utm_campaign = publish);
 * - GA4 gets one `publish_cta_click` event per click with a `location`
 *   parameter (see trackPublishClicks, wired once in pages/_app.tsx).
 *
 * Links that cannot use the helper (HTML strings in data/faq.ts, links in
 * MDX posts) are still tracked by the delegated listener; their location
 * falls back to `data-publish-location` or "content".
 */

export const PUBLISH_HOST = "publish.setproduct.com";
export const PUBLISH_URL = `https://${PUBLISH_HOST}/`;

/** Offer facts shown next to publishing CTAs. Update here only. */
export const PUBLISH_OFFER = {
  priceFrom: 288,
  priceTwoLinks: 348,
  readersPerMonth: "17,000",
  domainRating: 42,
  turnaround: "24 hours",
} as const;

/**
 * Blog categories whose readers are founders and marketers, i.e. potential
 * advertisers. Posts in them get the publishing CTA by default (sidebar card,
 * and the bottom CTA when the post has no inlineCta of its own).
 */
export const PUBLISH_AUDIENCE_CATEGORIES = ["SEO", "Growth Hacking", "Startups & SaaS"];

export function isPublishAudienceCategory(category?: string | null): boolean {
  return !!category && PUBLISH_AUDIENCE_CATEGORIES.includes(category);
}

export type PublishLocation =
  | "header"
  | "company_panel"
  | "company_panel_mobile"
  | "footer"
  | "footer_band"
  | "home_hero"
  | "faq"
  | "blog_inline"
  | "blog_sidebar"
  | "terms_page"
  | "content";

export function isPublishHref(href?: string | null): boolean {
  if (!href) return false;
  try {
    return new URL(href).hostname === PUBLISH_HOST;
  } catch {
    return false;
  }
}

export function getPublishHref(location: PublishLocation): string {
  const params = new URLSearchParams({
    utm_source: "setproduct.com",
    utm_medium: location,
    utm_campaign: "publish",
  });
  return `${PUBLISH_URL}?${params.toString()}`;
}

type PublishLinkProps = {
  href: string;
  target: "_blank";
  rel: string;
  "data-publish-location": PublishLocation;
};

export function getPublishLinkProps(location: PublishLocation): PublishLinkProps {
  return {
    href: getPublishHref(location),
    target: "_blank",
    rel: "noopener noreferrer",
    "data-publish-location": location,
  };
}

function isPublishAnchor(el: Element | null): el is HTMLAnchorElement {
  return el instanceof HTMLAnchorElement && el.hostname === PUBLISH_HOST;
}

/**
 * Delegated listener: one GA4 `publish_cta_click` per click (left or middle
 * button) on any link to the portal. Returns a cleanup function.
 */
export function trackPublishClicks(): () => void {
  const handler = (e: MouseEvent) => {
    if (e.type === "auxclick" && e.button !== 1) return;
    const target = e.target instanceof Element ? e.target.closest("a") : null;
    if (!isPublishAnchor(target)) return;
    const location = target.dataset.publishLocation ?? "content";
    const payload = {
      location,
      page_path: window.location.pathname,
      transport_type: "beacon",
    };
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.debug("[publish]", "publish_cta_click", payload);
    }
    event("publish_cta_click", payload);
  };
  document.addEventListener("click", handler, true);
  document.addEventListener("auxclick", handler, true);
  return () => {
    document.removeEventListener("click", handler, true);
    document.removeEventListener("auxclick", handler, true);
  };
}
