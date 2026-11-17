// Server-only: reads the blog from disk. Import it from getStaticProps only;
// client code should import types from ./types instead.
import { getBlogPostPreviews } from "../blog/get-blog-post-previews";
import { INSPIRATION_CATEGORIES, INSPIRATION_ITEMS } from "../../data/inspiration";
import { UI_GUIDES, guideReadRank } from "../../data/ui-guides";
import { PUBLISH_SHOWCASE_SLUGS } from "../../data/publish-showcase";
import { blogThumbPath } from "../blog/thumb";
import type { BlogPostPreview, FreebieItem } from "../../types/data";
import {
  NAV_BLOG_CATEGORIES,
  NAV_GUIDE_CATEGORIES,
  NAV_INSPIRATION_SAMPLE_COUNT,
  getBlogPreviews,
  getGuidePreviews,
  shuffle,
} from "../../components/layout/nav/navConfig";
// The server may import the full catalogue directly.
import { getFreebiePreviews } from "../../components/layout/nav/navPreviews";
import type { NavData, NavFreebie, NavGuidePost, NavShowcasePost } from "./types";

/**
 * Cards of the UI guides panel. Every guide is matched to its post, sorted
 * most read first, then trimmed to what the tabs show (Popular plus six per
 * group). The thumb comes through blogThumbPath, which leaves an existing
 * /thumbs/ path alone. A guide without a post fails the build.
 */
function buildGuideData(posts: BlogPostPreview[]): NavGuidePost[] {
  const bySlug = new Map(posts.map((post) => [post.slug, post]));
  const all = UI_GUIDES.map((guide) => {
    const post = bySlug.get(guide.slug);
    if (!post) throw new Error(`[nav] UI guide "${guide.slug}" is missing from content/blog/.`);
    return {
      slug: guide.slug,
      title: post.title,
      description: post.description,
      thumbImage: blogThumbPath(post.thumbImage),
      group: guide.group,
    };
  }).sort((a, b) => guideReadRank(a.slug) - guideReadRank(b.slug));

  const picked = new Set<string>();
  for (const { group } of NAV_GUIDE_CATEGORIES) {
    for (const guide of getGuidePreviews(all, group)) picked.add(guide.slug);
  }
  return all.filter((guide) => picked.has(guide.slug));
}

/**
 * Proof rows of the Advertise panel: our own posts that hold page 1 in Google.
 * Slugs come from data/publish-showcase.ts (the same list the home band uses),
 * so the two surfaces can never drift apart. A missing slug fails the build:
 * the panel promises that these posts rank, which is a claim worth keeping
 * deliberate rather than silently shrinking to two rows.
 */
function buildShowcaseData(posts: BlogPostPreview[]): NavShowcasePost[] {
  const bySlug = new Map(posts.map((post) => [post.slug, post]));
  return PUBLISH_SHOWCASE_SLUGS.map((slug) => {
    const post = bySlug.get(slug);
    if (!post) throw new Error(`[nav] showcase post "${slug}" is missing from content/blog/.`);
    return { slug, title: post.title, thumbImage: blogThumbPath(post.thumbImage) };
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
 * Slugs of the posts the Magazine panel can show: the previews of every Magazine
 * category. `posts` must be sorted newest first, as getBlogPostPreviews
 * returns them. The footer's Popular reads are the first previews of the
 * Popular category, so they are covered too.
 */
export function pickNavBlogSlugs(posts: Pick<BlogPostPreview, "slug" | "category">[]): Set<string> {
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
    guides: buildGuideData(posts),
    showcase: buildShowcaseData(posts),
    inspiration: shuffle(INSPIRATION_ITEMS).slice(0, NAV_INSPIRATION_SAMPLE_COUNT),
    inspirationCategories: INSPIRATION_CATEGORIES,
  };
}

/**
 * Everything the mega-menu renders on first paint, trimmed to what it shows:
 * the 6 newest posts of each Magazine category (deduped, so the client gets
 * the same previews as from the full list), the "Latest" resources, the UI
 * guides tabs, the Advertise proof rows and a random Inspiration sample. One result
 * is shared by every page of a build.
 */
export function getNavData(options: GetNavDataOptions = {}): NavData {
  // In dev every request should see fresh posts.
  const data = process.env.NODE_ENV === "production" ? (cached ??= build()) : build();
  return options.blog === false ? { ...data, blog: [] } : data;
}
