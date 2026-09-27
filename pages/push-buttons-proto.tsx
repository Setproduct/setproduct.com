import type { GetStaticProps, InferGetStaticPropsType } from "next";
import PushButtonsProtoPage from "../components/pages/PushButtonsProtoPage";
import { getBlogPostPreviews } from "../lib/blog/get-blog-post-previews";
import type { BlogPostPreview } from "../types/data";

type Props = {
  blogPosts: BlogPostPreview[];
};

// Temporary prototype page (noindex, not in sitemap). Remove after push buttons ship.
export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      blogPosts: getBlogPostPreviews({ maxPerCategory: 6 }),
    },
  };
};

export default function PushButtonsProtoRoute({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PushButtonsProtoPage blogPosts={blogPosts} />;
}
