import type { GetStaticProps, InferGetStaticPropsType } from "next";
import DashboardsPage from "../components/pages/DashboardsPage";
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

export default function DashboardsRoute({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <DashboardsPage blogPosts={blogPosts} />;
}
