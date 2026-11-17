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
 * All motion (phase 3 of the plan) hangs off this attribute in CSS, React only
 * flips it. "closed" is the native closed dialog, so it is not listed here.
 */
type DialogState = "open" | "submitting" | "success";

/** How the dialog was dismissed. Kept for the close event in phase 4. */
export type CloseMethod = "escape" | "backdrop" | "button" | "done";

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

export default function ContactModal({ isOpen, onClose, location }: ContactModalProps) {
  const [state, setState] = useState<DialogState>("open");
  const [formError, setFormError] = useState<FormError | null>(null);
  const [draftMessage, setDraftMessage] = useState("");
  // Bumped on every open: remounts the form, so fields start empty without
  // resetting each of them by hand.
  const [session, setSession] = useState(0);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  // A press that starts inside the card and ends on the backdrop (selecting
  // text, dragging the textarea handle) must not close the dialog.
  const pressedBackdropRef = useRef(false);
  // contact_form_start must fire once per modal session, not on every focus
  // change between the email field and the textarea.
  const hasStartedRef = useRef(false);
  // A reply that arrives after the dialog was closed must not touch the next session.
  const sessionRef = useRef(0);

  const requestClose = useCallback(
    (method: CloseMethod) => {
      // The method feeds the close event in phase 4 and picks the exit motion in phase 3.
      void method;
      onClose();
    },
    [onClose],
  );

  // Open and close the native dialog from the provider state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      sessionRef.current += 1;
      setSession(sessionRef.current);
      setState("open");
      setFormError(null);
      setDraftMessage("");
      hasStartedRef.current = false;
      dialog.showModal();
      lockScroll();

      // Focus goes to the email field with a mouse. On touch screens that
      // would pop the keyboard over half of the sheet before the person has
      // read anything, so the card itself takes focus instead.
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      if (finePointer) emailRef.current?.focus();
      else cardRef.current?.focus();
      return;
    }

    if (!isOpen && dialog.open) {
      dialog.close();
      unlockScroll();
      // Browsers return focus on their own, Safari only when the trigger had
      // focus, which a mouse click there never gives. Restore it by hand.
      const trigger = triggerRef.current;
      if (trigger && trigger.isConnected && document.activeElement !== trigger) {
        trigger.focus({ preventScroll: true });
      }
      triggerRef.current = null;
    }
  }, [isOpen]);

  // Unmount safety: never leave the page locked.
  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) unlockScroll();
    };
  }, []);

  // Escape fires `cancel`. It is intercepted so the provider stays the single
  // source of truth, and so phase 3 can play the exit before closing.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (event: Event) => {
      event.preventDefault();
      requestClose("escape");
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [requestClose]);

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
      if (isCurrent()) setState("success");
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

              <div className="modal_form-item">
                <p className="text-size-regular">Email</p>
                <input
                  aria-describedby={fieldWithError === "email" ? "contact-email-error" : undefined}
                  aria-invalid={fieldWithError === "email" || undefined}
                  aria-label="Email"
                  className="text-input w-input"
                  disabled={isSubmitting}
                  maxLength={254}
                  name="Email"
                  onFocus={handleFieldFocus}
                  placeholder="you@company.com"
                  ref={emailRef}
                  required
                  type="email"
                />
                {fieldWithError === "email" && formError ? (
                  <p className="field-error" id="contact-email-error">
                    {formError.text}
                  </p>
                ) : null}
              </div>

              <div className="modal_form-item">
                <p className="text-size-regular">Message</p>
                <textarea
                  aria-describedby={fieldWithError === "message" ? "contact-message-error" : undefined}
                  aria-invalid={fieldWithError === "message" || undefined}
                  aria-label="Message"
                  className="textarea-input w-input"
                  disabled={isSubmitting}
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
          </div>
        )}
      </div>
    </dialog>
  );
}
