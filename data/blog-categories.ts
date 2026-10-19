export const BLOG_CATEGORIES = [
  "Startups & SaaS",
  "UI Design",
  "Growth Hacking",
  "Inspiration",
  "Tools",
  "Technology",
  "Research",
  "Design Trends",
  "SEO",
  "Design & Code",
  "Typography",
  "Case Studies",
  "Presentation",
  "Career",
];

export const HOME_BLOG_CATEGORIES = [
  "Startups & SaaS",
  "UI Design",
  "Growth Hacking",
  "Inspiration",
  "Tools",
  "Technology",
  "Research",
];

/**
 * Старые slug'и категорий блога, которые могут прийти из закладок и внешних
 * ссылок в query-параметре `?category=`. Ключ — устаревшее значение,
 * значение — актуальное. Нужно, чтобы переименование категории не ломало
 * фильтр: `/blog?category=Resources` продолжает показывать те же статьи.
 */
export const LEGACY_BLOG_CATEGORIES: Record<string, string> = {
  Resources: "Tools",
};
