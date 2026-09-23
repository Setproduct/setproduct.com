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
  url: string;
  image?: string;
  price?: string;
  /** Blog only: "N min read" */
  readingTime?: string;
  /** Freebies: rendered as a "Free" label instead of a price */
  isFree?: boolean;
};

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
