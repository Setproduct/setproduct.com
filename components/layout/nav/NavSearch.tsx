import { useEffect, useState } from "react";
import { SEARCH_PLACEHOLDERS, SEARCH_PLACEHOLDER_INTERVAL_MS } from "./navConfig";

/**
 * Desktop navbar search with a rotating placeholder hinting that search covers
 * kits, blog, dashboards and AI inspiration. Living in its own component keeps
 * the 2.5s rotation from re-rendering the whole header.
 */
export function NavSearch() {
  const [searchPlaceholderIndex, setSearchPlaceholderIndex] = useState(0);
  const [previousPlaceholderIndex, setPreviousPlaceholderIndex] = useState<number | null>(null);

  // Cross-fades the outgoing text with the incoming one by rendering two
  // overlay spans for ~320ms. Respects prefers-reduced-motion.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanupTimers: number[] = [];

    const id = window.setInterval(() => {
      setSearchPlaceholderIndex((current) => {
        if (!reduceMotion) {
          setPreviousPlaceholderIndex(current);
          const t = window.setTimeout(() => {
            setPreviousPlaceholderIndex(null);
          }, 360);
          cleanupTimers.push(t);
        }
        return (current + 1) % SEARCH_PLACEHOLDERS.length;
      });
    }, SEARCH_PLACEHOLDER_INTERVAL_MS);

    return () => {
      window.clearInterval(id);
      cleanupTimers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <form action="/search" className="search w-form" style={{ position: "relative" }}>
      <input
        aria-label="Search Setproduct"
        className="text-input is-nav-search w-input"
        id="search"
        maxLength={256}
        name="query"
        placeholder=""
        required
        type="search"
      />
      {previousPlaceholderIndex !== null && (
        <span
          key={`leaving-${previousPlaceholderIndex}`}
          aria-hidden="true"
          className="nav-search-placeholder is-leaving"
        >
          {SEARCH_PLACEHOLDERS[previousPlaceholderIndex]}
        </span>
      )}
      <span
        key={`entering-${searchPlaceholderIndex}`}
        aria-hidden="true"
        className="nav-search-placeholder is-entering"
      >
        {SEARCH_PLACEHOLDERS[searchPlaceholderIndex]}
      </span>
      <input className="hide w-button" type="submit" value="Search" />
      <div className="search-icon-wr">
        <img alt="" className="search-icon" loading="lazy" src="/images/search.svg" />
      </div>
    </form>
  );
}
