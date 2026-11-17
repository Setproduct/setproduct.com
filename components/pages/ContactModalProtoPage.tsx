import Head from "next/head";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import { CloseIcon } from "../icons/DecorativeIcons";
import type { NavData } from "../../lib/nav/types";
import styles from "./ContactModalProtoPage.module.css";

/**
 * Prototype for the contact dialog motion (phase 3, section 5.10 of
 * plans/contact-modal-leads-and-motion-2026-11.md).
 *
 * It renders its own <dialog> with the same markup as the live one, so the
 * timings can be tuned and approved by eye before anything is copied into
 * ContactModal.tsx. Nothing here is wired to the API: submitting is simulated
 * so the success state can be watched as often as needed.
 */

type Props = {
  navData?: NavData;
};

type DemoState = "closed" | "preopen" | "open" | "submitting" | "success" | "closingCancel" | "closingDone";

/** Base durations from section 5.2. Multiplied by the slow-motion factor. */
const DURATION = {
  in: 360,
  out: 220,
  done: 420,
} as const;

const SUCCESS_HOLD = 3000;

const TIMELINE = [
  { t: "0–320 ms", what: "Scrim fades in. The blur itself is constant, only opacity moves." },
  { t: "0–360 ms", what: "Card: scale 0.92 → 1, lift 16em → 0, own blur 8px → 0, opacity in the first 120 ms." },
  { t: "240–360 ms", what: "Card settles on its edge, like a focused field." },
  { t: "60 / 180 ms", what: "Cancel: press down 4px, then scale 1 → 0.96, back into the trigger." },
  { t: "420 ms", what: "After success: up 24px with a dissolve. Different gesture from a cancel." },
];

export default function ContactModalProtoPage({ navData }: Props) {
  const [state, setState] = useState<DemoState>("closed");
  const [slow, setSlow] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [progressPaused, setProgressPaused] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const k = slow ? 3 : 1;

  /** Origin of the grow-in: centre of the button that opened the dialog. */
  const open = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      const rect = event.currentTarget.getBoundingClientRect();
      setOrigin({
        x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
        y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
      });
      triggerRef.current = event.currentTarget;
      setProgressPaused(false);
      setState("preopen");
      dialog.showModal();
      // Two frames: the first paints the closed state, the second starts the
      // transition. One frame alone lets the browser batch both into nothing.
      requestAnimationFrame(() => requestAnimationFrame(() => setState("open")));
    },
    [],
  );

  const closeWith = useCallback(
    (kind: "closingCancel" | "closingDone") => {
      setState(kind);
      const ms = kind === "closingDone" ? DURATION.done : DURATION.out;
      after(ms * k + 50, () => {
        dialogRef.current?.close();
        setState("closed");
        triggerRef.current?.focus({ preventScroll: true });
      });
    },
    [after, k],
  );

  // Simulated submit: spinner, then the success state.
  const submit = useCallback(() => {
    setState("submitting");
    after(900 * k, () => setState("success"));
  }, [after, k]);

  // Auto-close after success, paused while the pointer rests on the dialog.
  useEffect(() => {
    if (state !== "success" || progressPaused) return;
    const id = window.setTimeout(() => closeWith("closingDone"), SUCCESS_HOLD);
    return () => window.clearTimeout(id);
  }, [state, progressPaused, closeWith]);

  // Escape plays the exit too: the native close is blocked and the dialog is
  // closed by hand once the animation has finished.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (event: Event) => {
      event.preventDefault();
      if (state === "closed") return;
      closeWith(state === "success" ? "closingDone" : "closingCancel");
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [closeWith, state]);

  const handleBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current && state !== "closed") {
      closeWith(state === "success" ? "closingDone" : "closingCancel");
    }
  };

  return (
    <>
      <Head>
        <title>Contact modal motion prototype | Setproduct</title>
        <meta content="noindex, nofollow" name="robots" />
      </Head>
      <SiteHeader navData={navData} />
      <main className="mt-22.5">
        <div className="section">
          <div className="section-padding top-80 bottom-80">
            <div className="container">
              <h1 className="heading-style-h2">Contact modal motion prototype</h1>
              <div className="spacer-16" />
              <p className="text-size-large m-0">
                The card grows out of the button you press and returns into it on cancel. After a successful send
                it dissolves upwards instead, and closes itself after three seconds. Nothing here talks to the
                server, the success state is simulated.
              </p>

              <div className="spacer-24" />
              <label className="text-size-regular text-weight-bold flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} />
                Slow motion (three times slower)
              </label>

              <div className="spacer-32" />
              <h2 className="heading-style-h5">Open from a corner</h2>
              <div className="spacer-4" />
              <p className={`text-size-regular ${styles.note}`}>
                Each corner changes where the card grows from. Check that the edge is not clipped near the window
                edges.
              </p>
              <div className="spacer-16" />

              <div className={styles.originRow}>
                <button className="button-small w-inline-block" onClick={open} type="button">
                  <div className="text-size-medium text-weight-bold">Open here</div>
                </button>
                <button className="button-small secondary w-inline-block" onClick={open} type="button">
                  <div className="text-size-medium text-weight-bold">Open here</div>
                </button>
              </div>

              <div className="spacer-48" />
              <h2 className="heading-style-h5">Timeline</h2>
              <div className="spacer-16" />
              <ul className={`text-size-regular ${styles.timeline}`}>
                {TIMELINE.map((line) => (
                  <li key={line.t}>
                    <b>{line.t}</b>
                    <span>{line.what}</span>
                  </li>
                ))}
              </ul>

              <div className="spacer-24" />
              <p className={`text-size-regular ${styles.note}`}>
                Keyboard: Escape plays the cancel exit. The dialog stays in the top layer for the whole exit, so the
                page behind never flashes unlocked.
              </p>

              <div className="spacer-64" />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="button-small outlined w-inline-block" onClick={open} type="button">
                  <div className="text-size-medium text-weight-bold">Open here</div>
                </button>
                <button className="button-small outlined w-inline-block" onClick={open} type="button">
                  <div className="text-size-medium text-weight-bold">Open here</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <dialog
        aria-labelledby="proto-dialog-title"
        className={`contact-dialog ${styles.dialog} ${slow ? styles.slow : ""}`}
        data-demo-state={state}
        onClick={handleBackdrop}
        onPointerEnter={() => setProgressPaused(true)}
        onPointerLeave={() => setProgressPaused(false)}
        ref={dialogRef}
        style={
          {
            "--ox": `${origin.x}%`,
            "--oy": `${origin.y}%`,
            "--progress-state": progressPaused ? "paused" : "running",
          } as CSSProperties
        }
      >
        <div className={`contact-dialog_card ${styles.card}`} tabIndex={-1}>
          <button
            aria-label="Close"
            className="contact-dialog_close"
            onClick={() => closeWith(state === "success" ? "closingDone" : "closingCancel")}
            type="button"
          >
            <CloseIcon className="contact-dialog_close-icon" />
          </button>

          {state !== "success" ? (
            <div className="contact-dialog_body">
              <div className="contact-dialog_heading">
                <h2 className="heading-style-h2" id="proto-dialog-title">
                  Contact us
                </h2>
                <p className="text-size-medium">
                  Send your questions, ideas, and collaboration inquiries. We'll reply within 24 hours.
                </p>
              </div>

              <div className="contact-dialog_form">
                <div className="field">
                  <label className="field-label" htmlFor="proto-email">
                    Email
                  </label>
                  <input
                    autoComplete="email"
                    className="text-input is-l"
                    defaultValue="you@company.com"
                    disabled={state === "submitting"}
                    id="proto-email"
                    name="Email"
                    type="email"
                  />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="proto-message">
                    Message
                  </label>
                  <textarea
                    className="textarea-input is-l"
                    defaultValue="Demo message, nothing is sent."
                    disabled={state === "submitting"}
                    id="proto-message"
                    name="Message"
                    rows={4}
                  />
                </div>

                <div className="contact-dialog_actions">
                  <button
                    aria-busy={state === "submitting" || undefined}
                    className="button w-inline-block disabled:opacity-70"
                    disabled={state === "submitting"}
                    onClick={submit}
                    type="button"
                  >
                    <div className="text-size-large text-weight-bold">
                      {state === "submitting" ? "Sending…" : "Send message"}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div aria-live="polite" className={`contact-dialog_body ${styles.successBody}`}>
              <div className={styles.check}>
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M5 13l4.5 4.5L19 7" />
                </svg>
              </div>
              <div className="contact-dialog_heading">
                <h2 className="heading-style-h2">Message sent</h2>
                <p className="text-size-medium">Thank you. We'll reply within 24 hours.</p>
              </div>
              <div className="contact-dialog_actions">
                <button
                  className="button-small outlined w-inline-block"
                  onClick={() => closeWith("closingDone")}
                  type="button"
                >
                  <div className="text-size-medium text-weight-bold">Done</div>
                </button>
              </div>
              <div aria-hidden="true" className={styles.progress} />
            </div>
          )}
        </div>
      </dialog>

      <SiteFooter navData={navData} />
    </>
  );
}
