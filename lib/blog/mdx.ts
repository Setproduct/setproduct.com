import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { BlogFrontmatter, BlogPost, BlogPostMeta } from "../../types/blog";
import { computeReadingTime } from "./reading-time";

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

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
      },
    });

    const { text, minutes } = computeReadingTime(content);

    return {
      frontmatter,
      mdxSource,
      readingTimeText: text,
      readingTimeMinutes: minutes,
      headings: [],
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
