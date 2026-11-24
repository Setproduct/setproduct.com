/**
 * Proof block of the home publishing band: our own posts that reach the first
 * page of Google. Only Setproduct's own articles go here. Paid posts are never
 * listed or labelled anywhere on the site (author's decision, see
 * plans/publish-showcase-phase5-1.md).
 *
 * Titles and thumbnails are resolved from the MDX frontmatter at build time in
 * pages/index.tsx, so this list holds slugs only.
 */
export const PUBLISH_SHOWCASE_SLUGS = [
  "data-table-ui-design",
  "tabs-ui-design",
  "liquid-glass-vs-glassmorphism",
  "chip-ui-design",
] as const;

export const PUBLISH_SHOWCASE_BADGE = "Page 1 on Google";

export const PUBLISH_STEPS = [
  { title: "Pick a plan", text: "Three plans, with the price shown up front." },
  {
    title: "Upload your draft",
    text: "Send the article through the publishing portal. Or send a short brief and we write it.",
  },
  {
    title: "Go live fast",
    text: "24 hours on Accelerate, 4 hours on Maximize, 7 days on Delegate. Always right next to our own guides.",
  },
] as const;
