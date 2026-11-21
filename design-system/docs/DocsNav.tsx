import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { DOC_COMPONENTS, DOCS_BASE_PATH, STATUS_LABEL, docHref, type DocEntry } from "./registry";
import styles from "./docs.module.css";

type Props = {
  /** Current page; null on the overview. */
  entry: DocEntry | null;
  /** Section in view, from useActiveSection. */
  activeId: string | null;
};

/**
 * Desktop navigation, two levels in one column: the components, and under the
 * current one the sections of its page. Only the current component is
 * expanded, so the list stays short however many components there are.
 */
export function DocsNav({ entry, activeId }: Props) {
  return (
    <nav aria-label="Design system" className={styles.nav}>
      <Link aria-current={entry === null ? "page" : undefined} className={styles.navItem} href={DOCS_BASE_PATH}>
        Overview
      </Link>

      <p className={styles.navGroup}>Components</p>
      <ul className={styles.navList}>
        {DOC_COMPONENTS.map((item) => {
          const isCurrent = item.slug === entry?.slug;
          return (
            <li key={item.slug}>
              <Link aria-current={isCurrent ? "page" : undefined} className={styles.navItem} href={docHref(item.slug)}>
                <span>{item.title}</span>
                {item.status !== "stable" ? <span className={styles.navStatus}>{STATUS_LABEL[item.status]}</span> : null}
              </Link>
              {isCurrent && item.sections.length > 0 ? (
                <ul className={styles.navSections}>
                  {item.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        aria-current={activeId === section.id ? "location" : undefined}
                        className={styles.navSection}
                        href={`#${section.id}`}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * Below 992px the column turns into a sticky bar: a select for the component
 * (the design system's own field, size M) and a scrolling row of sections.
 * The row keeps the active section in view as the reader scrolls.
 */
export function DocsMobileNav({ entry, activeId }: Props) {
  const router = useRouter();
  const rowRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || !activeId) return;
    const link = row.querySelector<HTMLElement>(`[data-section="${activeId}"]`);
    if (!link) return;
    const left = link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeId]);

  const value = entry ? docHref(entry.slug) : DOCS_BASE_PATH;

  return (
    <div className={styles.mobileInner}>
      <select
        aria-label="Component"
        className={`text-input is-m is-select ${styles.mobileSelect}`}
        onChange={(e) => void router.push(e.target.value)}
        value={value}
      >
        <option value={DOCS_BASE_PATH}>Overview</option>
        {DOC_COMPONENTS.map((item) => (
          <option key={item.slug} value={docHref(item.slug)}>
            {item.title}
          </option>
        ))}
      </select>

      {entry && entry.sections.length > 0 ? (
        <nav aria-label="On this page" className={styles.mobileSections} ref={rowRef}>
          {entry.sections.map((section) => (
            <a
              aria-current={activeId === section.id ? "location" : undefined}
              className={styles.mobileSection}
              data-section={section.id}
              href={`#${section.id}`}
              key={section.id}
            >
              {section.title}
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
