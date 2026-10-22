// Client-safe nav config: small constants and pure helpers only. Heavy
// catalogues (products, bundles, resources, the Inspiration pool) live in
// ./navPreviews, which SiteHeader loads lazily.
import type { CSSProperties } from "react";
import type { InspirationItem, Product } from "../../../types/data";
import type { BundleItem } from "../../../data/bundles";
import type { NavBlogPost } from "../../../lib/nav/types";

/** Internal keys of the navbar dropdowns. Reports map them via NAV_MENU_ID. */
export type MenuKey = "inspiration" | "tutorials" | "freebies" | "designKits" | "information";
/** Dropdowns with a Categories column that swaps the preview cards. */
export type CategoryMenuKey = Exclude<MenuKey, "information">;

export type KitPreview = {
  href: string;
  buyHref: string;
  buyLabel: string;
  image: string;
  title: string;
  description: string;
};

export const EXTERNAL_LINK_PROPS = { rel: "noreferrer", target: "_blank" } as const;

// Hover-intent timings. A short open delay stops a cursor that merely sweeps
// across a trigger from dropping the full-width panel; a longer close grace
// period lets the pointer travel diagonally into the panel (or hop to an
// adjacent trigger) without the menu snapping shut underneath it.
export const NAV_HOVER_OPEN_DELAY_MS = 120;
export const NAV_HOVER_CLOSE_DELAY_MS = 250;
// Debounce for switching subcategories *inside* an already-open panel. Without
// it a cursor sweeping down the Categories column strobes through every preview
// set; this makes only the category the pointer settles on actually load.
export const NAV_SUBCATEGORY_HOVER_DELAY_MS = 260;
// A panel must stay open this long to count as a real `nav_menu_open` in GA4,
// so a cursor sweeping across the navbar doesn't inflate the numbers.
export const NAV_OPEN_TRACK_DELAY_MS = 500;

export const NAV_BLOG_PREVIEW_COUNT = 6;
export const NAV_KIT_PREVIEW_COUNT = 6;
export const NAV_FREEBIE_PREVIEW_COUNT = 6;
export const NAV_INSPIRATION_PREVIEW_COUNT = 6;
// Inspiration items shipped with every page (random per build). The "All" tab
// picks its six from these on mount, so it changes on every refresh without
// downloading the full pool; category tabs use the pool once it loads.
export const NAV_INSPIRATION_SAMPLE_COUNT = NAV_INSPIRATION_PREVIEW_COUNT * 3;

export const NAV_BLOG_CATEGORIES: Array<{ label: string; category: string | null }> = [
  { label: "All topics", category: null },
  { label: "Startups & SaaS", category: "Startups & SaaS" },
  { label: "UI Design", category: "UI Design" },
  { label: "Growth Hacking", category: "Growth Hacking" },
  { label: "Inspiration", category: "Inspiration" },
  { label: "Tools", category: "Tools" },
  { label: "Technology", category: "Technology" },
  { label: "Research", category: "Research" },
];

// Sentinel category for the Bundle tab. Bundles aren't catalogue Products and
// carry no `categories` array, so we route this tab through a dedicated branch
// in getKitPreviews instead of the product filter — otherwise it falls back to
// the featured set and duplicates the "All" tab.
export const BUNDLE_CATEGORY = "__bundles__";

export const DESIGN_KITS: Array<{ href: string; label: string; category: string | null }> = [
  { href: "/all", label: "All", category: null },
  { href: "/dashboards", label: "Dashboards", category: "dashboards" },
  { href: "/mobile", label: "Mobile", category: "mobile" },
  { href: "/dataviz", label: "Charts", category: "dataviz" },
  { href: "/code", label: "Code", category: "code" },
  { href: "/websites", label: "Websites", category: "websites" },
  { href: "/bundle", label: "Bundle", category: BUNDLE_CATEGORY },
];

export const INFORMATION_LINKS: Array<{ href: string; label: string; modal?: boolean }> = [
  { href: "/testimonials", label: "Testimonials" },
  { href: "/legal/license", label: "License" },
  { href: "/legal/refunds-policy", label: "Refund Policy" },
  { href: "#", label: "Contact us", modal: true },
];

// Curated subset of freebies categories surfaced in the nav dropdown. Like
// DESIGN_KITS, we don't list every taxonomy entry — only the well-populated,
// recognisable ones — so each hovered tab yields a full preview grid. `label`
// is sentence-case for display; `category` must match FREEBIE_PRODUCTS exactly.
export const NAV_FREEBIE_CATEGORIES: Array<{ label: string; category: string | null }> = [
  { label: "All topics", category: null },
  { label: "Code", category: "Code" },
  { label: "Components", category: "Components" },
  { label: "Free UI kits", category: "Free UI kits" },
  { label: "Mobile templates", category: "Mobile Templates" },
  { label: "Desktop templates", category: "Desktop templates" },
  { label: "Data visualization", category: "Data visualization" },
  { label: "Web design", category: "Web Design" },
];

/** Learn: newest posts, optionally narrowed to the hovered category. */
export function getBlogPreviews<T extends Pick<NavBlogPost, "category">>(posts: T[], category: string | null): T[] {
  return (category ? posts.filter((p) => p.category === category) : posts).slice(0, NAV_BLOG_PREVIEW_COUNT);
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

// UTM tagging for every outbound Inspiration link so app.setproduct.com can
// attribute the traffic this mega-menu sends. Appended at render time (the
// scraped hrefs in data/inspiration.ts stay clean).
const INSPIRATION_UTM = "utm_source=setproduct.com&utm_medium=navbar&utm_campaign=inspiration";
export function withUtm(href: string): string {
  return href.includes("?") ? `${href}&${INSPIRATION_UTM}` : `${href}?${INSPIRATION_UTM}`;
}

export const INSPIRATION_LABEL_STYLE: CSSProperties = { display: "inline-flex", alignItems: "center" };

export const INSPIRATION_BADGE_STYLE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "0.5em",
  padding: "0.18em 0.5em",
  borderRadius: "0.35em",
  backgroundColor: "var(--primary)",
  color: "var(--white)",
  fontSize: "0.62em",
  fontWeight: 700,
  letterSpacing: "0.06em",
  lineHeight: 1,
};

export const SEARCH_PLACEHOLDERS = [
  "Search dashboards…",
  "Search Figma kits…",
  "Search blog posts…",
  "Search AI UI examples…",
];

export const SEARCH_PLACEHOLDER_INTERVAL_MS = 2500;

// Fisher–Yates shuffle — returns a new array, leaving the source untouched.
export function shuffle<T>(input: readonly T[]): T[] {
  const out = input.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const KIT_PREVIEWS: KitPreview[] = [
  {
    href: "/templates/orion",
    buyHref: "https://gumroad.com/a/530945235/kzbajr",
    buyLabel: "Buy $148",
    image: "/images/pricing-orion-01.webp",
    title: "Orion UI kit",
    description: "Figma library with 40+ full-width charts templates served in light & dark themes. Contains 200+ of dataviz widgets that look perfect on desktop & mobile screens.",
  },
  {
    href: "/templates/nocra",
    buyHref: "https://gumroad.com/a/530945235/uocxtg",
    buyLabel: "Buy $98",
    image: "/images/nocra-list-image.webp",
    title: "Nocra UI kit",
    description: "Nocra is a design system for AI products. Built specifically for startups harnessing AI generation: images, video, audio, music, prompts, and beyond.",
  },
  {
    href: "/templates/charts",
    buyHref: "https://setproduct.gumroad.com/l/graphz_pro",
    buyLabel: "Buy $168",
    image: "/images/pricing-charts-01.webp",
    title: "Figma Charts UI kit",
    description: "Components-driven graphs design kit for dashboards, presentations, infographics & data visualisation. Includes 25+ charts types for all the viewports.",
  },
  {
    href: "/templates/nucleus-ui",
    buyHref: "https://gumroad.com/a/169902547/snlaf",
    buyLabel: "Buy $89",
    image: "/images/nucleus-cover-1920-m.webp",
    title: "Nucleus UI",
    description: "Nucleus UI contains 1000 components and variants with 500+ mobile screens designed for Figma (including 9 themes from Event, E-commerce, Finance, NFT, etc.).",
  },
  {
    href: "/templates/material-x",
    buyHref: "https://setproduct.gumroad.com/l/material-x-fig",
    buyLabel: "Buy $148",
    image: "/images/pircing-mx-02_(1).webp",
    title: "Material X for Figma",
    description: "Figma library with 1100+ components & 40 app templates beyond Material Design. Powered by top-notch shapes and Manrope font. Customizable & Adjustable UI kit now available for Angular & Figma",
  },
  {
    href: "/templates/material-you",
    buyHref: "https://gumroad.com/a/135691379/upxbb",
    buyLabel: "Buy $124",
    image: "/images/pricing-materialme_(1).webp",
    title: "Material You UI kit",
    description: "Figma & React library with 2600+ variants of 32 components compatible with Material Design 3. Plus 220+ dashboard templates for all the viewports. Now available for NextJS & TailwindCSS.",
  },
];

// Map a catalogue product onto the mega-menu card shape so the UI kits
// dropdown can swap its right-hand previews per hovered category — mirroring
// how Learn filters blog previews by category.
export function kitPreviewFromProduct(product: Product): KitPreview {
  return {
    href: `/templates/${product.slug}`,
    buyHref: product.buyHref,
    buyLabel: `Buy $${product.price}`,
    image: product.image,
    title: product.title,
    description: product.description,
  };
}

// Map a bundle onto the mega-menu card shape. Bundles point at the /bundle
// listing (no per-bundle detail route), keep their already-formatted "$210"
// price, and have their HTML description flattened to plain text for the
// clamped preview line.
export function bundlePreviewFromItem(bundle: BundleItem): KitPreview {
  return {
    href: "/bundle",
    buyHref: bundle.buyHref,
    buyLabel: `Buy ${bundle.price}`,
    image: bundle.image,
    title: bundle.title,
    description: bundle.descriptionHtml
      .replace(/<[^>]*>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim(),
  };
}
