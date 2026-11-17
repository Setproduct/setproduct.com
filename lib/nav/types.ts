import type { BlogPostPreview, FreebieItem, InspirationCategory, InspirationItem } from "../../types/data";

/** Blog post fields the Magazine panel actually renders. */
export type NavBlogPost = Pick<BlogPostPreview, "slug" | "title" | "description" | "thumbImage" | "category">;

/** Resource fields the Resources panel actually renders. */
export type NavFreebie = Pick<
  FreebieItem,
  "slug" | "title" | "description" | "thumb" | "previewHref" | "duplicateHref" | "isFree"
> & {
  ctaLabel?: string;
  menuCtaLabel?: string;
};

/** Card of the UI guides panel: a guide post plus its group key. */
export type NavGuidePost = Pick<BlogPostPreview, "slug" | "title" | "description" | "thumbImage"> & {
  group: string;
};

/** Proof row of the Advertise panel: one of our own posts that ranks on Google. */
export type NavShowcasePost = { slug: string; title: string; thumbImage: string };

/**
 * Compact data the mega-menu needs for the first paint, prepared at build time
 * in getStaticProps (see lib/nav/buildNavData.ts). Category-specific kits and
 * resources load later from a lazy chunk.
 */
export type NavData = {
  /** Previews of every Magazine tab (Popular, Latest, categories; 6 each), deduped, newest first. */
  blog: NavBlogPost[];
  /** Resources shown under "Latest". */
  freebies: NavFreebie[];
  /**
   * Previews of every UI guides tab (Popular plus each group, 6 each),
   * deduped, most read first (UI_GUIDES_BY_READS).
   */
  guides: NavGuidePost[];
  /** Our own posts that rank on page 1 (PUBLISH_SHOWCASE_SLUGS), in order. */
  showcase: NavShowcasePost[];
  /** Random Inspiration sample; "All" picks its six from it on mount. */
  inspiration: InspirationItem[];
  inspirationCategories: InspirationCategory[];
};
