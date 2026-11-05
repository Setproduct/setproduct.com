import type { Author, BlogFrontmatter, FaqItem } from "../../types/blog";
import { getAuthor } from "./authors";
import { SITE_URL, absoluteUrl } from "./site-config";

export function buildBlogPostingJsonLd(
  frontmatter: BlogFrontmatter,
  pageUrl: string,
  readingTimeMinutes: number
): Record<string, unknown> {
  const absoluteImage = absoluteUrl(frontmatter.coverImage);

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
      name: getAuthor(frontmatter.author).name,
      url: `${SITE_URL}/authors/${getAuthor(frontmatter.author).slug}`,
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

/** Listing URL filtered by a blog category (same format as the mega-menu). */
export function blogCategoryHref(category: string): string {
  return `/blog?category=${encodeURIComponent(category)}`;
}

/**
 * BreadcrumbList JSON-LD: Blog → Category → Post. Matches the visible
 * breadcrumbs in BlogHero; Google shows this trail instead of the raw URL.
 */
export function buildBreadcrumbJsonLd(
  title: string,
  pageUrl: string,
  category?: string,
  categoryLabel?: string
): Record<string, unknown> {
  const items: Array<{ name: string; item: string }> = [{ name: "Blog", item: `${SITE_URL}/blog` }];
  if (category) items.push({ name: categoryLabel ?? category, item: `${SITE_URL}${blogCategoryHref(category)}` });
  items.push({ name: title, item: pageUrl });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

/**
 * FAQPage JSON-LD. Rendered alongside BlogPosting when a post defines `faq`
 * items in frontmatter. Drives the FAQ rich result in Google and feeds
 * AI Overview extraction.
 */
export function buildFaqJsonLd(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Person JSON-LD for an author page. Includes the avatar as image and any
 * external links as sameAs, so search engines can connect the author entity.
 */
export function buildPersonJsonLd(author: Author): Record<string, unknown> {
  const absoluteImage = absoluteUrl(author.avatar);

  const sameAs = author.links
    ? [
        author.links.twitter,
        author.links.linkedin,
        author.links.website,
        author.links.gumroad,
      ].filter((link): link is string => Boolean(link))
    : [];

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: `${SITE_URL}/authors/${author.slug}`,
    image: absoluteImage,
  };

  if (author.role) jsonLd.jobTitle = author.role;
  if (sameAs.length > 0) jsonLd.sameAs = sameAs;

  return jsonLd;
}
