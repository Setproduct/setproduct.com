// Server-only: reads the blog from disk. Import it from getStaticProps only;
// client code should import types from ./types instead.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getBlogPostPreviews } from "../blog/get-blog-post-previews";
import { INSPIRATION_CATEGORIES, INSPIRATION_ITEMS } from "../../data/inspiration";
import { UI_GUIDES, UI_GUIDE_START_HERE } from "../../data/ui-guides";
import type { BlogFrontmatter } from "../../types/blog";
import type { FreebieItem } from "../../types/data";
import {
  NAV_BLOG_CATEGORIES,
  NAV_INSPIRATION_SAMPLE_COUNT,
  getBlogPreviews,
  shuffle,
} from "../../components/layout/nav/navConfig";
// The server may import the full catalogue directly.
import { getFreebiePreviews } from "../../components/layout/nav/navPreviews";
import type { NavBlogPost, NavData, NavFreebie, NavGuideStart } from "./types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Label, slug and cover thumb of the lead guides. Only those three fields are
 * needed by the panel, so the rest of each post's frontmatter stays out of the
 * page props.
 */
function buildGuideStartData(): NavGuideStart[] {
  return UI_GUIDE_START_HERE.map((slug) => {
    const guide = UI_GUIDES.find((item) => item.slug === slug);
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!guide || !fs.existsSync(filePath)) {
      throw new Error(`[nav] lead guide "${slug}" is missing from data/ui-guides.ts or content/blog/.`);
    }
    const { data } = matter(fs.readFileSync(filePath, "utf8"));
    const frontmatter = data as BlogFrontmatter;
    const image = frontmatter.thumbImage ?? frontmatter.coverImage ?? "";
    return {
      slug: guide.slug,
      label: guide.label,
      thumbImage: image.replace("/blog/covers/", "/blog/covers/thumbs/"),
    };
  });
}

function toNavFreebie(item: FreebieItem): NavFreebie {
  const out: NavFreebie = {
    slug: item.slug,
    title: item.title,
    description: item.description,
    thumb: item.thumb,
    previewHref: item.previewHref,
    duplicateHref: item.duplicateHref,
    isFree: item.isFree,
  };
  // getStaticProps can't serialise `undefined`, so optional labels are only
  // set when present.
  if (item.ctaLabel !== undefined) out.ctaLabel = item.ctaLabel;
  if (item.menuCtaLabel !== undefined) out.menuCtaLabel = item.menuCtaLabel;
  return out;
}

type GetNavDataOptions = {
  /**
   * Set to false on pages that already ship the full post list in their own
   * props (home, /blog). They merge it in on the client instead of sending the
   * same posts twice.
   */
  blog?: boolean;
};

let cached: NavData | null = null;

/**
 * Slugs of the posts the Learn panel can show: the previews of every Learn
 * category. `posts` must be sorted newest first, as getBlogPostPreviews
 * returns them. The footer's Popular reads are the first previews of the
 * Popular category, so they are covered too.
 */
export function pickNavBlogSlugs(posts: Pick<NavBlogPost, "slug" | "category">[]): Set<string> {
  const picked = new Set<string>();
  for (const { category } of NAV_BLOG_CATEGORIES) {
    for (const post of getBlogPreviews(posts, category)) picked.add(post.slug);
  }
  return picked;
}

function build(): NavData {
  const posts = getBlogPostPreviews();
  const picked = pickNavBlogSlugs(posts);
  const blog = posts
    .filter((post) => picked.has(post.slug))
    .map(({ slug, title, description, thumbImage, category }) => ({ slug, title, description, thumbImage, category }));

  return {
    blog,
    freebies: getFreebiePreviews(null).map(toNavFreebie),
    guides: buildGuideStartData(),
    inspiration: shuffle(INSPIRATION_ITEMS).slice(0, NAV_INSPIRATION_SAMPLE_COUNT),
    inspirationCategories: INSPIRATION_CATEGORIES,
  };
}

/**
 * Everything the mega-menu renders on first paint, trimmed to what it shows:
 * the 6 newest posts of each Learn category (deduped, so the client gets the
 * same previews as from the full list), the "All" resources and a random
 * Inspiration sample. One result is shared by every page of a build.
 */
export function getNavData(options: GetNavDataOptions = {}): NavData {
  // In dev every request should see fresh posts.
  const data = process.env.NODE_ENV === "production" ? (cached ??= build()) : build();
  return options.blog === false ? { ...data, blog: [] } : data;
}
