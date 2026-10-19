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
  { id: "hover", title: "Hover (frozen)", note: "Now: same as focus. Proposed: no movement, same inner shadow. Fill clears up, border turns light purple" },
  { id: "focus", title: "Focus (frozen)", note: "Now: 1px border only. Proposed: 2px purple border, the inner shadow moves outside as the outlined button edge, the field lifts 2px, the label stays. Click a field to see the motion" },
  { id: "filled", title: "Filled", note: "Value entered, no focus" },
  { id: "error", title: "Error", note: "Now: no error style at all. Proposed: red border, text linked via aria-describedby" },
  { id: "disabled", title: "Disabled", note: "Now: Webflow grey #eee. Proposed: brand fill at 60%" },
];

const SEARCH_ICON = "/images/search.svg";

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

type Size = "l" | "m" | "s";

const SIZES: { id: Size; title: string; button: string; buttonText: string; note: string }[] = [
  {
    id: "l",
    title: "L",
    button: "button",
    buttonText: "text-size-large",
    note: "Height 50, radius 20, text 18, focus edge 6. Forms, subscribe, contact modal",
  },
  {
    id: "m",
    title: "M",
    button: "button-small",
    buttonText: "text-size-medium",
    note: "Height 40, radius 16, text 16, focus edge 4. Navbar search, /search, filters",
  },
  {
    id: "s",
    title: "S",
    button: "button-x-small",
    buttonText: "text-size-regular",
    note: "Height 31, radius 12, text 14 (16 on touch), focus edge 3. Mega-menu, compact filters",
  },
];

function sizeClass(size: Size) {
  return styles[size];
}

function forcedClass(state: StateId) {
  if (state === "hover") return styles.forceHover;
  if (state === "focus") return styles.forceFocus;
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
          className={cx("text-input w-input", proto, proto && sizeClass("l"), forcedClass(state))}
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
          className={cx("text-input is-nav-search w-input", styles.searchWide, proto, proto && sizeClass("m"), forcedClass(state))}
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
          className={cx("textarea-input w-input", proto, proto && sizeClass("l"))}
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
            className={cx("text-input w-select", proto, sizeClass("m"), styles.select)}
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
          className={cx("text-input w-input", proto, proto && sizeClass("l"))}
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

function SizeRows() {
  return (
    <div className={styles.proto}>
      {SIZES.map((size) => (
        <div key={size.id} className={styles.sizeBlock}>
          <div className={styles.sizeHead}>
            <span className="heading-style-h6">{size.title}</span>
            <span className={`text-size-small ${styles.cellLabel}`}>{size.note}</span>
          </div>
          <div className={styles.sizeRow}>
            <input
              aria-label={`Email, size ${size.title}`}
              autoComplete="email"
              className={cx("text-input w-input", styles.f, sizeClass(size.id))}
              placeholder="Enter your email"
              type="email"
            />
            <input
              aria-label={`Email, size ${size.title}, focused`}
              className={cx("text-input w-input", styles.f, sizeClass(size.id), styles.forceFocus)}
              defaultValue="roman@setproduct.com"
              type="email"
            />
            <button className={`${size.button} w-inline-block`} type="button">
              <div className={`${size.buttonText} text-weight-bold`}>Subscribe</div>
            </button>
            <button className={`${size.button} ${size.id === "s" ? "is-secondary" : "secondary"} w-inline-block`} type="button">
              <div className={`${size.buttonText} text-weight-bold`}>Cancel</div>
            </button>
          </div>
        </div>
      ))}
    </div>
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
                and tab through it. Check the page at 1440, 1024, 768 and 390 px.
              </p>

              <div className="spacer-48" />
              <h2 className="heading-style-h5">Sizes L, M, S next to the buttons</h2>
              <div className="spacer-4" />
              <p className={`text-size-regular ${styles.cellLabel}`}>
                Each row: empty field, frozen focus, primary and secondary button of the same size. Heights
                match the button, and the focus edge matches the button edge. Click the empty field to see the
                motion.
              </p>
              <div className="spacer-16" />
              <SizeRows />

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
