import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { DocContext } from "./DocContext";
import { DocsMobileNav, DocsNav } from "./DocsNav";
import { DESIGN_SYSTEM_NAME, DOCS_BASE_PATH, DOCS_HOME, type DocEntry } from "./registry";
import { useActiveSection } from "./useActiveSection";
import styles from "./docs.module.css";

type Props = {
  /** Registry entry of the page; null renders the overview. */
  entry: DocEntry | null;
  children: ReactNode;
};

const OVERVIEW_LEAD =
  "Components of setproduct.com as plain CSS classes, with every size, variant and state on one page each. Pick a component on the left.";

/** Height of an element only while it actually sticks (hidden or static bars count as 0). */
function stickyHeight(el: HTMLElement | null): number {
  if (!el) return 0;
  const style = getComputedStyle(el);
  if (style.display === "none" || style.position !== "sticky") return 0;
  return el.getBoundingClientRect().height;
}

/**
 * Docs shell: own top bar, left navigation, content. Uses neither the site
 * header nor the footer, so it works the same once the design system lives
 * in its own repository.
 */
export function DocsLayout({ entry, children }: Props) {
  const shellRef = useRef<HTMLDivElement>(null);
  const topbarRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  // Height of whatever sticks to the top right now: the top bar on desktop,
  // the mobile bar below 992px. Feeds scroll-margin and the scroll spy.
  const offsetRef = useRef(0);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const measure = () => {
      const offset = stickyHeight(topbarRef.current) + stickyHeight(mobileRef.current);
      offsetRef.current = offset;
      shell.style.setProperty("--ds-offset", `${offset}px`);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (topbarRef.current) observer.observe(topbarRef.current);
    if (mobileRef.current) observer.observe(mobileRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const activeId = useActiveSection(entry?.sections.map((section) => section.id) ?? [], offsetRef);

  const title = entry ? `${entry.title} | ${DESIGN_SYSTEM_NAME}` : DESIGN_SYSTEM_NAME;
  const lead = entry ? entry.summary : OVERVIEW_LEAD;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={lead} name="description" />
        {/* Not public yet: no index, not in the sitemap. */}
        <meta content="noindex, nofollow" name="robots" />
      </Head>

      <div className={styles.shell} ref={shellRef}>
        <a className={styles.skip} href="#ds-main">
          Skip to content
        </a>

        <header className={styles.topbar} ref={topbarRef}>
          <Link className={styles.brand} href={DOCS_BASE_PATH}>
            {DESIGN_SYSTEM_NAME}
          </Link>
          <Link className={styles.back} href={DOCS_HOME.href}>
            {DOCS_HOME.label}
          </Link>
        </header>

        <div className={styles.mobileBar} ref={mobileRef}>
          <DocsMobileNav activeId={activeId} entry={entry} />
        </div>

        <div className={styles.body}>
          <aside className={styles.sidebar}>
            <DocsNav activeId={activeId} entry={entry} />
          </aside>

          {/* Empty touchstart listener makes :active work in iOS Safari (button press demos). */}
          <main className={styles.main} id="ds-main" onTouchStart={() => {}} tabIndex={-1}>
            <h1 className="heading-style-h2">{entry ? entry.title : DESIGN_SYSTEM_NAME}</h1>
            <div className="spacer-16" />
            <p className={`text-size-large ${styles.lead}`}>{lead}</p>
            <DocContext.Provider value={entry}>{children}</DocContext.Provider>
          </main>
        </div>
      </div>
    </>
  );
}
