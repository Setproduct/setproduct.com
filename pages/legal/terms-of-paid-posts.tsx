import type { GetStaticProps, InferGetStaticPropsType } from "next";
import TermsOfPaidPostsPage from "../../components/pages/TermsOfPaidPostsPage";
import { getBlogPostPreviews } from "../../lib/blog/get-blog-post-previews";
import type { BlogPostPreview } from "../../types/data";

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

export default function TermsOfPaidPostsRoute({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <TermsOfPaidPostsPage blogPosts={blogPosts} />;
}
