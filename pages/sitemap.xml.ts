import type { GetServerSideProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { TEMPLATE_PRODUCTS } from "../data/templates-listing";
import { FREEBIE_PRODUCTS } from "../data/freebies-listing";
import { DASHBOARD_TEMPLATES } from "../data/dashboard-templates";
import { AUTHORS } from "../lib/blog/authors";

const SITE_URL = "https://www.setproduct.com";

const STATIC_PATHS = [
  "/",
  "/all",
  "/blog",
  "/bundle",
  "/code",
  "/dashboards",
  "/dataviz",
  "/freebies",
  "/legal/license",
  "/legal/refunds-policy",
  "/legal/terms-of-paid-posts",
  "/mobile",
  "/testimonials",
  "/websites",
];

type Entry = { loc: string; lastmod?: string };

// lastmod is only emitted when we actually know when a page changed. Google
// ignores lastmod site-wide once it notices the values are not trustworthy
// (for example "today" on every URL), so pages without a real date get none.
function toIsoDay(value: unknown): string | undefined {
  if (typeof value !== "string" && !(value instanceof Date)) return undefined;
  // lastUpdated may be "YYYY-MM"; treat it as the first day of that month,
  // the same way lib/blog/schema.ts builds dateModified.
  const raw = typeof value === "string" && /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : value;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

function readPostLastmod(filePath: string): string | undefined {
  try {
    const { data } = matter(fs.readFileSync(filePath, "utf8"));
    const fm = data as { date?: unknown; lastUpdated?: unknown };
    const published = toIsoDay(fm.date);
    const updated = toIsoDay(fm.lastUpdated);
    if (updated && (!published || updated > published)) return updated;
    return published;
  } catch {
    return undefined;
  }
}

function readBlogEntries(): Entry[] {
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) return [];
  const entries: Entry[] = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.mdx$/, "");
    entries.push({ loc: `${SITE_URL}/blog/${slug}`, lastmod: readPostLastmod(path.join(dir, file)) });
  }
  return entries;
}

function buildEntries(): Entry[] {
  const blogEntries = readBlogEntries();

  // The blog listing changes whenever a post is published or updated.
  const newestPost = blogEntries
    .map((e) => e.lastmod)
    .filter((d): d is string => Boolean(d))
    .sort()
    .pop();

  const staticEntries: Entry[] = STATIC_PATHS.map((p) => ({
    loc: p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`,
    lastmod: p === "/blog" ? newestPost : undefined,
  }));

  const templateEntries: Entry[] = TEMPLATE_PRODUCTS.map((t) => ({
    loc: `${SITE_URL}/templates/${t.slug}`,
  }));

  const freebieEntries: Entry[] = FREEBIE_PRODUCTS.map((f) => ({
    loc: `${SITE_URL}/freebies/${f.slug}`,
  }));

  const dashboardEntries: Entry[] = DASHBOARD_TEMPLATES.map((d) => ({
    loc: `${SITE_URL}/dashboard-templates/${d.slug}`,
  }));

  const authorEntries: Entry[] = Object.keys(AUTHORS).map((slug) => ({
    loc: `${SITE_URL}/authors/${slug}`,
  }));

  const all = [
    ...staticEntries,
    ...blogEntries,
    ...templateEntries,
    ...freebieEntries,
    ...dashboardEntries,
    ...authorEntries,
  ];

  const seen = new Set<string>();
  return all.filter((e) => {
    if (seen.has(e.loc)) return false;
    seen.add(e.loc);
    return true;
  });
}

function renderXml(entries: Entry[]): string {
  const urls = entries
    .map(({ loc, lastmod }) => {
      const parts = [`    <loc>${loc}</loc>`];
      if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = renderXml(buildEntries());
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
