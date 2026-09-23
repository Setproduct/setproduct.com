import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getBlogPostPreviews } from "../blog/get-blog-post-previews";
import { computeReadingTime } from "../blog/reading-time";
import { PRODUCTS } from "../../data/products";
import { TEMPLATE_PRODUCTS } from "../../data/templates-listing";
import { FREEBIE_PRODUCTS } from "../../data/freebies-listing";
import { BUNDLES } from "../../data/bundles";
import { DASHBOARD_TEMPLATES } from "../../data/dashboard-templates";
import type { SearchableItem } from "./types";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Превью в выдаче не больше 400px, поэтому для блога берём уже сгенерированный
// thumb (scripts/generate-blog-thumbs.js), если он есть, а не полноразмерную обложку.
function getBlogThumb(image: string): string {
  if (!image.startsWith("/blog/covers/")) return image;
  const thumb = `/blog/covers/thumbs/${path.basename(image)}`;
  return fs.existsSync(path.join(PUBLIC_DIR, thumb)) ? thumb : image;
}

function getBlogReadingTime(slug: string): string | undefined {
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    if (typeof data.readingTimeText === "string" && data.readingTimeText.trim()) {
      return data.readingTimeText.trim();
    }
    return `${computeReadingTime(content).minutes} min read`;
  } catch {
    return undefined;
  }
}

export function buildSearchIndex(): SearchableItem[] {
  const items: SearchableItem[] = [];
  const blogPosts = getBlogPostPreviews();

  for (const post of blogPosts) {
    items.push({
      type: "blog",
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      url: `/blog/${post.slug}`,
      image: getBlogThumb(post.image),
      readingTime: getBlogReadingTime(post.slug),
    });
  }

  for (const product of PRODUCTS) {
    items.push({
      type: "product",
      slug: product.slug,
      title: product.title,
      description: product.description,
      category: product.categories.join(", "),
      url: `/templates/${product.slug}`,
      image: product.image,
      price: product.price ? `$${product.price}` : undefined,
    });
  }

  const productSlugs = new Set(PRODUCTS.map((p) => p.slug));
  for (const tpl of TEMPLATE_PRODUCTS) {
    if (productSlugs.has(tpl.slug)) continue;
    items.push({
      type: "template",
      slug: tpl.slug,
      title: tpl.title,
      description: tpl.description,
      category: tpl.category,
      url: `/templates/${tpl.slug}`,
      image: tpl.heroImage,
      price: tpl.price,
    });
  }

  for (const freebie of FREEBIE_PRODUCTS) {
    items.push({
      type: "freebie",
      slug: freebie.slug,
      title: freebie.title,
      description: freebie.description,
      category: freebie.category,
      url: `/freebies/${freebie.slug}`,
      image: freebie.image,
      isFree: true,
    });
  }

  for (const bundle of BUNDLES) {
    items.push({
      type: "bundle",
      slug: bundle.slug,
      title: bundle.title,
      description: stripHtml(bundle.descriptionHtml),
      category: bundle.subtitle,
      url: `/bundle#${bundle.slug}`,
      image: bundle.image,
      price: bundle.price,
    });
  }

  for (const dash of DASHBOARD_TEMPLATES) {
    items.push({
      type: "dashboard",
      slug: dash.slug,
      title: dash.heroTitle,
      description: stripHtml(dash.heroSubtitleHtml).slice(0, 240),
      category: "Dashboards",
      url: `/dashboard-templates/${dash.slug}`,
      image: dash.ogImage,
    });
  }

  return items;
}
