import type { BlogPostPreview, FreebieItem, InspirationCategory, InspirationItem } from "../../types/data";

/** Blog post fields the Learn panel actually renders. */
export type NavBlogPost = Pick<BlogPostPreview, "slug" | "title" | "description" | "thumbImage" | "category">;

/** Resource fields the Resources panel actually renders. */
export type NavFreebie = Pick<
  FreebieItem,
  "slug" | "title" | "description" | "thumb" | "previewHref" | "duplicateHref" | "isFree"
> & {
  ctaLabel?: string;
  menuCtaLabel?: string;
};

/**
 * Compact data the mega-menu needs for the first paint, prepared at build time
 * in getStaticProps (see lib/nav/buildNavData.ts). Category-specific kits and
 * resources plus the full Inspiration pool load later from a lazy chunk.
 */
export type NavData = {
  /** Newest posts of every Learn category (6 each), deduped, newest first. */
  blog: NavBlogPost[];
  /** Resources shown under "All topics". */
  freebies: NavFreebie[];
  /** Random Inspiration sample; "All" picks its six from it on mount. */
  inspiration: InspirationItem[];
  inspirationCategories: InspirationCategory[];
};
