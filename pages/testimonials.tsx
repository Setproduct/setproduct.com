import type { GetStaticProps, InferGetStaticPropsType } from "next";
import TestimonialsPage from "../components/pages/TestimonialsPage";
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

export default function TestimonialsRoute({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <TestimonialsPage blogPosts={blogPosts} />;
}
