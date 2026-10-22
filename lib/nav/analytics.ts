import { event } from "../gtag";

/**
 * GA4 instrumentation for the navbar mega-menu.
 *
 * Internal menu keys in SiteHeader are historical ("tutorials", "freebies",
 * "designKits"…). Reports use the stable, user-facing names below so renaming
 * a state key never splits the data.
 */
export const NAV_MENU_ID: Record<string, string> = {
  inspiration: "inspiration",
  tutorials: "learn",
  freebies: "resources",
  designKits: "ui_kits",
  information: "company",
};

export type NavOpenSource = "hover" | "click" | "keyboard" | "tap";

export type NavLinkType =
  | "trigger"
  | "category"
  | "card_image"
  | "card_title"
  | "card_cta"
  | "card_secondary"
  | "company_link"
  | "promo"
  | "other";

// GA4 truncates event parameter values at 100 characters.
const MAX_PARAM_LENGTH = 100;

function clip(value: unknown): unknown {
  return typeof value === "string" && value.length > MAX_PARAM_LENGTH
    ? value.slice(0, MAX_PARAM_LENGTH)
    : value;
}

export function trackNav(name: string, params: Record<string, unknown> = {}) {
  const payload: Record<string, unknown> = { transport_type: "beacon" };
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    payload[key] = clip(value);
  }
  // NEXT_PUBLIC_GA_ID is usually empty locally, so event() is a no-op there.
  // Mirror to the console outside production to make the events verifiable.
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[nav]", name, payload);
  }
  event(name, payload);
}

/** Classify a clicked element inside the mega-menu by its existing markup. */
export function getNavLinkType(el: HTMLElement): NavLinkType {
  if (el.matches(".nav_dropdown_toggle-link, .nav_dropdown_toggle, .nav-link-block")) return "trigger";
  if (el.matches(".nav_radio")) return "category";
  if (el.matches(".nav_tabs-list-item-img-wr")) return "card_image";
  if (el.matches(".link-block")) return "company_link";
  if (el.matches(".nav_info-promo-cta, .nav_info-promo-mobile-cta")) return "promo";
  const buttonRow = el.closest(".nav_tabs-list-item-btn-wr");
  if (buttonRow) {
    return buttonRow.querySelector("a, button") === el ? "card_cta" : "card_secondary";
  }
  if (el.closest(".nav_tabs-list-item-info-wr")) return "card_title";
  return "other";
}

/** "Buy $148" → 148. Returns undefined for labels without a price. */
export function parsePrice(label: string): number | undefined {
  const match = label.match(/\$\s*([\d.,]+)/);
  if (!match) return undefined;
  const value = Number.parseFloat(match[1].replace(/,/g, ""));
  return Number.isFinite(value) ? value : undefined;
}

/** Keep URLs short and free of UTM noise: path (+query) for internal, origin+path for outbound. */
export function describeHref(anchor: HTMLAnchorElement): { url: string; outbound: boolean } {
  const outbound = anchor.hostname !== "" && anchor.hostname !== window.location.hostname;
  const url = outbound ? `${anchor.origin}${anchor.pathname}` : `${anchor.pathname}${anchor.search}`;
  return { url, outbound };
}
