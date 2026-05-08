import type { GetStaticProps, InferGetStaticPropsType } from "next";
import LicensePage from "../../components/pages/LicensePage";
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

export default function LicenseRoute({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <LicensePage blogPosts={blogPosts} />;
}
