import { useState, type MouseEvent } from "react";
import { DocSection } from "../DocSection";
import styles from "./ChipsDoc.module.css";

const TOPICS = ["All posts", "UI Design", "Startups & SaaS", "Design & Code", "Resources", "Typography"];

const MORE_TOPICS = [
  ...TOPICS,
  "Inspiration",
  "Design Trends",
  "Growth Hacking",
  "Research",
  "Case Studies",
  "Career",
];

const REQUEST_TOPICS = ["Design kit", "Custom design", "Partnership", "Something else"];

const COUNTED = [
  { label: "UI Design", count: 48 },
  { label: "Startups & SaaS", count: 31 },
  { label: "Resources", count: 12 },
];

const noNav = (event: MouseEvent) => event.preventDefault();

function TagIcon() {
  return (
    <svg aria-hidden="true" className="chip-icon" fill="none" viewBox="0 0 16 16">
      <path
        d="M2 8.6V3a1 1 0 0 1 1-1h5.6a1 1 0 0 1 .7.3l4.5 4.5a1 1 0 0 1 0 1.4l-5.6 5.6a1 1 0 0 1-1.4 0L2.3 9.3a1 1 0 0 1-.3-.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="5.5" cy="5.5" fill="currentColor" r="1.2" />
    </svg>
  );
}

function Label({ children }: { children: string }) {
  return <p className={`text-size-small ${styles.label}`}>{children}</p>;
}

type StateDemo = { title: string; frozen?: string; active?: boolean; disabled?: boolean };

const STATES: StateDemo[] = [
  { title: "Default" },
  { title: "Hover", frozen: styles.forceHover },
  { title: "Pressed", frozen: styles.forcePress },
  { title: "Selected", active: true },
  { title: "Selected + hover", frozen: styles.forceHover, active: true },
  { title: "Focus (keyboard)", frozen: styles.forceFocus },
  { title: "Disabled", disabled: true },
];

export function ChipsDoc() {
  const [requests, setRequests] = useState<string[]>(["Design kit"]);
  const [kitTopic, setKitTopic] = useState("All posts");

  const toggle = (value: string) =>
    setRequests((list) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]));

  return (
    <>
      <DocSection
        id="compare"
        note="Left: today's chip (button-x-small is-text). Hover and selected share one fill, so a hovered chip looks picked. Right: the new chip, selected gets its own fill"
      >
        <div className={styles.grid}>
          <div className={styles.cell}>
            <Label>Now · rest, hover, selected</Label>
            <div className={styles.line}>
              <span className="button-x-small is-text">
                <span className="text-size-small text-weight-semibold">UI Design</span>
              </span>
              <span className={styles.forceHover}>
                <span className="button-x-small is-text">
                  <span className="text-size-small text-weight-semibold">UI Design</span>
                </span>
              </span>
              <span className="button-x-small is-text fs-cmsfilter_active">
                <span className="text-size-small text-weight-semibold">UI Design</span>
              </span>
            </div>
          </div>
          <div className={styles.cell}>
            <Label>New · rest, hover, selected</Label>
            <div className={styles.line}>
              <span className="chip is-s">UI Design</span>
              <span className={styles.forceHover}>
                <span className="chip is-s">UI Design</span>
              </span>
              <span className="chip is-s is-active">UI Design</span>
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="sizes"
        note="S 31 high, radius 12, text 14. M 40 high, radius 16, text 16. The label size is set by the size class, no inner text-size-* div"
      >
        <div className={styles.grid}>
          <div className={styles.cell}>
            <Label>S · chip is-s, button-x-small, text-input is-s</Label>
            <div className={styles.line}>
              <button className="chip is-s" type="button">
                Chip
              </button>
              <button className="button-x-small w-inline-block" type="button">
                <span className="text-size-regular text-weight-bold">Button</span>
              </button>
              <input aria-label="Field S" className="text-input is-s" placeholder="Field" />
            </div>
          </div>
          <div className={styles.cell}>
            <Label>M · chip is-m, button-small, text-input is-m</Label>
            <div className={styles.line}>
              <button className="chip is-m" type="button">
                Chip
              </button>
              <button className="button-small w-inline-block" type="button">
                <span className="text-size-medium text-weight-bold">Button</span>
              </button>
              <input aria-label="Field M" className="text-input is-m" placeholder="Field" />
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="kinds"
        note="Same look, different element. A link chip marks the open page with aria-current. A filter chip is a button with aria-pressed. Both are live here: click them"
      >
        <div className={styles.grid}>
          <div className={styles.cell}>
            <Label>Link chip · topics on the home page, catalog categories</Label>
            <nav aria-label="Demo topics">
              <ul className="chip-row">
                {TOPICS.map((topic) => (
                  <li key={topic}>
                    <a
                      aria-current={topic === kitTopic ? "page" : undefined}
                      className="chip is-s"
                      href="#kinds"
                      onClick={(event) => {
                        noNav(event);
                        setKitTopic(topic);
                      }}
                    >
                      {topic}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <pre className={styles.code}>{`<a class="chip is-s" href="/blog?category=ui-design"
   aria-current="page">UI Design</a>`}</pre>
          </div>
          <div className={styles.cell}>
            <Label>Filter chip · request topics in the contact form</Label>
            <div aria-label="Demo request topics" className="chip-row" role="group">
              {REQUEST_TOPICS.map((topic) => (
                <button
                  aria-pressed={requests.includes(topic)}
                  className="chip is-s"
                  key={topic}
                  onClick={() => toggle(topic)}
                  type="button"
                >
                  {topic}
                </button>
              ))}
            </div>
            <pre className={styles.code}>{`<button type="button" class="chip is-s"
        aria-pressed="true">Design kit</button>`}</pre>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="states"
        note="Hover, pressed and focus are frozen for comparison. The current page (aria-current) has no hover and no press: it is already open"
      >
        {(["is-s", "is-m"] as const).map((size, index) => (
          <div key={size}>
            {index > 0 ? <div className="spacer-24" /> : null}
            <Label>{size === "is-s" ? "S" : "M"}</Label>
            <div className="spacer-12" />
            <div className={styles.states}>
              {STATES.map((state) => (
                <div className={styles.state} key={state.title}>
                  <span className={`text-size-tiny ${styles.label}`}>{state.title}</span>
                  <span className={state.frozen}>
                    <button
                      aria-pressed={state.active ? true : undefined}
                      className={`chip ${size}${state.active ? " is-active" : ""}`}
                      disabled={state.disabled}
                      tabIndex={-1}
                      type="button"
                    >
                      UI Design
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </DocSection>

      <DocSection
        id="parts"
        note="Optional parts. chip-icon sits before the label and takes the text colour. chip-count shows how many items the filter leaves, the digits keep one width"
      >
        <div className={styles.grid}>
          <div className={styles.cell}>
            <Label>Icon · S and M</Label>
            <div className={styles.line}>
              <button className="chip is-s" type="button">
                <TagIcon />
                Tagged
              </button>
              <button className="chip is-s is-active" aria-pressed="true" type="button">
                <TagIcon />
                Tagged
              </button>
              <button className="chip is-m" type="button">
                <TagIcon />
                Tagged
              </button>
            </div>
          </div>
          <div className={styles.cell}>
            <Label>Counter · S and M</Label>
            <div className={styles.line}>
              {COUNTED.map((item, index) => (
                <button
                  aria-pressed={index === 0}
                  className="chip is-s"
                  key={item.label}
                  type="button"
                >
                  {item.label}
                  <span className="chip-count">{item.count}</span>
                </button>
              ))}
              <button className="chip is-m" type="button">
                Resources
                <span className="chip-count">12</span>
              </button>
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="rows"
        note="chip-row wraps onto new lines. chip-row is-scroll keeps one line and scrolls sideways, with room left for the press and the focus ring. The box below is 360 wide, like a phone"
      >
        <div className={styles.grid}>
          <div className={styles.cell}>
            <Label>chip-row</Label>
            <div className="chip-row">
              {MORE_TOPICS.map((topic, index) => (
                <a
                  aria-current={index === 0 ? "page" : undefined}
                  className="chip is-s"
                  href="#rows"
                  key={topic}
                  onClick={noNav}
                >
                  {topic}
                </a>
              ))}
            </div>
          </div>
          <div className={styles.cell}>
            <Label>chip-row is-scroll</Label>
            <div className={styles.narrow}>
              <div className="chip-row is-scroll">
                {MORE_TOPICS.map((topic, index) => (
                  <a
                    aria-current={index === 0 ? "page" : undefined}
                    className="chip is-s"
                    href="#rows"
                    key={topic}
                    onClick={noNav}
                  >
                    {topic}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DocSection>
    </>
  );
}
