import {
  type AnimationEvent,
  type CSSProperties,
  type FormEvent,
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import ArrowIcon from "../sections/ArrowIcon";
import { CloseIcon } from "../icons/DecorativeIcons";
import { lockScroll, unlockScroll } from "../../lib/scrollLock";
import {
  getLeadContext,
  trackContactFormError,
  trackContactFormStart,
  trackContactFormSubmit,
  trackContactModalClose,
  trackContactSuccessCta,
  trackContactTopicSelect,
  type ContactLocation,
} from "../../lib/contact";
import { CONTACT_TOPICS, TOPIC_LABEL, type ContactTopic, type ContactTopicParam } from "../../lib/contactTopics";
import { PUBLISH_OFFER, getPublishLinkProps } from "../../lib/publish";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Where the user opened the modal from. Splits the funnel in GA4. */
  location: ContactLocation;
  /** Topic chip active on open. null: no chip, the general form. */
  initialTopic: ContactTopic | null;
  /** Publishing only: open on the question form instead of the offer card. */
  initialAsk: boolean;
};

/**
 * What the dialog shows, mirrored to `data-state` on the <dialog>.
 * "closed" is the native closed dialog, so it is not listed here.
 */
type DialogState = "open" | "submitting" | "success";

/**
 * Motion phase, written to `data-phase` straight on the DOM node, outside
 * React. The start frame of the entrance has to be in place before the browser
 * paints the freshly shown dialog; a React state update can land a frame late
 * and flash the full-size card (that was the glitch of the first motion pass).
 */
type MotionPhase = "enter" | "open" | "leave-cancel" | "leave-done";

/** How the dialog was dismissed. Picks the exit motion and feeds contact_modal_close. */
export type CloseMethod = "escape" | "backdrop" | "button" | "done" | "auto";

/** Durations in ms. Mirror the tokens on .contact-dialog in globals.css. */
const MOTION = {
  cancel: 220,
  done: 420,
  reduced: 120,
  swapOut: 140,
  resize: 320,
} as const;
/** The dialog is closed this long after the exit transition should have ended. */
const EXIT_SLACK = 40;
/** A pointerdown older than this is not treated as the button that opened the dialog. */
const PRESS_MAX_AGE = 1500;

/**
 * The security token is valid for five minutes. Fetching it when the modal
 * opened meant that anyone who wrote a thoughtful message for longer than that
 * got "Form expired" and lost the lead. Asking for it right before the POST
 * keeps the protection and removes the time limit on writing.
 */
async function fetchCsrf(): Promise<{ token: string; timestamp: number } | null> {
  try {
    const res = await fetch("/api/csrf", { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as { token: string; timestamp: number };
  } catch {
    return null;
  }
}

const CONTACT_EMAIL = "hello@setproduct.com";
const TITLE_ID = "contact-dialog-title";
const DESCRIPTION_ID = "contact-dialog-description";

/**
 * Human copy for every error code the API can return. Unknown codes and
 * network failures fall back to the generic line. The mailto link under the
 * message is always shown, so a person is never left without a way to reach us.
 */
const ERROR_COPY: Record<string, string> = {
  email_invalid: "Please check your email address.",
  message_short: "Please write a bit more so we can help, at least 10 characters.",
  message_long: "Your message is over 5,000 characters. Please shorten it or email us directly.",
  rate_minute: "You've just sent a message. Please try again in a minute.",
  rate_day: "You've reached today's limit for the form. Please email us directly.",
  token_missing: "Something went wrong on our side. Please try again.",
  token_expired: "Something went wrong on our side. Please try again.",
  token_invalid: "Something went wrong on our side. Please try again.",
  send_failed: "We couldn't send your message. Please try again in a moment.",
  network: "Couldn't reach the server. Check your connection and try again.",
};
const ERROR_FALLBACK = "We couldn't send your message. Please try again.";

/** Errors that belong to one field: shown under it and linked via aria-describedby. */
const FIELD_OF_ERROR: Record<string, "email" | "message"> = {
  email_invalid: "email",
  message_short: "message",
  message_long: "message",
};

type FormError = { code: string; text: string };

/**
 * One optional field per topic, next to Email. Only Email and Message are
 * ever required: every extra required field costs leads.
 */
type FormVariant = "publish" | "partnership" | "work" | "general";

type ExtraField = {
  key: "url" | "name";
  label: string;
  placeholder: string;
  autoComplete: string;
  inputMode?: "url" | "text";
};

const URL_FIELD = { key: "url", autoComplete: "url", inputMode: "url" } as const;

const VARIANTS: Record<FormVariant, { extra: ExtraField; messagePlaceholder: string }> = {
  publish: {
    extra: { ...URL_FIELD, label: "Website", placeholder: "yourproduct.com" },
    messagePlaceholder: "What would you like to know before ordering?",
  },
  partnership: {
    extra: { ...URL_FIELD, label: "Company or product", placeholder: "company.com" },
    messagePlaceholder: "What do you have in mind? A review, an integration, a joint piece…",
  },
  work: {
    extra: { ...URL_FIELD, label: "Company or project", placeholder: "company.com" },
    messagePlaceholder: "What are you building and what do you need? A rough timeline and budget help us reply faster.",
  },
  general: {
    extra: { key: "name", label: "Name", placeholder: "Your name", autoComplete: "name" },
    messagePlaceholder: "Type your message",
  },
};

function variantOf(topic: ContactTopic | null): FormVariant {
  return topic === "publish" || topic === "partnership" || topic === "work" ? topic : "general";
}

const OFFER_FACTS = [
  { value: PUBLISH_OFFER.readersPerMonth, label: "readers a month" },
  { value: String(PUBLISH_OFFER.domainRating), label: "domain rating" },
  { value: PUBLISH_OFFER.turnaround, label: "to go live" },
  { value: `$${PUBLISH_OFFER.priceFrom}`, label: "starting price" },
];

function buildMailto(message: string): string {
  const params = new URLSearchParams({ subject: "Message from setproduct.com" });
  if (message.trim()) params.set("body", message.slice(0, 1500));
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${CONTACT_EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Entrance stagger step for one group, consumed by .contact-dialog_stagger. */
function stagger(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}

function Spinner() {
  return (
    <svg aria-hidden="true" className="contact-dialog_spinner" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

export default function ContactModal({ isOpen, onClose, location, initialTopic, initialAsk }: ContactModalProps) {
  const [state, setState] = useState<DialogState>("open");
  const [formError, setFormError] = useState<FormError | null>(null);
  const [topic, setTopic] = useState<ContactTopic | null>(initialTopic);
  // Publishing: false shows the offer card, true the question form.
  const [isAsking, setIsAsking] = useState(initialAsk);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  // True for the 140ms while the form fades up before the success screen.
  const [isSwapping, setIsSwapping] = useState(false);
  // The panel under the chips plays its rise only after a switch by the
  // person, never on open: the entrance stagger already covers that.
  const [hasSwitched, setHasSwitched] = useState(false);
  // Bumped after every close: remounts the form while the dialog is hidden,
  // so the next open starts clean and never swaps content mid-entrance.
  const [session, setSession] = useState(0);

  // Take the entry point's topic in the same render that opens the dialog,
  // so the first painted frame already shows the right panel.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setTopic(initialTopic);
      setIsAsking(initialAsk);
    }
  }

  const step: "offer" | "form" = topic === "publish" && !isAsking ? "offer" : "form";
  const variant = variantOf(topic);
  const panelKey = step === "offer" ? "offer" : variant;
  const topicParam: ContactTopicParam = topic ?? "none";
  const hasInput = [email, message, name, url].some((value) => value.trim() !== "");

  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const successTitleRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  // The last pressed button or link. Safari on macOS does not focus a button
  // on click, so document.activeElement alone does not say where the press was.
  const lastPressRef = useRef<{ el: Element; time: number } | null>(null);
  const isClosingRef = useRef(false);
  const isLockedRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  // Card height right before its content changes (topic switch, success).
  const heightFromRef = useRef<number | null>(null);
  // Focus the email field once the question form has replaced the offer.
  const focusEmailRef = useRef(false);
  // A press that starts inside the card and ends on the backdrop (selecting
  // text, dragging the textarea handle) must not close the dialog.
  const pressedBackdropRef = useRef(false);
  // contact_form_start must fire once per modal session, not on every focus
  // change between the email field and the textarea.
  const hasStartedRef = useRef(false);
  // A reply that arrives after the dialog was closed must not touch the next session.
  const sessionRef = useRef(0);
  // Read from native listeners registered once.
  const stateRef = useRef<DialogState>("open");
  stateRef.current = state;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const closeInfoRef = useRef({ location, topic: topicParam, step, hasInput });
  closeInfoRef.current = { location, topic: topicParam, step, hasInput };

  const setPhase = (phase: MotionPhase | null) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (phase) dialog.dataset.phase = phase;
    else delete dialog.dataset.phase;
  };

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((t) => t !== id);
      fn();
    }, ms);
    timersRef.current.push(id);
  };

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const requestClose = useCallback((method: CloseMethod) => {
    const dialog = dialogRef.current;
    if (!dialog?.open || isClosingRef.current) return;
    isClosingRef.current = true;
    clearTimers();

    // A cancel goes back where it came from; a sent message leaves upwards.
    const isDone = method === "done" || method === "auto";
    setPhase(isDone ? "leave-done" : "leave-cancel");

    if (!isDone) {
      const info = closeInfoRef.current;
      trackContactModalClose(info.location, {
        topic: info.topic,
        step: info.step,
        hadInput: info.hasInput,
        method,
      });
    }

    // The dialog is closed by a timer, not by transitionend: the event never
    // comes in a background tab or when the value did not change, and a timer
    // in a visible tab lands on the last frame anyway.
    const ms = prefersReducedMotion() ? MOTION.reduced : isDone ? MOTION.done : MOTION.cancel;
    later(() => dialogRef.current?.close(), ms + EXIT_SLACK);
  }, []);

  // Remember where the press started. Registered on the document, because the
  // buttons that open the dialog live all over the site.
  useEffect(() => {
    const handlePointerDown = (event: globalThis.PointerEvent) => {
      const el = event.target instanceof Element ? event.target.closest("button, a, [role='button']") : null;
      lastPressRef.current = el ? { el, time: performance.now() } : null;
    };
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, []);

  // Open the native dialog when the provider asks for it. Closing always goes
  // through requestClose(), so the exit motion is never skipped.
  useEffect(() => {
    const dialog = dialogRef.current;
    const card = cardRef.current;
    if (!isOpen || !dialog || !card || dialog.open) return;

    const active = document.activeElement instanceof HTMLElement && document.activeElement !== document.body
      ? document.activeElement
      : null;
    const press = lastPressRef.current;
    const pressed = press && press.el.isConnected && performance.now() - press.time < PRESS_MAX_AGE ? press.el : null;
    const source = pressed ?? active;
    triggerRef.current = active ?? (pressed instanceof HTMLElement ? pressed : null);
    isClosingRef.current = false;

    // 1. Start frame first, then show. The attribute is on the node before the
    //    dialog gets a box, so its very first style is the small, clear card.
    setPhase("enter");
    dialog.showModal();
    lockScroll();
    isLockedRef.current = true;

    // 2. Grow out of the pressed button. The dialog box itself is never
    //    transformed and the card fills it, so its rect is the resting place
    //    of the card. The point is clamped to the card: an origin far outside
    //    it would turn the scale into a long sideways slide.
    const box = dialog.getBoundingClientRect();
    const width = card.offsetWidth;
    const height = card.offsetHeight;
    const rect = source?.getBoundingClientRect();
    const originX = rect ? clamp(rect.left + rect.width / 2 - box.left, 0, width) : width / 2;
    const originY = rect ? clamp(rect.top + rect.height / 2 - box.top, 0, height) : height / 2;
    card.style.setProperty("--contact-origin", `${Math.round(originX)}px ${Math.round(originY)}px`);

    // 3. Commit the start frame (forced style + layout), then flip to the end
    //    state in the same task. The browser has a resolved "before" style and
    //    runs the transition from it, with no extra frame and no rAF race.
    void card.offsetWidth;
    setPhase("open");

    // Focus goes to the email field with a mouse. On touch screens that would
    // pop the keyboard over half of the sheet before the person has read
    // anything, so the card itself takes focus instead. The offer card has no
    // field, so the card takes focus there too.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer && emailRef.current) emailRef.current.focus({ preventScroll: true });
    else card.focus({ preventScroll: true });
  }, [isOpen]);

  // Every way the dialog can close ends here: our timer, or the browser
  // closing it on its own (Chrome force-closes after a repeated Escape).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      clearTimers();
      setPhase(null);
      cardRef.current?.style.removeProperty("height");
      if (isLockedRef.current) {
        unlockScroll();
        isLockedRef.current = false;
      }
      // Browsers return focus on their own, Safari only when the trigger had
      // focus, which a mouse click there never gives. Restore it by hand.
      const trigger = triggerRef.current;
      if (trigger && trigger.isConnected && document.activeElement !== trigger) {
        trigger.focus({ preventScroll: true });
      }
      triggerRef.current = null;
      isClosingRef.current = false;

      // Reset while hidden: the next open shows a clean form from frame one.
      sessionRef.current += 1;
      setSession(sessionRef.current);
      setState("open");
      setIsSwapping(false);
      setHasSwitched(false);
      setFormError(null);
      setEmail("");
      setMessage("");
      setName("");
      setUrl("");
      hasStartedRef.current = false;
      heightFromRef.current = null;
      focusEmailRef.current = false;

      onCloseRef.current();
    };

    // Escape fires `cancel`. It is intercepted so the exit plays first.
    const handleCancel = (event: Event) => {
      event.preventDefault();
      requestClose(stateRef.current === "success" ? "done" : "escape");
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [requestClose]);

  // Unmount safety: never leave the page locked or a timer running.
  useEffect(
    () => () => {
      clearTimers();
      if (isLockedRef.current) unlockScroll();
    },
    [],
  );

  // The content of the card changed (another topic, the question form, the
  // success screen): glide the card from its old height to the new one. Runs
  // before paint, so the first frame of the new content has the old height.
  useLayoutEffect(() => {
    if (state === "success") successTitleRef.current?.focus({ preventScroll: true });
    if (focusEmailRef.current) {
      focusEmailRef.current = false;
      emailRef.current?.focus({ preventScroll: true });
    }

    const card = cardRef.current;
    const from = heightFromRef.current;
    heightFromRef.current = null;
    if (!card || from === null) return;

    card.style.removeProperty("height");
    const to = card.offsetHeight;
    if (Math.abs(to - from) < 2) return;
    card.style.height = `${from}px`;
    void card.offsetHeight;
    card.style.height = `${to}px`;
    later(() => card.style.removeProperty("height"), MOTION.resize + EXIT_SLACK);
  }, [state, panelKey]);

  /** Call right before the panel under the chips is replaced. */
  const prepareSwap = (nextKey: string) => {
    if (nextKey === panelKey) return;
    const card = cardRef.current;
    if (card && !prefersReducedMotion()) heightFromRef.current = card.offsetHeight;
    setHasSwitched(true);
  };

  const selectTopic = (next: ContactTopic) => {
    if (next === topic || state === "submitting") return;
    // Someone who already typed a message is not sent back to the offer.
    const nextAsking = next === "publish" ? isAsking || message.trim() !== "" : isAsking;
    const nextKey = next === "publish" && !nextAsking ? "offer" : variantOf(next);
    prepareSwap(nextKey);
    setFormError(null);
    setTopic(next);
    setIsAsking(nextAsking);
    trackContactTopicSelect(location, next, topicParam);
  };

  const openQuestionForm = () => {
    prepareSwap("publish");
    focusEmailRef.current = true;
    setIsAsking(true);
  };

  const isBackdrop = (target: EventTarget) =>
    target === dialogRef.current || (target instanceof Element && target.classList.contains("contact-dialog_scrim"));

  const handlePointerDown = (event: PointerEvent<HTMLDialogElement>) => {
    pressedBackdropRef.current = isBackdrop(event.target);
  };

  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    const isBackdropClick = isBackdrop(event.target) && pressedBackdropRef.current;
    pressedBackdropRef.current = false;
    if (isBackdropClick) requestClose(state === "success" ? "done" : "backdrop");
  };

  const handleFieldFocus = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackContactFormStart(location);
  };

  const showSuccess = (submitSession: number) => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion()) {
      setState("success");
      return;
    }
    // The form fades up first, then the success screen takes its place.
    setIsSwapping(true);
    later(() => {
      if (sessionRef.current !== submitSession) return;
      heightFromRef.current = card.offsetHeight;
      setIsSwapping(false);
      setState("success");
    }, MOTION.swapOut);
  };

  const handleProgressEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.animationName === "contact-progress") requestClose("auto");
  };

  // The next step leaves the dialog: close it behind the person.
  const handleSuccessCta = (target: string) => {
    trackContactSuccessCta(location, topicParam, target);
    requestClose("done");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitSession = sessionRef.current;
    setState("submitting");
    setFormError(null);

    const website = (new FormData(event.currentTarget).get("website") as string | null) ?? "";
    const extraKey = VARIANTS[variant].extra.key;
    const payload = {
      email: email.trim(),
      message,
      topic: topicParam,
      // Only the field the person could see is sent.
      name: extraKey === "name" ? name.trim() : "",
      url: extraKey === "url" ? url.trim() : "",
    };
    const fieldsFilled = [payload.name, payload.url].filter(Boolean).length;

    const isCurrent = () => sessionRef.current === submitSession;

    const fail = (code: string) => {
      if (!isCurrent()) return;
      setFormError({ code, text: ERROR_COPY[code] ?? ERROR_FALLBACK });
      setState("open");
      // GA4 gets the stable code, not the copy, so reports survive rewording.
      trackContactFormError(location, code);
    };

    try {
      const csrf = await fetchCsrf();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          website,
          context: getLeadContext(location),
          _token: csrf?.token,
          _timestamp: csrf?.timestamp,
        }),
      });

      // A proxy or a platform error page may answer with HTML, not JSON.
      const data = (await response.json().catch(() => null)) as { code?: string } | null;

      if (!response.ok) {
        fail(data?.code ?? `http_${response.status}`);
        return;
      }

      trackContactFormSubmit(location, message.length, topicParam, fieldsFilled);
      if (isCurrent()) {
        setSentEmail(payload.email);
        showSuccess(submitSession);
      }
    } catch {
      fail("network");
    }
  };

  const isSubmitting = state === "submitting";
  const fieldWithError = formError ? FIELD_OF_ERROR[formError.code] : undefined;
  const extra = VARIANTS[variant].extra;
  const extraValue = extra.key === "name" ? name : url;
  const setExtraValue = extra.key === "name" ? setName : setUrl;
  const panelClass = `contact-dialog_panel contact-dialog_stagger${hasSwitched ? " is-switched" : ""}`;

  return (
    <dialog
      aria-describedby={DESCRIPTION_ID}
      aria-labelledby={TITLE_ID}
      className="contact-dialog"
      data-state={state}
      onClick={handleDialogClick}
      onPointerDown={handlePointerDown}
      ref={dialogRef}
    >
      {/* Own scrim instead of ::backdrop: a plain element fades its opacity
          reliably in every browser, ::backdrop transitions do not in Safari. */}
      <div aria-hidden="true" className="contact-dialog_scrim" />

      <div className="contact-dialog_card" ref={cardRef} tabIndex={-1}>
        <button
          aria-label="Close"
          className="contact-dialog_close"
          onClick={() => requestClose(state === "success" ? "done" : "button")}
          type="button"
        >
          <CloseIcon className="contact-dialog_close-icon" />
        </button>

        {state !== "success" ? (
          <div className={`contact-dialog_body${isSwapping ? " is-leaving" : ""}`} key={session}>
            <div className="contact-dialog_heading contact-dialog_stagger" style={stagger(0)}>
              <h2 className="heading-style-h2" id={TITLE_ID}>
                How can we help?
              </h2>
              <p className="text-size-medium" id={DESCRIPTION_ID}>
                We reply within 24 hours.
              </p>
            </div>

            {/* Topic is optional: with no chip pressed the general form works. */}
            <div aria-label="Topic" className="contact-dialog_topics contact-dialog_stagger" role="group" style={stagger(1)}>
              {CONTACT_TOPICS.map((item) => {
                const isActive = item === topic;
                return (
                  <button
                    aria-pressed={isActive}
                    className={`button-x-small is-text w-inline-block${isActive ? " is-active" : ""}`}
                    disabled={isSubmitting}
                    key={item}
                    onClick={() => selectTopic(item)}
                    type="button"
                  >
                    <span className="text-size-small text-weight-semibold">{TOPIC_LABEL[item]}</span>
                  </button>
                );
              })}
            </div>

            {step === "offer" ? (
              <div className={panelClass} key="offer" style={stagger(2)}>
                <div className="contact-dialog_offer">
                  <div className="contact-dialog_offer-head">
                    <h3 className="contact-dialog_offer-title">Setproduct Guest Posts</h3>
                    <p className="text-size-regular">
                      A dofollow link on a blog read by designers and founders. Prices are public: pick a package
                      and pay online, no quote needed.
                    </p>
                  </div>
                  <dl className="contact-dialog_facts">
                    {OFFER_FACTS.map((fact) => (
                      <div className="contact-dialog_fact" key={fact.label}>
                        <dt className="text-size-small">{fact.label}</dt>
                        <dd className="contact-dialog_fact-value">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="contact-dialog_offer-actions">
                  <a className="button-small w-inline-block" {...getPublishLinkProps("contact_modal")}>
                    <div className="text-size-medium text-weight-bold">See packages</div>
                    <div className="button-icon is-small w-embed">
                      <ArrowIcon />
                    </div>
                  </a>
                  <button className="button-small outlined w-inline-block" onClick={openQuestionForm} type="button">
                    <div className="text-size-medium text-weight-bold">Ask a question</div>
                  </button>
                </div>
              </div>
            ) : (
              <form className={`contact-dialog_form ${panelClass}`} key={variant} onSubmit={handleSubmit} style={stagger(2)}>
                {/* Honeypot: hidden from sight and from assistive tech, but still
                    submitted so the API can reject bots that fill it in. */}
                <div aria-hidden="true" style={{ display: "none" }}>
                  <input aria-label="Leave this field empty" autoComplete="off" name="website" tabIndex={-1} />
                </div>

                {variant === "publish" ? (
                  <p className="contact-dialog_offer-strip text-size-small">
                    <span>
                      From ${PUBLISH_OFFER.priceFrom}, live in {PUBLISH_OFFER.turnaround}.
                    </span>
                    <a className="contact-dialog_offer-link" {...getPublishLinkProps("contact_modal")}>
                      See packages
                    </a>
                  </p>
                ) : null}

                <div className="form-grid is-l">
                  <div className="field">
                    <label className="field-label" htmlFor="contact-email">
                      Email
                    </label>
                    <input
                      aria-describedby={fieldWithError === "email" ? "contact-email-error" : undefined}
                      aria-invalid={fieldWithError === "email" || undefined}
                      autoComplete="email"
                      className="text-input is-l"
                      disabled={isSubmitting}
                      enterKeyHint="next"
                      id="contact-email"
                      inputMode="email"
                      maxLength={254}
                      name="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={handleFieldFocus}
                      placeholder="you@company.com"
                      ref={emailRef}
                      required
                      spellCheck={false}
                      type="email"
                      value={email}
                    />
                    {fieldWithError === "email" && formError ? (
                      <p className="field-error" id="contact-email-error">
                        {formError.text}
                      </p>
                    ) : (
                      <span aria-hidden="true" />
                    )}
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="contact-extra">
                      {extra.label} <span className="contact-dialog_optional">optional</span>
                    </label>
                    <input
                      autoComplete={extra.autoComplete}
                      className="text-input is-l"
                      disabled={isSubmitting}
                      enterKeyHint="next"
                      id="contact-extra"
                      inputMode={extra.inputMode}
                      maxLength={extra.key === "url" ? 300 : 100}
                      name={extra.key === "url" ? "Url" : "Name"}
                      onChange={(e) => setExtraValue(e.target.value)}
                      onFocus={handleFieldFocus}
                      placeholder={extra.placeholder}
                      spellCheck={false}
                      type="text"
                      value={extraValue}
                    />
                    <span aria-hidden="true" />
                  </div>
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    aria-describedby={fieldWithError === "message" ? "contact-message-error" : undefined}
                    aria-invalid={fieldWithError === "message" || undefined}
                    className="textarea-input is-l"
                    disabled={isSubmitting}
                    enterKeyHint="enter"
                    id="contact-message"
                    maxLength={5000}
                    minLength={10}
                    name="Message"
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={handleFieldFocus}
                    placeholder={VARIANTS[variant].messagePlaceholder}
                    required
                    value={message}
                  />
                  {fieldWithError === "message" && formError ? (
                    <p className="field-error" id="contact-message-error">
                      {formError.text}
                    </p>
                  ) : null}
                </div>

                {formError ? (
                  <div className="contact-dialog_alert" role="alert">
                    {!fieldWithError ? <p className="text-size-small">{formError.text}</p> : null}
                    <p className="text-size-small">
                      Or email us at{" "}
                      <a className="underline" href={buildMailto(message)}>
                        {CONTACT_EMAIL}
                      </a>
                      , your text will be copied into the email.
                    </p>
                  </div>
                ) : null}

                <div className="contact-dialog_footer">
                  <p className="contact-dialog_privacy text-size-small">
                    We use your email only to reply.{" "}
                    <a className="underline" href="/legal/privacy-policy" rel="noopener" target="_blank">
                      Privacy policy
                    </a>
                  </p>
                  <div className="contact-dialog_actions">
                    <button
                      aria-busy={isSubmitting || undefined}
                      className="button w-inline-block contact-dialog_submit"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {/* The label stays in the flow while sending, so the
                          button keeps its width under the spinner. */}
                      <div className="text-size-large text-weight-bold">Send message</div>
                      {isSubmitting ? <Spinner /> : null}
                    </button>
                    {isSubmitting ? <span className="sr-only">Sending</span> : null}
                  </div>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div aria-live="polite" className="contact-dialog_body contact-dialog_success">
            <div aria-hidden="true" className="contact-dialog_check">
              <span className="contact-dialog_check-ring" />
              <span className="contact-dialog_check-circle">
                <svg fill="none" viewBox="0 0 24 24">
                  <path d="M6.5 12.5l3.5 3.5 7.5-8" pathLength={1} />
                </svg>
              </span>
            </div>
            <div className="contact-dialog_heading contact-dialog_stagger" style={stagger(5)}>
              <h2 className="heading-style-h2" id={TITLE_ID} ref={successTitleRef} tabIndex={-1}>
                Message sent
              </h2>
              <p className="text-size-medium" id={DESCRIPTION_ID}>
                We&apos;ll reply to <strong className="contact-dialog_sent-email">{sentEmail}</strong> within 24 hours.
              </p>
            </div>
            <div className="contact-dialog_actions contact-dialog_stagger" style={stagger(6)}>
              {topic === "publish" || topic === "partnership" ? (
                <a
                  className="button-small w-inline-block"
                  {...getPublishLinkProps("contact_success")}
                  onClick={() => handleSuccessCta("publish_packages")}
                >
                  <div className="text-size-medium text-weight-bold">See packages</div>
                  <div className="button-icon is-small w-embed">
                    <ArrowIcon />
                  </div>
                </a>
              ) : null}
              {topic === "work" ? (
                <Link
                  className="button-small w-inline-block"
                  href="/blog?category=Case%20Studies"
                  onClick={() => handleSuccessCta("case_studies")}
                >
                  <div className="text-size-medium text-weight-bold">Read case studies</div>
                  <div className="button-icon is-small w-embed">
                    <ArrowIcon />
                  </div>
                </Link>
              ) : null}
              <button className="button-small outlined w-inline-block" onClick={() => requestClose("done")} type="button">
                <div className="text-size-medium text-weight-bold">Done</div>
              </button>
            </div>
            {topic === null || topic === "other" ? (
              <p className="contact-dialog_aside text-size-small contact-dialog_stagger" style={stagger(7)}>
                Promoting a product? Guest posts start at ${PUBLISH_OFFER.priceFrom}.{" "}
                <a
                  className="underline"
                  {...getPublishLinkProps("contact_success")}
                  onClick={() => handleSuccessCta("publish_packages")}
                >
                  See packages
                </a>
              </p>
            ) : null}
            {/* Three-second countdown to the auto-close. The animation is the
                timer: hover or keyboard focus pause it, a hidden tab stops it. */}
            <span aria-hidden="true" className="contact-dialog_progress">
              <span className="contact-dialog_progress-bar" onAnimationEnd={handleProgressEnd} />
            </span>
          </div>
        )}
      </div>
    </dialog>
  );
}
