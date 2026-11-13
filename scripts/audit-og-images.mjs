/**
 * Audits the Open Graph image of every blog post, resource page and template
 * page by reading the rendered HTML, not the source files.
 *
 * WHY HTML AND NOT THE MDX/DATA FILES:
 * An `og:image` tag is assembled in several places (BlogPostLayout, SeoHead,
 * FreebieDetailPage) and the value can be rewritten by `absoluteUrl`. A source
 * audit therefore answers "what did we mean to write", while the crawler sees
 * what actually shipped. This script asks the same question a crawler does:
 * fetch the URL, read `<meta property="og:image">`, resolve the file behind it.
 *
 * WHAT IT REPORTS, PER PAGE:
 *   - the og:image URL
 *   - whether the file exists in public/ and how big it is
 *   - its real pixel size and ratio (crawlers crop anything that is not 1.91:1)
 *   - whether it is unique across the site or shared with other pages
 *
 * Run with:
 *   npx next start -p 3111
 *   node scripts/audit-og-images.mjs http://localhost:3111
 */
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const BASE = (process.argv[2] ?? "http://localhost:3111").replace(/\/$/, "");
const PUBLIC = path.join(ROOT, "public");

/** Every page whose social preview we care about. */
const STATIC_PAGES = [
  "/",
  "/blog",
  "/freebies",
  "/all",
  "/dashboards",
  "/dataviz",
  "/code",
  "/mobile",
  "/websites",
  "/bundle",
  "/testimonials",
  "/search",
];

function textBetween(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}

async function fetchHtml(url) {
  const res = await fetch(url);
  if (!res.ok) return { status: res.status, html: "" };
  return { status: res.status, html: await res.text() };
}

/** Resolve an og:image URL to a file in public/, or null if it is external. */
function localFile(imageUrl) {
  if (!imageUrl) return null;
  let pathname;
  try {
    pathname = new URL(imageUrl, "https://www.setproduct.com").pathname;
  } catch {
    return null;
  }
  const decoded = decodeURIComponent(pathname);
  return path.join(PUBLIC, decoded);
}

async function inspect(imageUrl, cache) {
  if (!imageUrl) return { ok: false, reason: "no og:image tag" };
  if (cache.has(imageUrl)) return cache.get(imageUrl);

  const file = localFile(imageUrl);
  let result;
  if (!file) {
    result = { ok: false, reason: "not a local URL" };
  } else {
    try {
      const info = await stat(file);
      const meta = await sharp(file).metadata();
      result = {
        ok: true,
        bytes: info.size,
        width: meta.width,
        height: meta.height,
        ratio: meta.width / meta.height,
        format: meta.format,
      };
    } catch {
      result = { ok: false, reason: "file missing in public/" };
    }
  }
  cache.set(imageUrl, result);
  return result;
}

/** Collect slug lists straight from the data modules the pages use. */
async function dynamicPaths() {
  const posts = [];
  const { readdir } = await import("node:fs/promises");
  for (const name of await readdir(path.join(ROOT, "content", "blog"))) {
    if (name.endsWith(".mdx")) posts.push(`/blog/${name.replace(/\.mdx$/, "")}`);
  }

  const freebies = [];
  const all = [];
  for (const dir of [path.join(ROOT, "data", "freebies-listing.ts"), path.join(ROOT, "data", "templates-listing.ts")]) {
    const body = await readFile(dir, "utf8");
    const target = dir.includes("freebies") ? freebies : all;
    for (const m of body.matchAll(/slug:\s*"([^"]+)"/g)) target.push(m[1]);
  }

  return {
    posts,
    freebies: freebies.map((s) => `/freebies/${s}`),
    templates: all.map((s) => `/templates/${s}`),
  };
}

async function main() {
  const { posts, freebies, templates } = await dynamicPaths();

  const groups = [
    { name: "Static pages", urls: STATIC_PAGES },
    { name: "Blog posts", urls: posts },
    { name: "Resource pages", urls: freebies },
    { name: "Template pages", urls: templates },
  ];

  const cache = new Map();
  const rows = [];
  const usage = new Map();

  for (const group of groups) {
    for (const url of group.urls) {
      const { status, html } = await fetchHtml(`${BASE}${url}`);
      const ogImage = textBetween(html, /<meta property="og:image" content="([^"]*)"/);
      const info = status === 200 ? await inspect(ogImage, cache) : { ok: false, reason: `HTTP ${status}` };
      rows.push({ group: group.name, url, ogImage, info });
      if (ogImage) usage.set(ogImage, (usage.get(ogImage) ?? 0) + 1);
      process.stdout.write(".");
    }
  }
  console.log("");

  const report = { base: BASE, generatedAt: new Date().toISOString(), rows: [], summary: {} };

  for (const row of rows) {
    const shared = row.ogImage ? usage.get(row.ogImage) ?? 0 : 0;
    report.rows.push({
      group: row.group,
      url: row.url,
      ogImage: row.ogImage,
      sharedWith: shared - 1,
      ...row.info,
    });
  }

  // Summary per group: how many pages have a distinct, valid, correctly shaped card.
  for (const group of groups) {
    const inGroup = report.rows.filter((r) => r.group === group.name);
    const valid = inGroup.filter((r) => r.ok);
    const correctRatio = valid.filter((r) => Math.abs(r.ratio - 1.905) < 0.06);
    const unique = valid.filter((r) => r.sharedWith === 0);
    report.summary[group.name] = {
      pages: inGroup.length,
      withImage: inGroup.filter((r) => r.ogImage).length,
      resolvable: valid.length,
      correctRatio: correctRatio.length,
      unique: unique.length,
      sharedDefault: valid.filter((r) => r.sharedWith > 0).length,
    };
  }

  const out = path.join(ROOT, "scripts", "og-audit.json");
  await import("node:fs/promises").then((fs) => fs.writeFile(out, JSON.stringify(report, null, 2)));

  console.log(JSON.stringify(report.summary, null, 2));
  console.log(`\nWrote ${path.relative(ROOT, out)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
