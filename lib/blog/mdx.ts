import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import type { BlogFrontmatter, BlogHeading, BlogPost, BlogPostMeta } from "../../types/blog";
import { computeReadingTime } from "./reading-time";
import { BLOG_POPULAR_SLUGS } from "./popular";

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: { id?: string };
  children?: HastNode[];
};

function rehypeCleanIds() {
  return (tree: HastNode) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree as any, "element", (node: HastNode) => {
      if (node.tagName && /^h[1-6]$/.test(node.tagName) && node.properties?.id) {
        node.properties.id = node.properties.id.replace(/-+/g, "-").replace(/^-|-$/g, "");
      }
    });
  };
}

function hastText(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(hastText).join("");
}

/**
 * Collects H2/H3 from the final HTML tree, after rehype-slug and
 * rehypeCleanIds have assigned ids. The table of contents therefore uses
 * exactly the same ids as the rendered headings (duplicates, inline
 * markdown and multi-line headings included), so a TOC link can never
 * point to a missing anchor.
 */
function rehypeCollectHeadings(target: BlogHeading[]) {
  return () => (tree: HastNode) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree as any, "element", (node: HastNode) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const id = node.properties?.id;
      const text = hastText(node).replace(/\s+/g, " ").trim();
      if (!id || !text) return;
      target.push({ id, text, level: node.tagName === "h2" ? 2 : 3 });
    });
  };
}

type MdxJsxNode = {
  type: string;
  name?: string | null;
  attributes?: Array<{ type: string; name: string; value: string }>;
};

/**
 * `<inlineCTA>…</inlineCTA>` in a post body is not a React component: MDX
 * treats a lowercase-initial tag as a literal HTML element, so it would reach
 * the page as an unknown tag. This rewrites it to a styled div at compile
 * time, which keeps the block readable in the MDX source and valid in HTML.
 * Styles live in styles/globals.css under `.blog-inline-cta`.
 */
function remarkInlineCtaBlock() {
  return (tree: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree as any, "mdxJsxFlowElement", (node: MdxJsxNode) => {
      if (node.name !== "inlineCTA") return;
      node.name = "div";
      node.attributes = [
        { type: "mdxJsxAttribute", name: "className", value: "blog-inline-cta" },
      ];
    });
  };
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as BlogFrontmatter;

    const headings: BlogHeading[] = [];
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkInlineCtaBlock],
        rehypePlugins: [
          rehypeSlug,
          rehypeCleanIds,
          rehypeCollectHeadings(headings),
          rehypeHighlight,
        ],
      },
    });

    const { text, minutes } = computeReadingTime(content);

    return {
      frontmatter,
      mdxSource,
      readingTimeText: frontmatter.readingTimeText ?? text,
      readingTimeMinutes: minutes,
      headings,
    };
  } catch {
    return null;
  }
}

let allPostsMetaCache: BlogPostMeta[] | null = null;

export function getAllBlogPostsMeta(): BlogPostMeta[] {
  // getRelatedPosts calls this once per post page. Without the cache a build
  // parses every post for every post (200 × 200 files). Posts cannot change
  // during a build, so one pass per worker is enough. In dev every request
  // should still see fresh posts.
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction && allPostsMetaCache) return allPostsMetaCache;

  const posts = getAllBlogSlugs()
    .map((slug) => {
      const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
      try {
        const raw = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(raw);
        const { text } = computeReadingTime(content);
        return {
          frontmatter: data as BlogFrontmatter,
          readingTimeText: text,
        };
      } catch {
        return null;
      }
    })
    .filter((post): post is BlogPostMeta => post !== null);

  if (isProduction) allPostsMetaCache = posts;
  return posts;
}

/**
 * Keeps only the fields that post cards render (related posts, "read next"
 * block and bar). Full frontmatter carries FAQ, HowTo steps, inline CTA and
 * related slugs, which are several KB per post and never reach the screen.
 * Missing optional fields become null, because Next.js cannot serialise
 * undefined in page props.
 */
export function toBlogPostCard({ frontmatter, readingTimeText }: BlogPostMeta): BlogPostMeta {
  return {
    frontmatter: {
      title: frontmatter.title,
      slug: frontmatter.slug,
      category: frontmatter.category ?? null,
      coverImage: frontmatter.coverImage,
      thumbImage: frontmatter.thumbImage ?? null,
      coverImageAlt: frontmatter.coverImageAlt ?? null,
      cardDescription: frontmatter.cardDescription ?? null,
      description: frontmatter.description,
    } as unknown as BlogFrontmatter,
    readingTimeText,
  };
}

/**
 * Meta for an explicit list of posts, in the given order. Reads only those
 * files, so pages outside the blog do not pay for parsing every post.
 * Unknown slugs are skipped.
 */
export function getBlogPostsMetaBySlugs(slugs: string[]): BlogPostMeta[] {
  const result: BlogPostMeta[] = [];
  for (const slug of slugs) {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) continue;
    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    result.push({
      frontmatter: data as BlogFrontmatter,
      readingTimeText: computeReadingTime(content).text,
    });
  }
  return result;
}

export function getRelatedPosts(
  currentSlug: string,
  category: string | undefined,
  limit = 3,
  relatedSlugs?: string[]
): BlogPostMeta[] {
  const all = getAllBlogPostsMeta();
  // Curated slugs go first, in their order. If there are fewer than `limit`,
  // the list is topped up in this order:
  //   1. popular posts of the same category,
  //   2. the rest of the same category, newest first,
  //   3. popular posts of other categories,
  //   4. everything else, newest first.
  // Popularity keeps the strongest posts in front; the date beats the old
  // alphabetical order, which always offered the same "a…" and "b…" posts.
  const curated: BlogPostMeta[] = [];
  if (relatedSlugs && relatedSlugs.length > 0) {
    const metaMap = new Map(all.map(p => [p.frontmatter.slug, p]));
    for (const slug of relatedSlugs) {
      const meta = metaMap.get(slug);
      if (meta && slug !== currentSlug && !curated.includes(meta)) {
        curated.push(meta);
        if (curated.length >= limit) return curated;
      }
    }
  }

  const popularRank = new Map(BLOG_POPULAR_SLUGS.map((slug, i) => [slug, i]));
  const isPopular = (p: BlogPostMeta) => popularRank.has(p.frontmatter.slug);
  const byPopularity = (a: BlogPostMeta, b: BlogPostMeta) =>
    (popularRank.get(a.frontmatter.slug) ?? 0) - (popularRank.get(b.frontmatter.slug) ?? 0);
  // ISO "YYYY-MM-DD" strings sort correctly as text; a missing date goes last.
  const byDateDesc = (a: BlogPostMeta, b: BlogPostMeta) =>
    String(b.frontmatter.date ?? "").localeCompare(String(a.frontmatter.date ?? ""));

  const pool = all.filter((p) => p.frontmatter.slug !== currentSlug && !curated.includes(p));
  const inCategory = (p: BlogPostMeta) => Boolean(category) && p.frontmatter.category === category;
  const same = pool.filter(inCategory);
  const other = pool.filter((p) => !inCategory(p));

  const fill = [
    ...same.filter(isPopular).sort(byPopularity),
    ...same.filter((p) => !isPopular(p)).sort(byDateDesc),
    ...other.filter(isPopular).sort(byPopularity),
    ...other.filter((p) => !isPopular(p)).sort(byDateDesc),
  ];
  return [...curated, ...fill].slice(0, limit);
}
