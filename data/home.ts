/**
 * Content settings of the home page (components/pages/HomePage.tsx).
 * Everything an editor may want to change lives here, not in components.
 */

/** Cards in the "Fresh from the magazine" feed: two full masonry rows. */
export const HOME_FEED_LIMIT = 8;

/** Optional post pinned to the first slot of the feed; the rest go by date. */
export const HOME_FEED_PINNED_SLUG: string | null = null;

/** Rows in "Most read" (taken from BLOG_POPULAR_SLUGS in lib/blog/popular.ts). */
export const HOME_MOST_READ_COUNT = 6;

/** Kits shown on the home page; the full catalogue is on /all. */
export const HOME_KITS_COUNT = 6;

/**
 * Resources shown on the home page: the newest additions, nine of them.
 *
 * Two rules, both from the author (16.11.2026):
 * 1. No Figma files at all. The catalogue keeps them under "Figma templates",
 *    but the home page sends people to tools, components and apps instead.
 * 2. Newest first. `data/freebies-listing.ts` has no date field, so the order
 *    below is the git history of that file (date a slug was first added).
 *
 * When you add a resource, put its slug at the top of this list and drop the
 * last one. A new Figma file does not go here at all.
 */
export const HOME_FREEBIE_SLUGS = [
  "archify", // 17.11.2026
  "ramka", // 11.11.2026
  "desigma", // 09.11.2026
  "looseleaf", // 09.11.2026
  "react-useanimations", // 04.11.2026
  "matita-icons", // 23.10.2026
  "cleanyourtv", // 21.10.2026
  "gr8r-task-management", // 16.10.2026
  "spectrum-ui", // 14.10.2026
] as const;

// The UI guides list that sits under "Most read" now comes from
// data/ui-guides.ts (UI_COMPONENT_GUIDES), so the home page, the navbar and
// the /ui-guides hub share one index.
