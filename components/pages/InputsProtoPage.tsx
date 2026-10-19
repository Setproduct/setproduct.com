import Head from "next/head";
import { useState } from "react";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import type { BlogPostPreview } from "../../types/data";
import styles from "./InputsProtoPage.module.css";

type Props = {
  blogPosts: BlogPostPreview[];
};

type Variant = "now" | "proto";
type StateId = "default" | "hover" | "focus" | "filled" | "error" | "disabled";

const STATES: { id: StateId; title: string; note: string }[] = [
  { id: "default", title: "Default", note: "Empty field, placeholder visible" },
  { id: "hover", title: "Hover (frozen)", note: "Now: same as focus. Proposed: the well gets one step deeper, no colour change" },
  { id: "focus", title: "Focus (frozen)", note: "Now: 1px border only, nothing else happens. Proposed: the field sinks deeper into the page — the same move as the push button dropping onto its edge" },
  { id: "filled", title: "Filled", note: "Value entered, no focus" },
  { id: "error", title: "Error", note: "Now: no error style at all. Proposed: the well turns red, plus a text message linked to the field for screen readers" },
  { id: "disabled", title: "Disabled", note: "Now: Webflow grey #eee. Proposed: brand fill at 60%" },
];

/* Three ways to render the focused well. All of them keep the field on its own
   fill and add no outer glow — the depth does the work. */
const FOCUS_VARIANTS: { cls: string; title: string; note: string }[] = [
  {
    cls: "",
    title: "A · Deep well",
    note: "Top wall grows from 3 to 7px, the bottom edge catches light. Closest to the current brand shadow",
  },
  {
    cls: "focusB",
    title: "B · Deep well + darker fill",
    note: "Same as A, but the fill loses light: the field reads as a hole in the page, not a raised plate",
  },
  {
    cls: "focusC",
    title: "C · Recessed on both walls",
    note: "Top and bottom walls both curve inward. Reads as pressed from above and below, like the S-size button",
  },
];

const SEARCH_ICON = "/images/search.svg";

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

function forcedClass(state: StateId) {
  if (state === "hover") return styles.forceHover;
  if (state === "focus") return styles.forceFocus;
  return undefined;
}

/* Maps a variant key from FOCUS_VARIANTS to its module class. */
function focusVariantClass(key: string) {
  if (key === "focusB") return styles.focusB;
  if (key === "focusC") return styles.focusC;
  return undefined;
}

function StateFields({ variant, state }: { variant: Variant; state: StateId }) {
  const proto = variant === "proto" && styles.f;
  const id = `${variant}-${state}`;
  const isError = state === "error";
  const value = state === "filled" || isError ? (isError ? "roman@setproduct" : "roman@setproduct.com") : undefined;

  return (
    <>
      <div className={styles.fieldWrap}>
        <label className={`text-size-regular ${styles.label}`} htmlFor={`${id}-email`}>
          Email
        </label>
        <input
          aria-describedby={isError ? `${id}-email-error` : `${id}-email-hint`}
          aria-invalid={isError || undefined}
          autoComplete="email"
          className={cx("text-input w-input", proto, forcedClass(state))}
          defaultValue={value}
          disabled={state === "disabled"}
          id={`${id}-email`}
          placeholder="Enter your email"
          type="email"
        />
        {isError ? (
          <p className={`text-size-small ${styles.errorText}`} id={`${id}-email-error`}>
            Enter a full email address, like name@example.com
          </p>
        ) : (
          <p className={`text-size-small ${styles.hint}`} id={`${id}-email-hint`}>
            Once per week, no spam
          </p>
        )}
      </div>

      <div className="search w-form">
        <input
          aria-label="Search Setproduct"
          className={cx("text-input is-nav-search w-input", styles.searchWide, proto, forcedClass(state))}
          defaultValue={state === "filled" || isError ? "dashboard" : undefined}
          aria-invalid={isError || undefined}
          disabled={state === "disabled"}
          placeholder="Search UI kits, templates, articles…"
          type="search"
        />
        <div className="search-icon-wr">
          <img alt="" className="search-icon" src={SEARCH_ICON} />
        </div>
      </div>
    </>
  );
}

function LiveFields({ variant, submitting }: { variant: Variant; submitting: boolean }) {
  const proto = variant === "proto" && styles.f;
  const id = `${variant}-live`;
  const [topic, setTopic] = useState("");

  return (
    <>
      <div className={styles.fieldWrap}>
        <label className={`text-size-regular ${styles.label}`} htmlFor={`${id}-message`}>
          Message
        </label>
        <textarea
          className={cx("textarea-input w-input", proto)}
          id={`${id}-message`}
          maxLength={5000}
          placeholder="Type your message…"
          required
        />
      </div>

      <div className={styles.fieldWrap}>
        <label className={`text-size-regular ${styles.label}`} htmlFor={`${id}-topic`}>
          Topic
        </label>
        {variant === "now" ? (
          <div className="relative w-full sm:w-auto">
            <select
              id={`${id}-topic`}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={`appearance-none w-full m-0! h-auto! text-size-regular text-weight-semibold text-inherit cursor-pointer radius-full border border-solid pl-4 pr-10 py-2 outline-none focus-visible:ring-2 focus-visible:ring-(--primary) ${topic ? "border-(--primary) bg-(--light-primary)" : "border-(--black-transparent) bg-(--light-purple)"}`}
            >
              <option value="">All topics</option>
              <option value="ui">UI Design</option>
              <option value="saas">Startups &amp; SaaS</option>
            </select>
          </div>
        ) : (
          <select
            className={cx("text-input w-select", proto, styles.select)}
            id={`${id}-topic`}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="">All topics</option>
            <option value="ui">UI Design</option>
            <option value="saas">Startups &amp; SaaS</option>
          </select>
        )}
      </div>

      <form className={cx("form-cta", variant === "proto" && styles.inlineForm)} onSubmit={(e) => e.preventDefault()}>
        <input
          aria-label="Email address"
          autoComplete={variant === "proto" ? "email" : undefined}
          className={cx("text-input w-input", proto)}
          disabled={submitting}
          placeholder="Enter your email"
          required
          type="email"
        />
        <div className="button-form-wr">
          <button className="button w-inline-block disabled:opacity-70" disabled={submitting} type="submit">
            <div className="text-size-large text-weight-bold">Subscribe</div>
          </button>
        </div>
      </form>
    </>
  );
}

export default function InputsProtoPage({ blogPosts }: Props) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <Head>
        <title>Inputs prototype | Setproduct</title>
        <meta content="noindex, nofollow" name="robots" />
      </Head>
      <SiteHeader blogPosts={blogPosts} />
      <main className="mt-22.5">
        <div className="section">
          <div className="section-padding top-80 bottom-80">
            <div className="container">
              <h1 className="heading-style-h2">Inputs prototype</h1>
              <div className="spacer-16" />
              <p className="text-size-large m-0">
                Left column shows the fields as they are on the site now. Right column shows the proposed
                styles. Hover and focus rows are frozen; every other field is live, so you can click, type
                and tab through it. Check the page at 1440, 1024, 768 and 390 px. The three focus options
                are compared right below the states table.
              </p>

              {STATES.map((state) => (
                <div key={state.id}>
                  <div className="spacer-48" />
                  <h2 className="heading-style-h5">{state.title}</h2>
                  <div className="spacer-4" />
                  <p className={`text-size-regular ${styles.cellLabel}`}>{state.note}</p>
                  <div className="spacer-16" />
                  <div className={styles.row}>
                    <div className={`${styles.cell} ${styles.now}`}>
                      <p className={`text-size-small ${styles.cellLabel}`}>Now</p>
                      <StateFields variant="now" state={state.id} />
                    </div>
                    <div className={`${styles.cell} ${styles.proto}`}>
                      <p className={`text-size-small ${styles.cellLabel}`}>Proposed</p>
                      <StateFields variant="proto" state={state.id} />
                    </div>
                  </div>
                </div>
              ))}

              <div className="spacer-48" />
              <h2 className="heading-style-h5">Focus: three options</h2>
              <div className="spacer-4" />
              <p className={`text-size-regular ${styles.cellLabel}`}>
                All three drop the outer ring and build on the inner shadow instead. Shown focused; the
                second row shows each of them at rest for comparison.
              </p>
              <div className="spacer-16" />
              <div className={styles.rowFour}>
                {FOCUS_VARIANTS.map((v) => (
                  <div className={`${styles.cell} ${styles.proto}`} key={v.title}>
                    <p className={`text-size-small ${styles.cellLabel}`}>{v.title}</p>
                    <input
                      aria-label={`Focused field, ${v.title}`}
                      className={cx("text-input w-input", styles.f, styles.forceFocus, focusVariantClass(v.cls))}
                      defaultValue="roman@setproduct.com"
                      type="email"
                    />
                    <input
                      aria-label={`Field at rest, ${v.title}`}
                      className={cx("text-input w-input", styles.f)}
                      defaultValue="roman@setproduct.com"
                      type="email"
                    />
                    <p className={`text-size-small ${styles.hint}`}>{v.note}</p>
                  </div>
                ))}
              </div>

              <div className="spacer-48" />
              <h2 className="heading-style-h5">Live: textarea, select, field with a button</h2>
              <div className="spacer-4" />
              <p className={`text-size-regular ${styles.cellLabel}`}>
                Proposed select is native and styled like the field. The button next to the field should
                match its height.
              </p>
              <div className="spacer-16" />
              <label className="text-size-regular text-weight-bold flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={submitting} onChange={(e) => setSubmitting(e.target.checked)} />
                Simulate submitting (disables the subscribe form)
              </label>
              <div className="spacer-4" />
              <p className={`text-size-small ${styles.hint}`}>
                Click into either column to feel the focus move. The left column is the site as it is today.
              </p>
              <div className="spacer-16" />
              <div className={styles.row}>
                <div className={`${styles.cell} ${styles.now}`}>
                  <p className={`text-size-small ${styles.cellLabel}`}>Now</p>
                  <LiveFields variant="now" submitting={submitting} />
                </div>
                <div className={`${styles.cell} ${styles.proto}`}>
                  <p className={`text-size-small ${styles.cellLabel}`}>Proposed</p>
                  <LiveFields variant="proto" submitting={submitting} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
