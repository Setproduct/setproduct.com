// Client-safe nav config: small constants and pure helpers only. Heavy
// catalogues (products, bundles, resources, the Inspiration pool) live in
// ./navPreviews, which SiteHeader loads lazily.
import type { CSSProperties } from "react";
import type { InspirationItem, Product } from "../../../types/data";
import type { BundleItem } from "../../../data/bundles";
import type { NavBlogPost } from "../../../lib/nav/types";
import { BLOG_POPULAR_SLUGS } from "../../../lib/blog/popular";

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
// Menu aim for the Categories column (see useMenuAim). A pointer moving down
// the list switches the previews almost at once; the short settle delay only
// filters a fast flick across several rows, so they don't all load images.
export const NAV_SUBCATEGORY_SETTLE_MS = 60;
// A pointer heading diagonally for the preview grid keeps the current category.
// While it does, the hovered row is rechecked at this interval: if the pointer
// has stopped on it, the user wants that row after all.
export const NAV_MENU_AIM_RECHECK_MS = 280;
// Vertical slack added above and below the preview grid when testing whether
// the pointer aims at it, so a path towards the top or bottom card counts too.
export const NAV_MENU_AIM_TOLERANCE_PX = 24;
// Pointer samples kept for the direction test. The oldest one is the origin,
// which smooths out single-pixel jitter.
export const NAV_MENU_AIM_HISTORY = 3;
// Menu aim for the top bar. With a panel open, a pointer crossing another
// trigger on its way down into the panel (Learn → card on the right, passing
// over Resources) keeps the open panel. If it stops on that trigger instead,
// the switch happens after this delay.
export const NAV_MENU_SWITCH_AIM_RECHECK_MS = 300;
// How steeply the pointer must head down to count as aiming at the panel:
// dy ≥ slope × |dx|. Kept low on purpose: the path from Learn to the top-right
// card on 1440 drops only ~7°, and erring towards "aiming" costs just the
// delay above, while erring the other way is the bug itself.
export const NAV_MENU_SWITCH_AIM_SLOPE = 1 / 20;
// Minimum downward travel across the sample history, so hand jitter on a
// horizontal sweep along the bar never reads as aiming.
export const NAV_MENU_SWITCH_AIM_MIN_DY_PX = 2;
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

// Learn opens on "Popular" (null keeps it the default tab and the /blog
// landing link). Most visitors land on one post from Google, so the most-read
// posts hold a newcomer better than whatever was published last. Fresh posts
// move to "Latest". The list lives in lib/blog/popular.ts (also used by
// related posts); refresh it each quarter.
export const NAV_BLOG_POPULAR_SLUGS = BLOG_POPULAR_SLUGS;
export const NAV_BLOG_LATEST = "__latest__";

export const NAV_BLOG_CATEGORIES: Array<{ label: string; category: string | null }> = [
  { label: "Popular", category: null },
  { label: "Latest", category: NAV_BLOG_LATEST },
  // Labels are sentence case; `category` must match the MDX frontmatter.
  // SEO feeds the paid publishing funnel. Tools and Inspiration were dropped
  // to keep the column at nine rows (thin categories; Inspiration also
  // clashed with the navbar item of the same name).
  { label: "UI design", category: "UI Design" },
  { label: "Startups & SaaS", category: "Startups & SaaS" },
  { label: "Growth hacking", category: "Growth Hacking" },
  { label: "SEO", category: "SEO" },
  { label: "Design & code", category: "Design & Code" },
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
  { href: "/legal/refunds-policy", label: "Refund policy" },
  { href: "#", label: "Contact us", modal: true },
];

// Curated subset of freebies categories surfaced in the nav dropdown. Like
// DESIGN_KITS, we don't list every taxonomy entry — only the well-populated,
// recognisable ones — so each hovered tab yields a full preview grid. `label`
// is sentence-case for display; `category` must match FREEBIE_PRODUCTS exactly.
// «Desktop utilities» и «Self-hosted apps» сюда не входят: по две карточки
// не заполнят сетку из NAV_FREEBIE_PREVIEW_COUNT, они живут только в листинге.
export const NAV_FREEBIE_CATEGORIES: Array<{ label: string; category: string | null }> = [
  { label: "All topics", category: null },
  { label: "Figma templates", category: "Figma templates" },
  { label: "UI components", category: "UI components" },
  { label: "Icons and animations", category: "Icons and animations" },
  { label: "Design and AI tools", category: "Design and AI tools" },
];

/**
 * Learn previews. null → curated popular posts (topped up with the newest if
 * a slug is missing), NAV_BLOG_LATEST → newest posts, otherwise the newest
 * posts of that category. `posts` are sorted newest first.
 */
export function getBlogPreviews<T extends Pick<NavBlogPost, "category" | "slug">>(posts: T[], category: string | null): T[] {
  if (category === null) {
    const bySlug = new Map(posts.map((p) => [p.slug, p]));
    const popular = NAV_BLOG_POPULAR_SLUGS.map((slug) => bySlug.get(slug)).filter((p): p is T => Boolean(p));
    const filler = posts.filter((p) => !NAV_BLOG_POPULAR_SLUGS.includes(p.slug));
    return [...popular, ...filler].slice(0, NAV_BLOG_PREVIEW_COUNT);
  }
  if (category === NAV_BLOG_LATEST) return posts.slice(0, NAV_BLOG_PREVIEW_COUNT);
  return posts.filter((p) => p.category === category).slice(0, NAV_BLOG_PREVIEW_COUNT);
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
