import type { GetStaticProps, InferGetStaticPropsType } from "next";
import FreebiesListingPage from "../components/pages/FreebiesListingPage";
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

export default function FreebiesRoute({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <FreebiesListingPage blogPosts={blogPosts} />;
}
