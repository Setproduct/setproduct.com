import { type FormEvent, type MouseEvent, type PointerEvent, useCallback, useEffect, useRef, useState } from "react";
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
 * State of an open dialog, mirrored to `data-state` on the <dialog>.
 * All motion hangs off this attribute in CSS, React only flips it.
 * "closed" is the native closed dialog, so it is not listed here.
 *
 * preopen → open is the entrance: the first frame is painted small and blurred,
 * the next one carries the transition. closingCancel and closingDone are two
 * different exits, because a cancel and a sent message must not look alike.
 */
type DialogState = "preopen" | "open" | "submitting" | "success" | "closingCancel" | "closingDone";

/** How the dialog was dismissed. Feeds the exit motion and the GA4 close event. */
export type CloseMethod = "escape" | "backdrop" | "button" | "done";

/** Exit durations in ms. Mirrors --modal-out and --modal-done in globals.css. */
const EXIT_MS = { closingCancel: 220, closingDone: 420 } as const;
/** Fallback in case transitionend never arrives (background tab, reduced motion). */
const EXIT_FALLBACK = 50;

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

/** Auto-close delay of the success state, from the author's answer to Q6. */
const SUCCESS_HOLD_MS = 3000;

function buildMailto(message: string): string {
  const params = new URLSearchParams({ subject: "Message from setproduct.com" });
  if (message.trim()) params.set("body", message.slice(0, 1500));
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${CONTACT_EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
}

export default function ContactModal({ isOpen, onClose, location }: ContactModalProps) {
  const [state, setState] = useState<DialogState>("preopen");
  const [formError, setFormError] = useState<FormError | null>(null);
  // Pauses the three-second auto-close while the pointer rests on the dialog.
  const [isSuccessPaused, setIsSuccessPaused] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");
  // Bumped on every open: remounts the form, so fields start empty without
  // resetting each of them by hand.
  const [session, setSession] = useState(0);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  // Centre of the last pressed button, in per cent of the viewport. The card
  // grows out of that point, so the movement matches the thing that was
  // clicked. Safari on macOS does not focus a button on click, so
  // document.activeElement is not enough on its own.
  const lastPressRef = useRef<{ x: number; y: number } | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  // Set once the exit has finished, so the open effect does not close the
  // dialog a second time and cut the animation short.
  const isClosingRef = useRef(false);
  // A press that starts inside the card and ends on the backdrop (selecting
  // text, dragging the textarea handle) must not close the dialog.
  const pressedBackdropRef = useRef(false);
  // contact_form_start must fire once per modal session, not on every focus
  // change between the email field and the textarea.
  const hasStartedRef = useRef(false);
  // A reply that arrives after the dialog was closed must not touch the next session.
  const sessionRef = useRef(0);

  // Remember where the press started. Registered on the document, because the
  // buttons that open the dialog live all over the site.
  useEffect(() => {
    // globalThis.PointerEvent: the bare name here is React's synthetic type.
    const handlePointerDown = (event: globalThis.PointerEvent) => {
      const el = event.target instanceof Element ? event.target.closest("button, a") : null;
      if (!el) {
        lastPressRef.current = null;
        return;
      }
      const rect = el.getBoundingClientRect();
      lastPressRef.current = {
        x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
        y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
      };
    };
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, []);

  const clearExitTimer = useCallback(() => {
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  }, []);

  /**
   * Plays the exit, then hands control back to the provider.
   * Cancel and done are different gestures: one returns the card into its
   * button, the other dissolves it upwards.
   */
  const requestClose = useCallback(
    (method: CloseMethod) => {
      if (isClosingRef.current) return;
      isClosingRef.current = true;
      clearExitTimer();

      const exit: DialogState = method === "done" ? "closingDone" : "closingCancel";
      setState(exit);

      // A finished send must not animate a "sending" spinner on the way out.
      exitTimerRef.current = window.setTimeout(() => {
        exitTimerRef.current = null;
        dialogRef.current?.close();
        unlockScroll();
        const trigger = triggerRef.current;
        if (trigger && trigger.isConnected && document.activeElement !== trigger) {
          trigger.focus({ preventScroll: true });
        }
        triggerRef.current = null;
        isClosingRef.current = false;
        onClose();
      }, EXIT_MS[exit] + EXIT_FALLBACK);
    },
    [clearExitTimer, onClose],
  );

  useEffect(() => clearExitTimer, [clearExitTimer]);

  // Open the native dialog when the provider asks for it. Closing always goes
  // through requestClose(), so the exit motion is never skipped.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!isOpen || dialog.open) return;

    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    sessionRef.current += 1;
    setSession(sessionRef.current);
    setFormError(null);
    setDraftMessage("");
    hasStartedRef.current = false;
    isClosingRef.current = false;

    // Grow out of the button that was pressed; the centre of the screen is the
    // fallback when the dialog was opened by something else (a URL parameter).
    const press = lastPressRef.current;
    if (press) {
      dialog.style.setProperty("--modal-origin-x", `${press.x}%`);
      dialog.style.setProperty("--modal-origin-y", `${press.y}%`);
    } else {
      dialog.style.setProperty("--modal-origin-x", "50%");
      dialog.style.setProperty("--modal-origin-y", "50%");
    }

    // Paint the small, blurred frame first: with showModal() the browser can
    // otherwise batch both states into one and the entrance never plays.
    setState("preopen");
    dialog.showModal();
    lockScroll();
    requestAnimationFrame(() => requestAnimationFrame(() => setState("open")));

    // Focus goes to the email field with a mouse. On touch screens that would
    // pop the keyboard over half of the sheet before the person has read
    // anything, so the card itself takes focus instead.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer) emailRef.current?.focus();
    else cardRef.current?.focus();
  }, [isOpen]);

  // Unmount safety: never leave the page locked.
  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) unlockScroll();
    };
  }, []);

  // Escape fires `cancel`. It is intercepted so the exit animation plays before
  // the dialog actually closes.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (event: Event) => {
      event.preventDefault();
      requestClose(state === "success" ? "done" : "escape");
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [requestClose, state]);

  const handlePointerDown = (event: PointerEvent<HTMLDialogElement>) => {
    pressedBackdropRef.current = event.target === dialogRef.current;
  };

  // The dialog box has no padding and the card fills it, so a click whose
  // target is the dialog itself landed on ::backdrop.
  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    const isBackdrop = event.target === dialogRef.current && pressedBackdropRef.current;
    pressedBackdropRef.current = false;
    if (isBackdrop) requestClose(state === "success" ? "done" : "backdrop");
  };

  const handleFieldFocus = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackContactFormStart(location);
  };

  const setSuccess = useCallback(() => {
    setState("success");
    setIsSuccessPaused(false);
    // The form is gone, so focus moves to the confirmation card; otherwise a
    // screen reader would keep announcing buttons that no longer exist.
    requestAnimationFrame(() => cardRef.current?.focus({ preventScroll: true }));
  }, []);

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
      if (isCurrent()) setSuccess();
    } catch {
      fail("network");
    }
  };

  // Success closes itself after three seconds. A pointer resting on the dialog
  // pauses the countdown, so nobody loses the confirmation while reading it.
  useEffect(() => {
    if (state !== "success" || isSuccessPaused) return;
    const id = window.setTimeout(() => requestClose("done"), SUCCESS_HOLD_MS);
    return () => window.clearTimeout(id);
  }, [state, isSuccessPaused, requestClose]);

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
      onPointerEnter={state === "success" ? () => setIsSuccessPaused(true) : undefined}
      onPointerLeave={state === "success" ? () => setIsSuccessPaused(false) : undefined}
      ref={dialogRef}
    >
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
          <div className="contact-dialog_body" key={session}>
            <div className="contact-dialog_heading">
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

              <p className="contact-dialog_privacy text-size-small">
                We use your email only to reply.{" "}
                <a className="underline" href="/legal/privacy-policy" rel="noopener" target="_blank">
                  Privacy policy
                </a>
              </p>


              <div className="contact-dialog_actions">
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
            <span aria-hidden="true" className="contact-dialog_check">
              <svg fill="none" viewBox="0 0 24 24">
                <path d="M5 13l4.5 4.5L19 7" />
              </svg>
            </span>
            <div className="contact-dialog_heading">
              <h2 className="heading-style-h2" id={TITLE_ID}>
                Message sent
              </h2>
              <p className="text-size-medium" id={DESCRIPTION_ID}>
                Thank you. We&apos;ll reply within 24 hours.
              </p>
            </div>
            <div className="contact-dialog_actions">
              <button className="button-small outlined w-inline-block" onClick={() => requestClose("done")} type="button">
                <div className="text-size-medium text-weight-bold">Done</div>
              </button>
            </div>
            {/* Countdown to the automatic close. Decorative only: the timer
                itself lives in the effect above. */}
            <span
              aria-hidden="true"
              className="contact-dialog_progress"
              style={{ animationPlayState: isSuccessPaused ? "paused" : "running" }}
            />
          </div>
        )}
      </div>
    </dialog>
  );
}
