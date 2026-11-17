/**
 * Tracking for the contact funnel.
 *
 * The contact modal is reached from ten places across the site. Before this
 * file existed, none of those clicks and none of the form steps were measured,
 * so the whole lead path was invisible in GA4. The legacy Webflow build did
 * report it (`click_get_a_quote_button`, `form_start`, `form_submit`), which is
 * exactly why those old event names still show up in historical exports while
 * being absent from this repository.
 *
 * Event names are prefixed with `contact_` so they group together in the GA4
 * event list, away from `nav_*` and `publish_*`.
 */

import { event } from "./gtag";

/**
 * Every place that can open the contact modal. The value lands in the
 * `location` parameter, so one dimension splits the whole funnel by entry point.
 */
export type ContactLocation =
  // Historical: the old Company panel. Kept so past funnels stay comparable.
  | "company_panel_desktop"
  | "company_panel_mobile"
  | "advertise_panel_desktop"
  | "advertise_panel_mobile"
  | "template_hire"
  | "dashboard_cta"
  | "testimonials_page"
  | "search_page"
  | "faq"
  | "refunds_policy"
  | "terms_page"
  | "footer"
  | "unknown";

const LANDING_KEY = "sp_landing";

/**
 * Remembers the first page of the visit, including its query string, so UTM
 * tags from a newsletter or a partner link reach the lead email even when the
 * person writes to us three pages later. Called once from the modal provider.
 */
export function rememberLandingPage() {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(LANDING_KEY)) return;
    window.sessionStorage.setItem(LANDING_KEY, window.location.pathname + window.location.search);
  } catch {
    // Storage can be blocked (private mode, strict settings). Context is optional.
  }
}

/** Where the lead came from. Sent to /api/contact and printed in the email. */
export type LeadContext = {
  location: ContactLocation;
  pagePath: string;
  referrer: string;
  landing: string;
};

export function getLeadContext(location: ContactLocation): LeadContext {
  if (typeof window === "undefined") {
    return { location, pagePath: "", referrer: "", landing: "" };
  }
  let landing = "";
  try {
    landing = window.sessionStorage.getItem(LANDING_KEY) ?? "";
  } catch {
    landing = "";
  }
  return {
    location,
    pagePath: window.location.pathname + window.location.search,
    referrer: document.referrer,
    landing,
  };
}

/** Fired on every click that opens the modal. */
export function trackContactCta(location: ContactLocation) {
  event("contact_cta_click", {
    location,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}

/** Fired once per modal session, on the first focus inside a field. */
export function trackContactFormStart(location: ContactLocation) {
  event("contact_form_start", {
    location,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}

/**
 * Fired after the API accepts the message. `transport_type: "beacon"` is not
 * needed here because the modal stays open and shows the success state, but the
 * message length is useful to see whether people write one line or six.
 */
export function trackContactFormSubmit(location: ContactLocation, messageLength: number) {
  event("contact_form_submit", {
    location,
    message_length: messageLength,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}

/** Fired when /api/contact answers with an error. */
export function trackContactFormError(location: ContactLocation, reason: string) {
  event("contact_form_error", {
    location,
    reason: reason.slice(0, 100),
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}
