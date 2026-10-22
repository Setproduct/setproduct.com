// Lazy catalogue of the mega-menu. SiteHeader loads this module with a
// dynamic import() on the first sign of intent (pointer over the menu, focus,
// opening the drawer), so products, bundles, resources and the ~280-item
// Inspiration pool stay out of the JS every page downloads up front.
import type { InspirationItem } from "../../../types/data";
import { PRODUCTS } from "../../../data/products";
import { FREEBIE_PRODUCTS } from "../../../data/freebies-listing";
import { BUNDLES } from "../../../data/bundles";
import { INSPIRATION_ITEMS } from "../../../data/inspiration";
import {
  BUNDLE_CATEGORY,
  KIT_PREVIEWS,
  NAV_FREEBIE_PREVIEW_COUNT,
  NAV_KIT_PREVIEW_COUNT,
  bundlePreviewFromItem,
  kitPreviewFromProduct,
} from "./navConfig";
import type { KitPreview } from "./navConfig";

/** Full Inspiration pool; SiteHeader appends it (shuffled) after the sample. */
export const INSPIRATION_POOL: InspirationItem[] = INSPIRATION_ITEMS;

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
