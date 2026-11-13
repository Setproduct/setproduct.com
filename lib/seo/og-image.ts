/**
 * Maps a content image to the 1200x630 social card generated for it.
 *
 * WHY THIS EXISTS:
 * Article covers, resource screenshots and template covers are drawn for the
 * page, not for a social card. Their ratios are all over the place: 16:9, 4:3,
 * square, occasionally 2:1. LinkedIn, Facebook, Telegram and X each crop to
 * roughly 1.91:1 on their own terms, so a 4:3 cover loses about a third of its
 * height and any text near the top edge gets cut. The audit in
 * `scripts/audit-og-images.mjs` counted 294 such pages.
 *
 * Instead of rewriting the page artwork, `scripts/generate-og-variants.mjs`
 * writes a 1200x630 centre crop for every cover into `public/og/`, mirroring the
 * source path. Page components keep pointing at the original picture; only the
 * `og:image` and `twitter:image` tags swap to the prepared card. Cropping once,
 * under our control, beats letting four platforms crop it differently.
 *
 * WHICH SOURCES GET REMAPPED:
 * Only `.webp` and `.gif` files. Everything already prepared for the socials is
 * `.jpg` (the site-wide card), and re-mapping it would point at a file that the
 * generator never writes. External URLs are left alone: they belong to someone
 * else's server and we cannot crop them.
 */
const REMAPPABLE = /\.(webp|gif)$/i;

export function ogImageFor(source: string | undefined): string {
  if (!source) return "";

  // Absolute URLs (another host) and paths that already point at a prepared
  // card are returned untouched.
  if (/^(https?:)?\/\//i.test(source)) return source;
  if (source.startsWith("/og/")) return source;
  if (!REMAPPABLE.test(source)) return source;

  const withoutExt = source.replace(/\.(webp|gif)$/i, ".jpg");
  return `/og${withoutExt.startsWith("/") ? "" : "/"}${withoutExt}`;
}
