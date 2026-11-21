import { useContext, type ReactNode } from "react";
import { DocContext } from "./DocContext";
import styles from "./docs.module.css";

type Props = {
  /** Must be listed in the page's `sections` in registry.ts. */
  id: string;
  /** Short explanation under the heading. */
  note?: ReactNode;
  children: ReactNode;
};

/**
 * One block of a docs page: anchor, heading, note, demo.
 * The heading comes from the registry, so the navigation label and the
 * heading on the page are one string.
 */
export function DocSection({ id, note, children }: Props) {
  const entry = useContext(DocContext);
  const meta = entry?.sections.find((section) => section.id === id);

  if (!meta) {
    throw new Error(`Docs section "${id}" is missing from the "${entry?.slug ?? "overview"}" entry in registry.ts`);
  }

  const titleId = `${id}-title`;

  return (
    <>
      <div className="spacer-48" />
      <section aria-labelledby={titleId} className={styles.section} id={id}>
        <h2 className="heading-style-h5" id={titleId}>
          {meta.title}
        </h2>
        {note ? (
          <>
            <div className="spacer-4" />
            <p className={`text-size-regular ${styles.note}`}>{note}</p>
          </>
        ) : null}
        <div className="spacer-16" />
        {children}
      </section>
    </>
  );
}
