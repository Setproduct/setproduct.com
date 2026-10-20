import { useEffect, useId, useRef, useState } from "react";
import { buildTocEntries, type TocItem } from "./TableOfContents";

type MobileTableOfContentsProps = {
  items: TocItem[];
  activeId: string;
  onNavigate: (item: TocItem, position: number) => void;
  onOpen?: () => void;
};

const NAVBAR_GAP = 8;

/**
 * Sticky "On this page" bar for screens below 992px, where the sidebar TOC
 * is hidden. Shows the current section and opens a list of all H2 sections.
 * Must sit inside the long content column so `position: sticky` follows the
 * whole article and lets go at its end.
 */
export default function MobileTableOfContents({
  items,
  activeId,
  onNavigate,
  onOpen,
}: MobileTableOfContentsProps) {
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(72);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const entries = buildTocEntries(items);
  const sections = entries.filter((entry) => entry.level === 2);
  const activeParentId = entries.find((entry) => entry.id === activeId)?.parentId ?? "";
  const current = sections.find((entry) => entry.id === activeParentId);

  // Stick right under the fixed navbar, whose height is fluid (em on vw).
  useEffect(() => {
    const measure = () => {
      const navbar = document.querySelector<HTMLElement>(".navbar");
      if (navbar) setTop(Math.round(navbar.getBoundingClientRect().height) + NAVBAR_GAP);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (sections.length === 0) return null;

  const toggle = () => {
    if (!open) onOpen?.();
    setOpen(!open);
  };

  return (
    <div ref={rootRef} className="blogpost_mobile-toc" style={{ top }}>
      <button
        ref={toggleRef}
        type="button"
        className="blogpost_mobile-toc-toggle radius-16"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span className="blogpost_mobile-toc-heading">
          <span className="text-size-small blogpost_mobile-toc-label">On this page</span>
          <span className="text-size-regular text-weight-bold blogpost_mobile-toc-current">
            {current ? current.text : "Jump to a section"}
          </span>
        </span>
        <svg
          className={`blogpost_mobile-toc-chevron${open ? " is-open" : ""}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <nav
        id={panelId}
        aria-label="Table of contents"
        className="blogpost_mobile-toc-panel radius-16"
        hidden={!open}
      >
        <ol className="blogpost_toc-list">
          {sections.map((entry) => {
            const isActive = entry.id === activeParentId;
            return (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`blogpost_mobile-toc-link${isActive ? " is-active" : ""}`}
                  onClick={() => {
                    setOpen(false);
                    onNavigate(entry, entry.position);
                  }}
                >
                  <span className="text-size-regular blogpost_navigation-text">{entry.text}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
