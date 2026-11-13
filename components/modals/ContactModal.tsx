import { type FormEvent, useEffect, useRef, useState } from "react";
import {
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

export default function ContactModal({ isOpen, onClose, location }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [csrf, setCsrf] = useState<{ token: string; timestamp: number } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  // contact_form_start must fire once per modal session, not on every focus
  // change between the email field and the textarea.
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      fetch("/api/csrf")
        .then(res => res.json())
        .then(data => setCsrf(data))
        .catch(() => {});
    } else {
      document.body.style.overflow = "";
      setIsSubmitted(false);
      setErrorMessage(null);
      setCsrf(null);
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
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("Email") as string;
    const message = formData.get("Message") as string;
    const website = formData.get("website") as string;

    let reported = false;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message,
          website,
          _token: csrf?.token,
          _timestamp: csrf?.timestamp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const reason = data?.error || `http_${response.status}`;
        setErrorMessage(reason);
        trackContactFormError(location, reason);
        reported = true;
        return;
      }

      trackContactFormSubmit(location, message.length);
      setIsSubmitted(true);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "unknown";
      setErrorMessage(reason);
      if (!reported) trackContactFormError(location, reason);
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
                Send your questions, ideas, and collaboration inquires
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
                      placeholder="Whats your e-mail"
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
                      name="Message"
                      onFocus={handleFieldFocus}
                      placeholder="Type your message..."
                      required
                    />
                  </div>
                  {errorMessage && (
                    <div className="error-message" style={{ display: "block", marginBottom: "16px" }}>
                      <div className="text-size-small">{errorMessage}</div>
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
                          {isSubmitting ? "Sending..." : "Send your Message"}
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="success-message align-center" style={{ display: "block" }}>
                  <div className="text-size-small">Thank you! Your submission has been received!</div>
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
