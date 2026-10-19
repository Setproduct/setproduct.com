import type { GetStaticProps, InferGetStaticPropsType } from "next";
import InputsProtoPage from "../components/pages/InputsProtoPage";
import { getBlogPostPreviews } from "../lib/blog/get-blog-post-previews";
import type { BlogPostPreview } from "../types/data";

type Props = {
  blogPosts: BlogPostPreview[];
};

// Temporary prototype page (noindex, not in sitemap). Remove after the input styles ship.
export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      blogPosts: getBlogPostPreviews({ maxPerCategory: 6 }),
    },
  };
};

export default function InputsProtoRoute({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <InputsProtoPage blogPosts={blogPosts} />;
}
