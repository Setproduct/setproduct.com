import Head from "next/head";
import { useState } from "react";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ArrowIcon from "../sections/ArrowIcon";
import type { BlogPostPreview } from "../../types/data";
import styles from "./PushButtonsProtoPage.module.css";

type Props = {
  blogPosts: BlogPostPreview[];
};

type RowId = "large" | "medium" | "small" | "card";

const ROWS: { id: RowId; title: string; note: string }[] = [
  { id: "large", title: "L · button", note: "Outer edge 6em. Hero, section CTA, form submit" },
  { id: "medium", title: "M · button-small", note: "Outer edge 4em. Card actions, load more, navbar" },
  { id: "small", title: "S · button-x-small and chips", note: "Press inside the box, no outer edge" },
  { id: "card", title: "Card with overflow hidden", note: "Checks that the outer edge is not clipped" },
];

function ButtonSet({ row }: { row: RowId }) {
  if (row === "large") {
    return (
      <>
        <a className="button w-inline-block" href="#large" onClick={(e) => e.preventDefault()}>
          <div className="text-size-large text-weight-bold">Primary</div>
        </a>
        <a className="button secondary w-inline-block" href="#large" onClick={(e) => e.preventDefault()}>
          <div className="text-size-large text-weight-bold">See all</div>
          <div className="button-icon w-embed">
            <ArrowIcon />
          </div>
        </a>
        <button type="button" className="button w-inline-block disabled:opacity-70" disabled>
          <div className="text-size-large text-weight-bold">Disabled</div>
        </button>
      </>
    );
  }

  if (row === "medium") {
    return (
      <>
        <a className="button-small w-inline-block" href="#medium" onClick={(e) => e.preventDefault()}>
          <div className="text-size-medium text-weight-bold">Buy</div>
          <div className="button-icon is-small w-embed">
            <ArrowIcon />
          </div>
        </a>
        <a className="button-small secondary w-inline-block" href="#medium" onClick={(e) => e.preventDefault()}>
          <div className="text-size-medium text-weight-bold">Secondary</div>
        </a>
        <a className="button-small outlined w-inline-block" href="#medium" onClick={(e) => e.preventDefault()}>
          <div className="text-size-medium text-weight-bold">Learn more</div>
          <div className="button-icon is-small w-embed">
            <ArrowIcon />
          </div>
        </a>
        <button type="button" className="button-small outlined w-inline-block">
          <div className="text-size-medium text-weight-bold">Load more</div>
        </button>
      </>
    );
  }

  if (row === "small") {
    return (
      <>
        <a className="button-x-small w-inline-block" href="#small" onClick={(e) => e.preventDefault()}>
          <div className="text-size-regular text-weight-bold">View</div>
        </a>
        <a className="button-x-small is-secondary w-inline-block" href="#small" onClick={(e) => e.preventDefault()}>
          <div className="text-size-regular text-weight-bold">Preview</div>
        </a>
        <button type="button" className="button-x-small is-text w-inline-block">
          <div className="text-size-small text-weight-semibold">Chip</div>
        </button>
        <button type="button" className="button-x-small is-text is-active w--current w-inline-block" aria-pressed="true">
          <div className="text-size-small text-weight-semibold">Active chip</div>
        </button>
      </>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardImage} />
      <div className="text-size-large text-weight-bold">Template name</div>
      <div className="template-list-btn-wr">
        <a className="button-small w-inline-block" href="#card" onClick={(e) => e.preventDefault()}>
          <div className="text-size-medium text-weight-bold">Buy</div>
          <div className="button-icon is-small w-embed">
            <ArrowIcon />
          </div>
        </a>
        <a className="button-small outlined w-inline-block" href="#card" onClick={(e) => e.preventDefault()}>
          <div className="text-size-medium text-weight-bold">Learn more</div>
          <div className="button-icon is-small w-embed">
            <ArrowIcon />
          </div>
        </a>
      </div>
    </div>
  );
}

export default function PushButtonsProtoPage({ blogPosts }: Props) {
  const [pressedAll, setPressedAll] = useState(false);
  const protoClass = pressedAll ? `${styles.cell} ${styles.proto} ${styles.pressedAll}` : `${styles.cell} ${styles.proto}`;

  return (
    <>
      <Head>
        <title>Push buttons prototype | Setproduct</title>
        <meta content="noindex, nofollow" name="robots" />
      </Head>
      <SiteHeader blogPosts={blogPosts} />
      {/* Empty touchstart listener makes :active work in iOS Safari */}
      <main className="mt-22.5" onTouchStart={() => {}}>
        <div className="section">
          <div className="section-padding top-80 bottom-80">
            <div className="container">
              <h1 className="heading-style-h2">Push buttons prototype</h1>
              <div className="spacer-16" />
              <p className="text-size-large m-0">
                Left column shows the live buttons. Right column shows the push effect in brand colours. Hover
                to see the inner glow, press and release to see the ripple, or freeze every button in the
                pressed state (the ripple does not play in the frozen state).
              </p>
              <div className="spacer-24" />
              <label className="text-size-regular text-weight-bold flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pressedAll}
                  onChange={(e) => setPressedAll(e.target.checked)}
                />
                Show all push buttons pressed
              </label>

              {ROWS.map((row) => (
                <div key={row.id} id={row.id}>
                  <div className="spacer-48" />
                  <h2 className="heading-style-h5">{row.title}</h2>
                  <div className="spacer-4" />
                  <p className={`text-size-regular ${styles.cellLabel}`}>{row.note}</p>
                  <div className="spacer-16" />
                  <div className={styles.row}>
                    <div className={`${styles.cell} ${styles.current}`}>
                      <p className={`text-size-small ${styles.cellLabel}`}>Now</p>
                      <ButtonSet row={row.id} />
                    </div>
                    <div className={protoClass}>
                      <p className={`text-size-small ${styles.cellLabel}`}>Push</p>
                      <ButtonSet row={row.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
