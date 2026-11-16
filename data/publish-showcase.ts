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
  "tabs-ui-design",
  "liquid-glass-vs-glassmorphism",
  "chip-ui-design",
] as const;

export const PUBLISH_SHOWCASE_BADGE = "Page 1 on Google";

export const PUBLISH_STEPS = [
  { title: "Pick a plan", text: "One or two dofollow links, with the price shown up front." },
  { title: "Upload your draft", text: "Send the article through the publishing portal." },
  { title: "Go live within 24 hours", text: "Your post appears on the blog next to our own guides." },
] as const;
