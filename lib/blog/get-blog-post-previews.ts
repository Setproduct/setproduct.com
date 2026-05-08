import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPostPreview } from "../../types/data";
import type { BlogFrontmatter } from "../../types/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

type FrontmatterWithDate = BlogFrontmatter & { date?: string };

export function getBlogPostPreviews(): BlogPostPreview[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const posts: Array<BlogPostPreview & { __date: string }> = [];
  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const fallbackSlug = file.replace(/\.mdx$/, "");

    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data } = matter(raw);
      const frontmatter = data as FrontmatterWithDate;

      const slug = frontmatter.slug ?? fallbackSlug;
      const category = frontmatter.category ?? "Blog";
      const title = frontmatter.title ?? slug;
      const description = frontmatter.cardDescription ?? frontmatter.description ?? "";
      const image = frontmatter.coverImage ?? "";
      const thumbImage = frontmatter.thumbImage ?? image;
      const date = frontmatter.date ?? "";

      posts.push({
        slug,
        title,
        description,
        image,
        thumbImage,
        category,
        __date: date,
      });
    } catch {
      // Skip malformed post files during preview aggregation.
    }
  }

  return posts
    .sort((a, b) => b.__date.localeCompare(a.__date))
    .map(({ __date: _date, ...post }) => post);
}
