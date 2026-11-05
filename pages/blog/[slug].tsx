import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import BlogPostLayout from "../../components/blog/BlogPostLayout";
import { getNavData } from "../../lib/nav/buildNavData";
import type { NavData } from "../../lib/nav/types";
import { getAllBlogSlugs, getBlogPost, getRelatedPosts } from "../../lib/blog/mdx";
import { SITE_URL } from "../../lib/blog/site-config";
import type { BlogPost, BlogPostMeta } from "../../types/blog";

type PageProps = {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
  postUrl: string;
  navData: NavData;
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

  // 6: the sidebar "Read next" shows the first five; after the body the first
  // one becomes the "Next article" card and Related posts take #2–#4.
  const relatedPosts = getRelatedPosts(slug, post.frontmatter.category, 6, post.frontmatter.relatedSlugs);
  const postUrl = `${SITE_URL}/blog/${slug}`;
  const navData = getNavData();

  return { props: { post, relatedPosts, postUrl, navData } };
};

export default function BlogArticlePage({
  post,
  relatedPosts,
  postUrl,
  navData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogPostLayout post={post} relatedPosts={relatedPosts} postUrl={postUrl} navData={navData} />;
}
