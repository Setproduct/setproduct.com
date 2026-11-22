import { DocSection } from "../DocSection";
import styles from "./BadgesDoc.module.css";

const TONES = [
  { id: "", title: "Neutral" },
  { id: "is-brand", title: "Brand" },
  { id: "is-success", title: "Success" },
] as const;

const KINDS = [
  { id: "", title: "Outline" },
  { id: "is-soft", title: "Soft" },
  { id: "is-on-image", title: "On image" },
] as const;

function cx(...parts: string[]) {
  return parts.filter(Boolean).join(" ");
}

function Label({ children }: { children: string }) {
  return <p className={`text-size-small ${styles.label}`}>{children}</p>;
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="badge-icon" fill="none" viewBox="0 0 16 16">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg aria-hidden="true" className="badge-icon" fill="none" viewBox="0 0 16 16">
      <rect height="5" rx="2.5" stroke="currentColor" strokeWidth="1.5" width="5" x="3" y="1.5" />
      <rect height="5" rx="2.5" stroke="currentColor" strokeWidth="1.5" width="5" x="8" y="1.5" />
      <rect height="5" rx="2.5" stroke="currentColor" strokeWidth="1.5" width="5" x="3" y="6.5" />
      <circle cx="10.5" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 11.5A2.5 2.5 0 1 0 8 14v-2.5H5.5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function BadgesDoc() {
  return (
    <>
      <DocSection
        id="compare"
        note="Left: four badges on the site today, each with its own class, height and radius. Right: the same four jobs done by one badge class"
      >
        <div className={styles.grid}>
          <div className={styles.cell}>
            <Label>Now</Label>
            <div className={styles.line}>
              <div className="category-tag">
                <p className="text-size-tiny text-weight-semibold">UI Design</p>
              </div>
              <span className="home-publish-badge text-size-tiny text-weight-semibold">Ranks on Google</span>
              <span className={`text-size-tiny text-weight-semibold ${styles.searchType}`}>Template</span>
            </div>
            <div className={styles.image}>
              <div className="freebies-template-category-wr">
                <p className="text-size-small">Figma</p>
              </div>
            </div>
            <p className={`text-size-tiny ${styles.label}`}>
              category-tag 30 high · home-publish-badge 22 · search type in rem, radius 4 · freebies overlay 24
            </p>
          </div>
          <div className={styles.cell}>
            <Label>New</Label>
            <div className={styles.line}>
              <span className="badge is-s">UI Design</span>
              <span className="badge is-s is-soft is-success">Ranks on Google</span>
              <span className="badge is-s is-soft is-brand">Template</span>
            </div>
            <div className={styles.image}>
              <span className={`badge is-m is-on-image ${styles.overlay}`}>Figma</span>
            </div>
            <p className={`text-size-tiny ${styles.label}`}>
              One class, sizes 20 and 24, a full pill radius, all lengths on the layout scale
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="sizes"
        note="S 20 high, text 12: cards, meta rows, the navigation. M 24 high, text 13: next to headings and over images"
      >
        <div className={styles.grid}>
          {(["is-s", "is-m"] as const).map((size) => (
            <div className={styles.cell} key={size}>
              <Label>{size === "is-s" ? "S · badge is-s" : "M · badge is-m"}</Label>
              <div className={styles.line}>
                <span className={`badge ${size}`}>UI Design</span>
                <span className={`badge ${size} is-soft is-brand`}>Template</span>
                <span className={`badge ${size} is-soft is-success`}>
                  <span className="badge-dot" />
                  Ranks on Google
                </span>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="kinds"
        note="Outline is the default and replaces category-tag. Soft carries the tone in its fill. On image adds a white fill and a soft shadow. Warning and danger exist only as tokens until the site needs them"
      >
        <div className={styles.cell}>
          {/* Rows are tones (the badge says which), columns are kinds */}
          <div className={styles.matrix}>
            {KINDS.map((kind) => (
              <p className={`text-size-tiny ${styles.matrixHead}`} key={kind.title}>
                {kind.title}
              </p>
            ))}
            {TONES.flatMap((tone) =>
              KINDS.map((kind) => (
                <div key={`${tone.title}-${kind.title}`}>
                  <span className={cx("badge is-m", kind.id, tone.id)}>{tone.title}</span>
                </div>
              )),
            )}
          </div>
        </div>
        <div className="spacer-16" />
        <pre className={styles.code}>{`<span class="badge is-s">UI Design</span>
<span class="badge is-s is-soft is-success">Ranks on Google</span>
<span class="badge is-m is-on-image">Figma</span>`}</pre>
      </DocSection>

      <DocSection
        id="parts"
        note="badge-dot marks a status and takes the text colour. badge-icon is a 12 / 14 svg before the label"
      >
        <div className={styles.grid}>
          <div className={styles.cell}>
            <Label>Dot</Label>
            <div className={styles.line}>
              <span className="badge is-s is-soft is-success">
                <span className="badge-dot" />
                Live
              </span>
              <span className="badge is-m is-soft is-success">
                <span className="badge-dot" />
                Live
              </span>
              <span className="badge is-s is-brand">
                <span className="badge-dot" />
                New
              </span>
            </div>
          </div>
          <div className={styles.cell}>
            <Label>Icon</Label>
            <div className={styles.line}>
              <span className="badge is-s is-soft is-success">
                <CheckIcon />
                Verified
              </span>
              <span className="badge is-m">
                <FigmaIcon />
                Figma
              </span>
              <span className="badge is-m is-soft is-brand">
                <FigmaIcon />
                Figma
              </span>
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="context"
        note="The badge sets only its look. Where it sits is up to the parent: in the overlay the card positions it, the badge itself has no position or inset"
      >
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.image} />
            <div className={styles.cardBody}>
              <div className={styles.meta}>
                <span className="badge is-s">UI Design</span>
                <span className="text-size-tiny">8 min read</span>
              </div>
              <p className="text-size-medium text-weight-bold">Badge UI design done right</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.image} ${styles.isDark}`}>
              <span className={`badge is-m is-on-image ${styles.overlay}`}>Figma</span>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.meta}>
                <span className="badge is-s is-soft is-success">
                  <span className="badge-dot" />
                  Ranks on Google
                </span>
              </div>
              <p className="text-size-medium text-weight-bold">Free dashboard UI kit</p>
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="boundary"
        note="One rule: a chip is pressed, a badge is not. Same word, different job. The category in a post card only informs, so it is a badge; the same category above the feed leads to a page, so it is a chip"
      >
        <div className={styles.grid}>
          <div className={styles.cell}>
            <Label>Badge · informs, no hover, no pointer</Label>
            <div className={styles.line}>
              <span className="badge is-s">UI Design</span>
              <span className="badge is-m">UI Design</span>
            </div>
          </div>
          <div className={styles.cell}>
            <Label>Chip · pressed, has hover and focus</Label>
            <div className={styles.line}>
              <a className="chip is-s" href="#boundary" onClick={(event) => event.preventDefault()}>
                UI Design
              </a>
              <a className="chip is-m" href="#boundary" onClick={(event) => event.preventDefault()}>
                UI Design
              </a>
            </div>
          </div>
        </div>
      </DocSection>
    </>
  );
}
