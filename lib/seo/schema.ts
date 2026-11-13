import { SITE_URL, absoluteUrl } from "../blog/site-config";

/**
 * Site-wide identity block. Google uses it to connect the pages of one
 * publisher, and search features (knowledge panel, logo in a result) read the
 * `logo` and `sameAs` values. Kept in one place so the header, the footer and
 * the JSON-LD cannot drift apart.
 */
export const ORGANIZATION = {
  name: "Setproduct",
  legalName: "Setproduct",
  url: SITE_URL,
  logo: `${SITE_URL}/images/icon-512.png`,
  email: "hello@setproduct.com",
  sameAs: [
    "https://dribbble.com/setproduct/shots",
    "https://x.com/set_product",
    "https://www.reddit.com/r/FigmaDesignSystems/",
    "https://www.pinterest.com/setproduct/",
    "https://kamushken.medium.com/",
    "https://www.linkedin.com/company/setproduct/",
  ],
} as const;

/**
 * Organization JSON-LD. Emitted once, on the home page: repeating the publisher
 * on every URL is noise that Google ignores.
 */
export function buildOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: {
      "@type": "ImageObject",
      url: ORGANIZATION.logo,
      width: 512,
      height: 512,
    },
    email: ORGANIZATION.email,
    sameAs: [...ORGANIZATION.sameAs],
  };
}

/**
 * WebSite JSON-LD with a SearchAction. This is what lets Google offer the
 * "search this site" box and send readers straight to `/search?query=…`,
 * which is the URL the navbar search field already produces.
 */
export function buildWebSiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORGANIZATION.name,
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * BreadcrumbList for a flat, non-blog page: Home → Page. Blog posts build their
 * own trail (Blog → Category → Post) in `lib/blog/schema.ts`.
 */
export function buildPageBreadcrumbJsonLd(
  label: string,
  pageUrl: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: pageUrl,
      },
    ],
  };
}

/**
 * Product JSON-LD for a template detail page. `offers.price` must be a plain
 * number, so the display string ("$168") is stripped down to digits; a price
 * that is not numeric (a "Free" or "Contact us" label) drops the whole offers
 * block rather than publishing an invalid price.
 */
export function buildProductJsonLd(params: {
  name: string;
  description: string;
  image: string;
  pageUrl: string;
  price?: string;
}): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: params.name,
    description: params.description,
    image: absoluteUrl(params.image),
    url: params.pageUrl,
    brand: {
      "@type": "Brand",
      name: ORGANIZATION.name,
    },
  };

  const amount = Number.parseFloat((params.price ?? "").replace(/[^0-9.]/g, ""));
  if (Number.isFinite(amount) && amount > 0) {
    jsonLd.offers = {
      "@type": "Offer",
      price: amount.toFixed(2),
      priceCurrency: "USD",
      url: params.pageUrl,
      availability: "https://schema.org/InStock",
    };
  }

  return jsonLd;
}
