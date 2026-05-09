import type { GetStaticProps, InferGetStaticPropsType } from "next";
import BlogListingPage from "../components/pages/BlogListingPage";
import { getBlogPostPreviews } from "../lib/blog/get-blog-post-previews";
import type { BlogPostPreview } from "../types/data";

type Props = {
  blogPosts: BlogPostPreview[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      blogPosts: getBlogPostPreviews(),
    },
  };
};

export default function BlogRoute({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogListingPage blogPosts={blogPosts} />;
}
