import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type BlogFrontmatter = {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  coverImage: string;
  coverImageAlt?: string;
  tags?: string[];
  canonical?: string;
};

export type BlogPost = {
  frontmatter: BlogFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
  readingTimeText: string;
  readingTimeMinutes: number;
};

export type BlogPostMeta = {
  frontmatter: BlogFrontmatter;
  readingTimeText: string;
};
