import type { BlogPostPreview, InspirationItem } from "../../../types/data";
import { PRODUCTS } from "../../../data/products";
import { FREEBIE_PRODUCTS } from "../../../data/freebies-listing";
import { BUNDLES } from "../../../data/bundles";
import {
  BUNDLE_CATEGORY,
  KIT_PREVIEWS,
  NAV_BLOG_PREVIEW_COUNT,
  NAV_FREEBIE_PREVIEW_COUNT,
  NAV_INSPIRATION_PREVIEW_COUNT,
  NAV_KIT_PREVIEW_COUNT,
  bundlePreviewFromItem,
  kitPreviewFromProduct,
} from "./navConfig";
import type { KitPreview } from "./navConfig";

/** Learn: newest posts, optionally narrowed to the hovered category. */
export function getBlogPreviews(posts: BlogPostPreview[], category: string | null): BlogPostPreview[] {
  return (category ? posts.filter((p) => p.category === category) : posts).slice(0, NAV_BLOG_PREVIEW_COUNT);
}

// Hovering a category on the left swaps the kit previews on the right. The
// featured six (KIT_PREVIEWS) belong to every category, so we rank matches by
// specificity — fewer categories means the kit is more characteristic of the
// hovered section — giving each tab a genuinely distinct set. On top of that
// we pin the freshest catalogue product (PRODUCTS[0]) to the front of any
// section it belongs to, so the newest kit always leads its tabs. "All"
// (category === null) keeps the curated featured order.
export function getKitPreviews(category: string | null): KitPreview[] {
  if (category === BUNDLE_CATEGORY) {
    return BUNDLES.slice(0, NAV_KIT_PREVIEW_COUNT).map(bundlePreviewFromItem);
  }
  if (!category) return KIT_PREVIEWS;
  const freshest = PRODUCTS[0];
  const matched = PRODUCTS.filter((product) => product.categories.includes(category))
    .slice()
    .sort((a, b) => {
      if (a === freshest) return -1;
      if (b === freshest) return 1;
      return a.categories.length - b.categories.length;
    })
    .slice(0, NAV_KIT_PREVIEW_COUNT)
    .map(kitPreviewFromProduct);
  return matched.length ? matched : KIT_PREVIEWS;
}

// Freebies have a single category each (unlike kits), so a plain equality
// filter is enough; empty categories fall back to the full set so a tab never
// renders blank.
export function getFreebiePreviews(category: string | null) {
  const list = category ? FREEBIE_PRODUCTS.filter((item) => item.category === category) : FREEBIE_PRODUCTS;
  return (list.length ? list : FREEBIE_PRODUCTS).slice(0, NAV_FREEBIE_PREVIEW_COUNT);
}

// Narrows the (already shuffled) inspiration pool to the hovered component
// type; "All" (null) draws from the whole pool. If a category has fewer than
// NAV_INSPIRATION_PREVIEW_COUNT items (e.g. Badges only has 4), the row is
// topped up with other items so the grid always renders a full set of six.
export function getInspirationPreviews(pool: InspirationItem[], category: string | null): InspirationItem[] {
  if (!category) return pool.slice(0, NAV_INSPIRATION_PREVIEW_COUNT);
  const matched = pool.filter((item) => item.componentType === category);
  if (matched.length >= NAV_INSPIRATION_PREVIEW_COUNT) {
    return matched.slice(0, NAV_INSPIRATION_PREVIEW_COUNT);
  }
  const matchedIds = new Set(matched.map((item) => item.id));
  const filler = pool.filter((item) => !matchedIds.has(item.id));
  return [...matched, ...filler].slice(0, NAV_INSPIRATION_PREVIEW_COUNT);
}
