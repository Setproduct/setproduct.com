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

/**
 * What the person wants. Three topics only: custom work and the discount
 * scenario were dropped by the author (answers Q3 and Q4), so the form asks
 * about publishing, about a kit, or about anything else.
 */
export type ContactTopic = "publish" | "product" | "other";

export const CONTACT_TOPICS: { id: ContactTopic; label: string }[] = [
  { id: "publish", label: "Guest post or ad" },
  { id: "product", label: "Question about a kit" },
  { id: "other", label: "Something else" },
];

/** Human label for the email subject and the lead table. */
export const TOPIC_LABEL: Record<ContactTopic, string> = {
  publish: "Publish",
  product: "Kit",
  other: "Other",
};

/**
 * Topic guessed from the entry point. A place that sells publishing preselects
 * `publish`, a place about products preselects `product`. The footer and the
 * general FAQ answer serve every intent, so they return null and the modal
 * opens on the chips instead of guessing wrong.
 */
export function topicOfLocation(location: ContactLocation): ContactTopic | null {
  switch (location) {
    case "advertise_panel_desktop":
    case "advertise_panel_mobile":
    case "terms_page":
      return "publish";
    case "search_page":
    case "refunds_policy":
      return "product";
    case "template_hire":
    case "dashboard_cta":
    case "testimonials_page":
      return "other";
    default:
      return null;
  }
}

/** Which screen of the modal is showing. Sent with the close event. */
export type ContactStep = "topic" | "offer" | "form" | "success";

/** Extra hints an entry point can pass. Both optional. */
export type ContactOptions = {
  /** Overrides the topic guessed from the location. */
  topic?: ContactTopic;
  /** Kit title, preselected in the Product field on a kit page. */
  product?: string;
};

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
export function trackContactFormSubmit(
  location: ContactLocation,
  messageLength: number,
  topic: ContactTopic,
  fieldsFilled: number,
) {
  event("contact_form_submit", {
    location,
    topic,
    message_length: messageLength,
    fields_filled: fieldsFilled,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}

/** Fired when a topic chip is pressed, including a change of an already chosen one. */
export function trackContactTopicSelect(
  location: ContactLocation,
  topic: ContactTopic,
  preselected: boolean,
) {
  event("contact_topic_select", {
    location,
    topic,
    preselected,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}

/**
 * Fired when the window is dismissed before the message was sent. `had_input`
 * separates "opened by mistake" from "wrote something and left", which is the
 * difference between a bad entry point and a form that asks too much.
 */
export function trackContactModalClose(
  location: ContactLocation,
  topic: ContactTopic | null,
  step: ContactStep,
  hadInput: boolean,
  method: string,
) {
  event("contact_modal_close", {
    location,
    topic: topic ?? "none",
    step,
    had_input: hadInput,
    method,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}

/** Fired on the next-step button of the success screen. */
export function trackContactSuccessCta(
  location: ContactLocation,
  topic: ContactTopic,
  target: string,
) {
  event("contact_success_cta_click", {
    location,
    topic,
    target,
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
