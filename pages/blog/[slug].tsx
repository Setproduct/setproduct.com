import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import BlogPostLayout from "../../components/blog/BlogPostLayout";
import { getAllBlogSlugs, getBlogPost } from "../../lib/blog/mdx";
import type { BlogPost } from "../../types/blog";

type PageProps = {
  post: BlogPost;
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

  return { props: { post } };
};

export default function BlogArticlePage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogPostLayout post={post} />;
}
