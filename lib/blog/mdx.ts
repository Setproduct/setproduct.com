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
        remarkPlugins: [remarkGfm],
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

export function getAllBlogPostsMeta(): BlogPostMeta[] {
  return getAllBlogSlugs()
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
}

export function getRelatedPosts(
  currentSlug: string,
  category: string | undefined,
  limit = 3,
  relatedSlugs?: string[]
): BlogPostMeta[] {
  const all = getAllBlogPostsMeta();
  // Curated slugs go first, in their order; if there are fewer than `limit`,
  // the list is topped up from the same category, then from the rest.
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

  const sameCategory = category
    ? all.filter(
        (p) =>
          p.frontmatter.category === category &&
          p.frontmatter.slug !== currentSlug
      )
    : [];
  const others = all.filter(
    (p) =>
      p.frontmatter.slug !== currentSlug && !sameCategory.includes(p)
  );
  const fill = [...sameCategory, ...others].filter((p) => !curated.includes(p));
  return [...curated, ...fill].slice(0, limit);
}
