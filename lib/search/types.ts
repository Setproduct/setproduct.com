export type SearchableType =
  | "blog"
  | "product"
  | "template"
  | "freebie"
  | "bundle"
  | "dashboard";

export type SearchableItem = {
  type: SearchableType;
  slug: string;
  title: string;
  description: string;
  category?: string;
  image?: string;
  price?: string;
  /** Blog only: "N min read" */
  readingTime?: string;
  /** Freebies: rendered as a "Free" label instead of a price */
  isFree?: boolean;
};

// URL не хранится в индексе (экономия ~12 kB в данных /search),
// а вычисляется по типу и slug.
const URL_PREFIX: Record<SearchableType, string> = {
  blog: "/blog/",
  product: "/templates/",
  template: "/templates/",
  freebie: "/freebies/",
  bundle: "/bundle#",
  dashboard: "/dashboard-templates/",
};

export function getSearchItemUrl(item: Pick<SearchableItem, "type" | "slug">): string {
  return URL_PREFIX[item.type] + item.slug;
}

export const SEARCHABLE_TYPE_LABELS: Record<SearchableType, string> = {
  blog: "Blog",
  product: "UI kits",
  template: "Templates",
  freebie: "Freebies",
  bundle: "Bundles",
  dashboard: "Dashboard pages",
};

/** Short uppercase badge shown on each result row */
export const SEARCHABLE_TYPE_BADGES: Record<SearchableType, string> = {
  blog: "Blog",
  product: "UI kit",
  template: "Template",
  freebie: "Freebie",
  bundle: "Bundle",
  dashboard: "Dashboard",
};

export const SEARCHABLE_TYPE_ORDER: SearchableType[] = [
  "product",
  "template",
  "bundle",
  "freebie",
  "dashboard",
  "blog",
];
