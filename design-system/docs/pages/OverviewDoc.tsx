import Link from "next/link";
import { DOC_COMPONENTS, STATUS_LABEL, docHref } from "../registry";
import styles from "../docs.module.css";

/** Landing page of the docs: one card per component, straight from the registry. */
export function OverviewDoc() {
  return (
    <>
      <div className="spacer-48" />
      <ul className={styles.cards}>
        {DOC_COMPONENTS.map((item) => (
          <li key={item.slug}>
            <Link className={styles.card} href={docHref(item.slug)}>
              <span className={styles.cardHead}>
                <span className="heading-style-h5">{item.title}</span>
                <span className={`text-size-tiny text-weight-semibold ${styles.cardMeta}`}>
                  {STATUS_LABEL[item.status]}
                </span>
              </span>
              <span className="text-size-regular">{item.summary}</span>
              <span className={`text-size-small ${styles.cardMeta}`}>{item.sections.length} sections</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
