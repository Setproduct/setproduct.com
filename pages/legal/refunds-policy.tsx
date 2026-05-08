import type { GetStaticProps, InferGetStaticPropsType } from "next";
import RefundsPolicyPage from "../../components/pages/RefundsPolicyPage";
import { getBlogPostPreviews } from "../../lib/blog/get-blog-post-previews";
import type { BlogPostPreview } from "../../types/data";

type Props = {
  blogPosts: BlogPostPreview[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      blogPosts: getBlogPostPreviews({ maxPerCategory: 6 }),
    },
  };
};

export default function RefundsPolicyRoute({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <RefundsPolicyPage blogPosts={blogPosts} />;
}
