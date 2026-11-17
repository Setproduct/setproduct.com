import { type FormEvent, useEffect, useRef, useState } from "react";
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

type FormError = { code: string; text: string };

function buildMailto(message: string): string {
  const params = new URLSearchParams({ subject: "Message from setproduct.com" });
  if (message.trim()) params.set("body", message.slice(0, 1500));
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${CONTACT_EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
}

export default function ContactModal({ isOpen, onClose, location }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<FormError | null>(null);
  const [draftMessage, setDraftMessage] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  // contact_form_start must fire once per modal session, not on every focus
  // change between the email field and the textarea.
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsSubmitted(false);
      setFormError(null);
      setDraftMessage("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // A new modal session starts every time the modal opens.
  useEffect(() => {
    if (isOpen) hasStartedRef.current = false;
  }, [isOpen]);

  const handleFieldFocus = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackContactFormStart(location);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("Email") as string;
    const message = formData.get("Message") as string;
    const website = formData.get("website") as string;
    setDraftMessage(message);

    const fail = (code: string) => {
      setFormError({ code, text: ERROR_COPY[code] ?? ERROR_FALLBACK });
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
      setIsSubmitted(true);
    } catch {
      fail("network");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="remodal-overlay"
      onClick={handleOverlayClick}
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="remodal"
        style={{
          background: "transparent",
          width: "auto",
          padding: 0,
          maxWidth: "none",
        }}
      >
        <div className="container">
          <div className="modal-wr">
            <div className="modal_heading-wr">
              <p className="heading-style-h2">Contact us</p>
              <p className="text-size-medium mob-16">
                Send your questions, ideas, and collaboration inquiries
              </p>
            </div>
            <div className="modal_form-block w-form">
              {!isSubmitted ? (
                <form className="modal_form" onSubmit={handleSubmit}>
                  {/* Honeypot: hidden from sight and from assistive tech, but still
                      submitted so the API can reject bots that fill it in. */}
                  <div aria-hidden="true" style={{ display: "none" }}>
                    <input
                      aria-label="Leave this field empty"
                      autoComplete="off"
                      name="website"
                      tabIndex={-1}
                    />
                  </div>
                  <div className="modal_form-item">
                    <p className="text-size-regular">Email</p>
                    <input
                      aria-label="Email"
                      className="text-input w-input"
                      disabled={isSubmitting}
                      maxLength={256}
                      name="Email"
                      onFocus={handleFieldFocus}
                      placeholder="you@company.com"
                      required
                      type="email"
                    />
                  </div>
                  <div className="modal_form-item">
                    <p className="text-size-regular">Message</p>
                    <textarea
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
                  </div>
                  {formError && (
                    <div
                      className="error-message"
                      role="alert"
                      style={{ display: "block", marginBottom: "16px" }}
                    >
                      <div className="text-size-small">{formError.text}</div>
                      <div className="text-size-small">
                        Or email us at{" "}
                        <a className="underline" href={buildMailto(draftMessage)}>
                          {CONTACT_EMAIL}
                        </a>
                        , your text will be copied into the email.
                      </div>
                    </div>
                  )}
                  <div className="modal_button-wr">
                    <div className="button-form-wr">
                      <button
                        className="button w-inline-block"
                        disabled={isSubmitting}
                        style={{ opacity: isSubmitting ? 0.7 : 1 }}
                        type="submit"
                      >
                        <div className="text-size-large text-weight-bold">
                          {isSubmitting ? "Sending…" : "Send message"}
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="success-message align-center" style={{ display: "block" }}>
                  <div className="text-size-small">Thank you, your message has been sent.</div>
                </div>
              )}
            </div>
          </div>
          <button
            className="modal_close-btn"
            onClick={onClose}
            style={{ cursor: "pointer", border: "none", background: "transparent" }}
            type="button"
          >
            <img alt="Close" loading="lazy" src="/images/close-circle.svg" />
          </button>
        </div>
      </div>
    </div>
  );
}
