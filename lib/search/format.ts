// Слова, которые в подписях всегда сохраняют исходное написание:
// аббревиатуры и бренды из названий категорий блога.
const KEEP_CASE = new Set(["UI", "UX", "AI", "SEO", "SaaS", "CSS", "API", "Figma"]);

/**
 * Приводит название категории к sentence case только для вывода на экран.
 * Сами значения (data/blog-categories.ts, frontmatter, ?category= в URL)
 * не меняются: "Startups & SaaS" → "Startups & SaaS", "Case Studies" → "Case studies".
 */
export function formatCategoryLabel(name: string): string {
  return name
    .split(" ")
    .map((word, index) => {
      if (index === 0 || KEEP_CASE.has(word)) return word;
      return word.toLowerCase();
    })
    .join(" ");
}
