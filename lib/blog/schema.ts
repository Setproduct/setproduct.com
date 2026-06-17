import type { BlogFrontmatter } from "../../types/blog";
import { SITE_URL } from "./site-config";

export function buildBlogPostingJsonLd(
  frontmatter: BlogFrontmatter,
  pageUrl: string,
  readingTimeMinutes: number
): Record<string, unknown> {
  const absoluteImage = frontmatter.coverImage?.startsWith("http")
    ? frontmatter.coverImage
    : `${SITE_URL}${frontmatter.coverImage ?? ""}`;

  // Normalise lastUpdated ("YYYY-MM" or "YYYY-MM-DD") to a full ISO date
  // for dateModified. When only the month is given, default to its first day.
  const dateModified = frontmatter.lastUpdated
    ? frontmatter.lastUpdated.length === 7
      ? `${frontmatter.lastUpdated}-01`
      : frontmatter.lastUpdated
    : frontmatter.date;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    image: absoluteImage,
    datePublished: frontmatter.date,
    dateModified,
    author: {
      "@type": "Person",
      name: frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Setproduct",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/Vectors-Wrapper_1.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    timeRequired: `PT${readingTimeMinutes}M`,
  };
}
