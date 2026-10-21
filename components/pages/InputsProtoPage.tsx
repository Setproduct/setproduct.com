import Head from "next/head";
import { useState } from "react";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import type { BlogPostPreview } from "../../types/data";
import styles from "./InputsProtoPage.module.css";

type Props = {
  blogPosts: BlogPostPreview[];
};

type StateId = "default" | "hover" | "focus" | "filled" | "error" | "disabled";
type Size = "l" | "m" | "s";

const STATES: { id: StateId; title: string; note: string }[] = [
  { id: "default", title: "Default", note: "Empty field, placeholder visible" },
  { id: "hover", title: "Hover (frozen)", note: "Now: same as focus. Proposed: no movement, same inner shadow. Fill clears up, border turns light purple" },
  { id: "focus", title: "Focus (frozen)", note: "Now: 1px border only. Proposed: 2px purple border, the inner shadow moves outside as the outlined button edge (6 / 4 / 3), the field lifts, the label stays. Click a field to see the motion" },
  { id: "filled", title: "Filled", note: "Value entered, no focus" },
  { id: "error", title: "Error", note: "Now: no error style at all. Proposed: red border, text linked via aria-describedby" },
  { id: "disabled", title: "Disabled", note: "Now: Webflow grey #eee. Proposed: brand fill at 60%" },
];

/* Every field size is paired with the button of the same size (see the CSS module). */
const SIZES: {
  id: Size;
  title: string;
  spec: string;
  button: string;
  buttonText: string;
  secondary: string;
  label: string;
  hint: string;
}[] = [
  {
    id: "l",
    title: "L",
    spec: "50 high, radius 20, text 18, edge 6",
    button: "button",
    buttonText: "text-size-large",
    secondary: "secondary",
    label: "text-size-regular",
    hint: "text-size-small",
  },
  {
    id: "m",
    title: "M",
    spec: "40 high, radius 16, text 16, edge 4",
    button: "button-small",
    buttonText: "text-size-medium",
    secondary: "secondary",
    label: "text-size-small",
    hint: "text-size-tiny",
  },
  {
    id: "s",
    title: "S",
    spec: "31 high, radius 12, text 14, edge 3",
    button: "button-x-small",
    buttonText: "text-size-regular",
    secondary: "is-secondary",
    label: "text-size-small",
    hint: "text-size-tiny",
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

function SizeTag({ size }: { size: (typeof SIZES)[number] }) {
  return (
    <div className={styles.sizeTag}>
      <span className="text-size-regular text-weight-bold">{size.title}</span>
      <span className={`text-size-tiny ${styles.cellLabel}`}>{size.spec}</span>
    </div>
  );
}

/* ---------- Current site: one size, as it is now ---------- */

function NowStateFields({ state }: { state: StateId }) {
  const id = `now-${state}`;
  const isError = state === "error";
  const value = state === "filled" ? "roman@setproduct.com" : isError ? "roman@setproduct" : undefined;

  return (
    <>
      <div className={styles.fieldWrap}>
        <label className={`text-size-regular ${styles.label}`} htmlFor={`${id}-email`}>
          Email
        </label>
        <input
          aria-describedby={isError ? `${id}-email-error` : `${id}-email-hint`}
          aria-invalid={isError || undefined}
          className={cx("text-input w-input", forcedClass(state))}
          defaultValue={value}
          disabled={state === "disabled"}
          id={`${id}-email`}
          placeholder="Enter your email"
          type="email"
        />
        {isError ? (
          <p className={`text-size-small ${styles.errorText}`} id={`${id}-email-error`}>
            Enter a full email address
          </p>
        ) : (
          <p className={`text-size-small ${styles.hint}`} id={`${id}-email-hint`}>
            Once per week, no spam
          </p>
        )}
      </div>

      <div className="search w-form">
        <input
          aria-invalid={isError || undefined}
          aria-label="Search Setproduct"
          className={cx("text-input is-nav-search w-input", styles.searchWide, forcedClass(state))}
          defaultValue={state === "filled" || isError ? "dashboard" : undefined}
          disabled={state === "disabled"}
          placeholder="Search kits, articles…"
          type="search"
        />
        <div className="search-icon-wr">
          <img alt="" className="search-icon" src={SEARCH_ICON} />
        </div>
      </div>
    </>
  );
}

/* ---------- Proposed: the same state in L, M and S ---------- */

function ProtoStateFields({ state }: { state: StateId }) {
  const isError = state === "error";
  const value = state === "filled" ? "roman@setproduct.com" : isError ? "roman@setproduct" : undefined;

  return (
    <div className={styles.sizes}>
      {SIZES.map((size) => {
        const id = `proto-${state}-${size.id}`;
        return (
          <div className={styles.sizeCol} key={size.id}>
            <SizeTag size={size} />

            <div className={styles.fieldWrap}>
              <label className={`${size.label} ${styles.label}`} htmlFor={`${id}-email`}>
                Email
              </label>
              <input
                aria-describedby={isError ? `${id}-email-error` : `${id}-email-hint`}
                aria-invalid={isError || undefined}
                autoComplete="email"
                className={cx("text-input w-input", styles.f, styles[size.id], forcedClass(state))}
                defaultValue={value}
                disabled={state === "disabled"}
                id={`${id}-email`}
                placeholder="Enter your email"
                type="email"
              />
              {isError ? (
                <p className={`${size.hint} ${styles.errorText}`} id={`${id}-email-error`}>
                  Enter a full email address
                </p>
              ) : (
                <p className={`${size.hint} ${styles.hint}`} id={`${id}-email-hint`}>
                  Once per week, no spam
                </p>
              )}
            </div>

            <div className="search w-form">
              <input
                aria-invalid={isError || undefined}
                aria-label={`Search Setproduct, size ${size.title}`}
                className={cx(
                  "text-input is-nav-search w-input",
                  styles.searchWide,
                  styles.f,
                  styles[size.id],
                  forcedClass(state),
                )}
                defaultValue={state === "filled" || isError ? "dashboard" : undefined}
                disabled={state === "disabled"}
                placeholder="Search kits, articles…"
                type="search"
              />
              <div className="search-icon-wr">
                <img alt="" className="search-icon" src={SEARCH_ICON} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Live: textarea, select, field with a button ---------- */

const TOPICS = [
  { value: "", label: "All topics" },
  { value: "ui", label: "UI Design" },
  { value: "saas", label: "Startups & SaaS" },
];

function NowLiveFields({ submitting }: { submitting: boolean }) {
  const [topic, setTopic] = useState("");

  return (
    <>
      <div className={styles.fieldWrap}>
        <label className={`text-size-regular ${styles.label}`} htmlFor="now-live-message">
          Message
        </label>
        <textarea className="textarea-input w-input" id="now-live-message" maxLength={5000} placeholder="Type your message…" />
      </div>

      <div className={styles.fieldWrap}>
        <label className={`text-size-regular ${styles.label}`} htmlFor="now-live-topic">
          Topic
        </label>
        <div className="relative w-full">
          <select
            className={`appearance-none w-full m-0! h-auto! text-size-regular text-weight-semibold text-inherit cursor-pointer radius-full border border-solid pl-4 pr-10 py-2 outline-none focus-visible:ring-2 focus-visible:ring-(--primary) ${topic ? "border-(--primary) bg-(--light-primary)" : "border-(--black-transparent) bg-(--light-purple)"}`}
            id="now-live-topic"
            onChange={(e) => setTopic(e.target.value)}
            value={topic}
          >
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form className="form-cta is-vertical" onSubmit={(e) => e.preventDefault()}>
        <input aria-label="Email address" className="text-input w-input" disabled={submitting} placeholder="Enter your email" required type="email" />
        <div className="button-form-wr">
          <button className="button w-inline-block disabled:opacity-70" disabled={submitting} type="submit">
            <div className="text-size-large text-weight-bold">Subscribe</div>
          </button>
        </div>
      </form>
    </>
  );
}

function ProtoLiveFields({ submitting }: { submitting: boolean }) {
  const [topics, setTopics] = useState<Record<Size, string>>({ l: "", m: "", s: "" });

  return (
    <div className={styles.sizes}>
      {SIZES.map((size) => {
        const id = `proto-live-${size.id}`;
        return (
          <div className={styles.sizeCol} key={size.id}>
            <SizeTag size={size} />

            <div className={styles.fieldWrap}>
              <label className={`${size.label} ${styles.label}`} htmlFor={`${id}-message`}>
                Message
              </label>
              <textarea
                className={cx("textarea-input w-input", styles.f, styles[size.id])}
                id={`${id}-message`}
                maxLength={5000}
                placeholder="Type your message…"
              />
            </div>

            <div className={styles.fieldWrap}>
              <label className={`${size.label} ${styles.label}`} htmlFor={`${id}-topic`}>
                Topic
              </label>
              <select
                className={cx("text-input w-select", styles.f, styles[size.id], styles.select)}
                id={`${id}-topic`}
                onChange={(e) => setTopics((prev) => ({ ...prev, [size.id]: e.target.value }))}
                value={topics[size.id]}
              >
                {TOPICS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <form className={styles.stackForm} onSubmit={(e) => e.preventDefault()}>
              <input
                aria-label={`Email address, size ${size.title}`}
                autoComplete="email"
                className={cx("text-input w-input", styles.f, styles[size.id])}
                disabled={submitting}
                placeholder="Enter your email"
                required
                type="email"
              />
              <button className={`${size.button} w-inline-block disabled:opacity-70`} disabled={submitting} type="submit">
                <div className={`${size.buttonText} text-weight-bold`}>Subscribe</div>
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Attention field: border beam, one per screen at most ---------- */

function AttentionFields() {
  return (
    <div className={styles.sizes}>
      {SIZES.map((size) => {
        const id = `attention-${size.id}`;
        return (
          <div className={styles.sizeCol} key={size.id}>
            <SizeTag size={size} />

            <div className={styles.fieldWrap}>
              <label className={`${size.label} ${styles.label}`} htmlFor={`${id}-email`}>
                Email
              </label>
              <input
                aria-describedby={`${id}-email-hint`}
                autoComplete="email"
                className={cx("text-input w-input", styles.f, styles[size.id], styles.attention)}
                id={`${id}-email`}
                placeholder="Enter your email"
                type="email"
              />
              <p className={`${size.hint} ${styles.hint}`} id={`${id}-email-hint`}>
                Once per week, no spam
              </p>
            </div>

            <div className="search w-form">
              <input
                aria-label={`Search Setproduct, attention field, size ${size.title}`}
                className={cx(
                  "text-input is-nav-search w-input",
                  styles.searchWide,
                  styles.f,
                  styles[size.id],
                  styles.attention,
                )}
                placeholder="Search kits, articles…"
                type="search"
              />
              <div className="search-icon-wr">
                <img alt="" className="search-icon" src={SEARCH_ICON} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Sizes overview: a field next to the buttons of the same size ---------- */

function SizeRows() {
  return (
    <div className={`${styles.proto} ${styles.cell}`}>
      {SIZES.map((size) => (
        <div className={styles.sizeRowBlock} key={size.id}>
          <SizeTag size={size} />
          <div className={styles.sizeRow}>
            <input
              aria-label={`Email, size ${size.title}`}
              autoComplete="email"
              className={cx("text-input w-input", styles.f, styles[size.id])}
              placeholder="Enter your email"
              type="email"
            />
            <button className={`${size.button} w-inline-block`} type="button">
              <div className={`${size.buttonText} text-weight-bold`}>Subscribe</div>
            </button>
            <button className={`${size.button} ${size.secondary} w-inline-block`} type="button">
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
                styles in three sizes, L, M and S, paired with the buttons of the same size. Hover and focus
                rows are frozen; every other field is live. Check the page at 1440, 1024, 768 and 390 px.
              </p>

              <div className="spacer-48" />
              <h2 className="heading-style-h5">Sizes next to the buttons</h2>
              <div className="spacer-4" />
              <p className={`text-size-regular ${styles.cellLabel}`}>
                Each row is a field with the primary and secondary button of the same size. Heights, radii and
                the focus edge match. Click a field to see the focus next to the buttons.
              </p>
              <div className="spacer-16" />
              <SizeRows />

              <div className="spacer-48" />
              <h2 className="heading-style-h5">Attention field (border beam)</h2>
              <div className="spacer-4" />
              <p className={`text-size-regular ${styles.cellLabel}`}>
                For the one field on a screen that has to catch the eye, like the hero subscribe form. A purple
                beam runs along the border, one lap every 4 seconds. On focus the beam stops and the regular focus takes
                over. With reduced motion the border stays still.
              </p>
              <div className="spacer-16" />
              <div className={styles.rowWide}>
                <div className={`${styles.cell} ${styles.now}`}>
                  <p className={`text-size-small ${styles.cellLabel}`}>Now</p>
                  <p className={`text-size-regular ${styles.cellLabel}`}>Not on the site yet</p>
                </div>
                <div className={`${styles.cell} ${styles.proto}`}>
                  <p className={`text-size-small ${styles.cellLabel}`}>Proposed</p>
                  <AttentionFields />
                </div>
              </div>

              {STATES.map((state) => (
                <div key={state.id}>
                  <div className="spacer-48" />
                  <h2 className="heading-style-h5">{state.title}</h2>
                  <div className="spacer-4" />
                  <p className={`text-size-regular ${styles.cellLabel}`}>{state.note}</p>
                  <div className="spacer-16" />
                  <div className={styles.rowWide}>
                    <div className={`${styles.cell} ${styles.now}`}>
                      <p className={`text-size-small ${styles.cellLabel}`}>Now</p>
                      <NowStateFields state={state.id} />
                    </div>
                    <div className={`${styles.cell} ${styles.proto}`}>
                      <p className={`text-size-small ${styles.cellLabel}`}>Proposed</p>
                      <ProtoStateFields state={state.id} />
                    </div>
                  </div>
                </div>
              ))}

              <div className="spacer-48" />
              <h2 className="heading-style-h5">Live: textarea, select, field with a button</h2>
              <div className="spacer-4" />
              <p className={`text-size-regular ${styles.cellLabel}`}>
                Proposed select is native and styled like the field. In each size the subscribe button is the
                button of the same size.
              </p>
              <div className="spacer-16" />
              <label className="text-size-regular text-weight-bold flex items-center gap-2 cursor-pointer">
                <input checked={submitting} onChange={(e) => setSubmitting(e.target.checked)} type="checkbox" />
                Simulate submitting (disables the subscribe forms)
              </label>
              <div className="spacer-16" />
              <div className={styles.rowWide}>
                <div className={`${styles.cell} ${styles.now}`}>
                  <p className={`text-size-small ${styles.cellLabel}`}>Now</p>
                  <NowLiveFields submitting={submitting} />
                </div>
                <div className={`${styles.cell} ${styles.proto}`}>
                  <p className={`text-size-small ${styles.cellLabel}`}>Proposed</p>
                  <ProtoLiveFields submitting={submitting} />
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
