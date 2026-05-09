import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import BlogPostLayout from "../../components/blog/BlogPostLayout";
import { getBlogPostPreviews } from "../../lib/blog/get-blog-post-previews";
import { getAllBlogSlugs, getBlogPost, getRelatedPosts } from "../../lib/blog/mdx";
import { SITE_URL } from "../../lib/blog/site-config";
import type { BlogPostPreview } from "../../types/data";
import type { BlogPost, BlogPostMeta } from "../../types/blog";

type PageProps = {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
  postUrl: string;
  blogPosts: BlogPostPreview[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllBlogSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== "string") return { notFound: true };

  const post = await getBlogPost(slug);
  if (!post) return { notFound: true };

  const relatedPosts = getRelatedPosts(slug, post.frontmatter.category, 3, post.frontmatter.relatedSlugs);
  const postUrl = `${SITE_URL}/blog/${slug}`;
  const blogPosts = getBlogPostPreviews({ maxPerCategory: 6 });

  return { props: { post, relatedPosts, postUrl, blogPosts } };
};

export default function BlogArticlePage({
  post,
  relatedPosts,
  postUrl,
  blogPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogPostLayout post={post} relatedPosts={relatedPosts} postUrl={postUrl} blogPosts={blogPosts} />;
}
