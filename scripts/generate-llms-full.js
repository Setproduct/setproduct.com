/**
 * Builds public/llms-full.txt from the frontmatter of every post in
 * content/blog. Run with `npm run llms` after publishing, renaming or
 * deleting a post.
 *
 * - Posts are grouped by `category`. Groups are ordered by post count
 *   (largest first), posts inside a group by `date` (newest first).
 * - Each entry uses `title` and `description`, the same pair that goes into
 *   the page's <title> and meta description.
 * - The script only writes the file. It does not touch posts or images.
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const OUT_FILE = path.join(ROOT, "public", "llms-full.txt");
const SITE_URL = "https://www.setproduct.com";

// Keep in sync with LEGACY_BLOG_CATEGORIES in data/blog-categories.ts.
const LEGACY_CATEGORIES = { Resources: "Tools" };
const FALLBACK_CATEGORY = "Other";

const HEADER = [
  "# Setproduct — full content index",
  "",
  "> Complete list of all blog articles on Setproduct, grouped by category. Each entry has a title, a short description, and a URL. Setproduct also sells Figma and coded UI kits; see https://www.setproduct.com/llms.txt for the compact overview and product catalog.",
  "",
  `Site: ${SITE_URL}`,
  `Blog: ${SITE_URL}/blog`,
];

function oneLine(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function toTime(value) {
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? 0 : t;
}

function readPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
      const slug = data.slug || file.replace(/\.mdx$/, "");
      const rawCategory = oneLine(data.category) || FALLBACK_CATEGORY;
      return {
        slug,
        title: oneLine(data.title) || slug,
        description: oneLine(data.description),
        category: LEGACY_CATEGORIES[rawCategory] || rawCategory,
        time: toTime(data.date),
      };
    });
}

function build() {
  const posts = readPosts();

  const groups = new Map();
  for (const post of posts) {
    if (!groups.has(post.category)) groups.set(post.category, []);
    groups.get(post.category).push(post);
  }

  const ordered = [...groups.entries()].sort(
    (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]),
  );

  const lines = [...HEADER];
  for (const [category, items] of ordered) {
    items.sort((a, b) => b.time - a.time || a.slug.localeCompare(b.slug));
    lines.push("", `## ${category}`, "");
    for (const p of items) {
      const url = `${SITE_URL}/blog/${p.slug}`;
      lines.push(p.description ? `- [${p.title}](${url}): ${p.description}` : `- [${p.title}](${url})`);
    }
  }

  fs.writeFileSync(OUT_FILE, `${lines.join("\n")}\n`);
  console.log(`llms-full.txt: ${posts.length} posts in ${ordered.length} categories`);
}

build();
