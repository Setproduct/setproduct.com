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
import type { ContactTopic, ContactTopicParam } from "./contactTopics";

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

/** What the modal shows first for an entry point. */
export type ContactOpenOptions = {
  /** Preselected topic. null: no chip is active, the general form is shown. */
  topic?: ContactTopic | null;
  /** Publishing only: skip the offer card and open the question form right away. */
  ask?: boolean;
};

/**
 * Default topic per entry point. Everything next to a publishing offer opens
 * straight on the question form: the person has already seen the offer and
 * clicked "Ask a question" or "Contact us" under it. Entry points without
 * context (footer, search, FAQ, refunds) open with no chip selected.
 */
const LOCATION_DEFAULTS: Partial<Record<ContactLocation, Required<ContactOpenOptions>>> = {
  advertise_panel_desktop: { topic: "publish", ask: true },
  advertise_panel_mobile: { topic: "publish", ask: true },
  terms_page: { topic: "publish", ask: true },
  template_hire: { topic: "publish", ask: true },
  dashboard_cta: { topic: "publish", ask: true },
  testimonials_page: { topic: "publish", ask: true },
};

export function resolveOpenOptions(
  location: ContactLocation,
  options?: ContactOpenOptions,
): Required<ContactOpenOptions> {
  const fallback = LOCATION_DEFAULTS[location] ?? { topic: null, ask: false };
  return {
    topic: options?.topic !== undefined ? options.topic : fallback.topic,
    ask: options?.ask ?? fallback.ask,
  };
}

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

const pagePath = () => (typeof window !== "undefined" ? window.location.pathname : undefined);

/** Fired on every click that opens the modal. `topic` is the preselected one. */
export function trackContactCta(location: ContactLocation, topic: ContactTopicParam = "none") {
  event("contact_cta_click", {
    location,
    topic,
    page_path: pagePath(),
  });
}

/** Fired when the person picks a topic chip. */
export function trackContactTopicSelect(location: ContactLocation, topic: ContactTopic, previous: ContactTopicParam) {
  event("contact_topic_select", {
    location,
    topic,
    previous,
    page_path: pagePath(),
  });
}

export type ContactCloseMethod = "escape" | "backdrop" | "button" | "back";

/**
 * Fired on every close before a message was sent. `step` says what the person
 * was looking at (the publishing offer or a form), `had_input` whether they
 * had typed anything: the gap between the two is the lost-lead signal.
 */
export function trackContactModalClose(
  location: ContactLocation,
  params: { topic: ContactTopicParam; step: "offer" | "form"; hadInput: boolean; method: ContactCloseMethod },
) {
  event("contact_modal_close", {
    location,
    topic: params.topic,
    step: params.step,
    had_input: params.hadInput,
    method: params.method,
    page_path: pagePath(),
  });
}

/** Fired on the next-step link of the success screen. */
export function trackContactSuccessCta(location: ContactLocation, topic: ContactTopicParam, target: string) {
  event("contact_success_cta_click", {
    location,
    topic,
    target,
    page_path: pagePath(),
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
  topic: ContactTopicParam = "none",
  fieldsFilled = 0,
) {
  event("contact_form_submit", {
    location,
    topic,
    message_length: messageLength,
    fields_filled: fieldsFilled,
    page_path: pagePath(),
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
