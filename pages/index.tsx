import type { GetStaticProps, InferGetStaticPropsType } from "next";
import HomePage from "../components/pages/HomePage";
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

export default function IndexPage({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <HomePage blogPosts={blogPosts} />;
}
