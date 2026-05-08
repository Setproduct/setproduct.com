import type { GetStaticProps, InferGetStaticPropsType } from "next";
import BundlePage from "../components/pages/BundlePage";
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

export default function BundleRoute({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BundlePage blogPosts={blogPosts} />;
}
