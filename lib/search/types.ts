export type SearchableType =
  | "blog"
  | "product"
  | "freebie"
  | "bundle"
  | "dashboard";

/**
 * Группа выдачи = таб на /search. Тип элемента нужен для URL и бейджа,
 * группа — для табов и секций. Дашборд-страницы живут в группе UI kits:
 * их всего несколько, отдельный таб с одним результатом только шумит.
 */
export type SearchGroup = "blog" | "freebie" | "product" | "bundle";

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
  freebie: "/freebies/",
  bundle: "/bundle#",
  dashboard: "/dashboard-templates/",
};

export function getSearchItemUrl(item: Pick<SearchableItem, "type" | "slug">): string {
  return URL_PREFIX[item.type] + item.slug;
}

export const SEARCH_GROUP_OF: Record<SearchableType, SearchGroup> = {
  blog: "blog",
  product: "product",
  dashboard: "product",
  freebie: "freebie",
  bundle: "bundle",
};

export const SEARCH_GROUP_LABELS: Record<SearchGroup, string> = {
  blog: "Blog",
  freebie: "Freebies",
  product: "UI kits",
  bundle: "Bundles",
};

/** Short uppercase badge shown on each result row */
export const SEARCHABLE_TYPE_BADGES: Record<SearchableType, string> = {
  blog: "Blog",
  product: "UI kit",
  freebie: "Freebie",
  bundle: "Bundle",
  dashboard: "Dashboard",
};

/** Порядок табов после «All»: блог — главный контент сайта, идёт первым. */
export const SEARCH_GROUP_ORDER: SearchGroup[] = ["blog", "freebie", "product", "bundle"];
