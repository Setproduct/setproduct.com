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
import { CloseIcon } from "../icons/DecorativeIcons";
import { lockScroll, unlockScroll } from "../../lib/scrollLock";
import {
  getLeadContext,
  trackContactFormError,
  trackContactFormStart,
  trackContactFormSubmit,
  type ContactLocation,
} from "../../lib/contact";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Where the user opened the modal from. Splits the funnel in GA4. */
  location: ContactLocation;
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

/** How the dialog was dismissed. Picks the exit motion, feeds the close event in phase 4. */
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

export default function ContactModal({ isOpen, onClose, location }: ContactModalProps) {
  const [state, setState] = useState<DialogState>("open");
  const [formError, setFormError] = useState<FormError | null>(null);
  const [draftMessage, setDraftMessage] = useState("");
  // True for the 140ms while the form fades up before the success screen.
  const [isSwapping, setIsSwapping] = useState(false);
  // Bumped after every close: remounts the form while the dialog is hidden,
  // so the next open starts clean and never swaps content mid-entrance.
  const [session, setSession] = useState(0);

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
  // Card height right before the success screen replaces the form.
  const heightFromRef = useRef<number | null>(null);
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
    // anything, so the card itself takes focus instead.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer) emailRef.current?.focus({ preventScroll: true });
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
      setFormError(null);
      setDraftMessage("");
      hasStartedRef.current = false;
      heightFromRef.current = null;

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

  // Success screen: move focus to its title and glide the card height from the
  // form to the shorter confirmation. Runs before paint, so the first frame of
  // the new content already has the old height and nothing jumps.
  useLayoutEffect(() => {
    if (state !== "success") return;
    successTitleRef.current?.focus({ preventScroll: true });

    const card = cardRef.current;
    const from = heightFromRef.current;
    heightFromRef.current = null;
    if (!card || from === null) return;

    const to = card.offsetHeight;
    if (Math.abs(to - from) < 2) return;
    card.style.height = `${from}px`;
    void card.offsetHeight;
    card.style.height = `${to}px`;
    later(() => card.style.removeProperty("height"), MOTION.resize + EXIT_SLACK);
  }, [state]);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitSession = sessionRef.current;
    setState("submitting");
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("Email") as string;
    const message = formData.get("Message") as string;
    const website = formData.get("website") as string;
    setDraftMessage(message);

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
          email,
          message,
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

      trackContactFormSubmit(location, message.length);
      if (isCurrent()) showSuccess(submitSession);
    } catch {
      fail("network");
    }
  };

  const isSubmitting = state === "submitting";
  const fieldWithError = formError ? FIELD_OF_ERROR[formError.code] : undefined;

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
                Contact us
              </h2>
              <p className="text-size-medium" id={DESCRIPTION_ID}>
                Send your questions, ideas, and collaboration inquiries. We&apos;ll reply within 24 hours.
              </p>
            </div>

            <form className="contact-dialog_form" onSubmit={handleSubmit}>
              {/* Honeypot: hidden from sight and from assistive tech, but still
                  submitted so the API can reject bots that fill it in. */}
              <div aria-hidden="true" style={{ display: "none" }}>
                <input aria-label="Leave this field empty" autoComplete="off" name="website" tabIndex={-1} />
              </div>

              <div className="field contact-dialog_stagger" style={stagger(1)}>
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
                  onFocus={handleFieldFocus}
                  placeholder="you@company.com"
                  ref={emailRef}
                  required
                  spellCheck={false}
                  type="email"
                />
                {fieldWithError === "email" && formError ? (
                  <p className="field-error" id="contact-email-error">
                    {formError.text}
                  </p>
                ) : null}
              </div>

              <div className="field contact-dialog_stagger" style={stagger(2)}>
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
                  onFocus={handleFieldFocus}
                  placeholder="Type your message"
                  required
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
                    <a className="underline" href={buildMailto(draftMessage)}>
                      {CONTACT_EMAIL}
                    </a>
                    , your text will be copied into the email.
                  </p>
                </div>
              ) : null}

              <p className="contact-dialog_privacy text-size-small contact-dialog_stagger" style={stagger(3)}>
                We use your email only to reply.{" "}
                <a className="underline" href="/legal/privacy-policy" rel="noopener" target="_blank">
                  Privacy policy
                </a>
              </p>

              <div className="contact-dialog_actions contact-dialog_stagger" style={stagger(4)}>
                <button
                  aria-busy={isSubmitting || undefined}
                  className="button w-inline-block disabled:opacity-70"
                  disabled={isSubmitting}
                  type="submit"
                >
                  <div className="text-size-large text-weight-bold">
                    {isSubmitting ? "Sending…" : "Send message"}
                  </div>
                </button>
              </div>
            </form>
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
                Thank you. We&apos;ll reply within 24 hours.
              </p>
            </div>
            <div className="contact-dialog_actions contact-dialog_stagger" style={stagger(6)}>
              <button className="button-small outlined w-inline-block" onClick={() => requestClose("done")} type="button">
                <div className="text-size-medium text-weight-bold">Done</div>
              </button>
            </div>
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
