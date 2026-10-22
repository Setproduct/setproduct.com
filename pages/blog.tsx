import type { GetStaticProps, InferGetStaticPropsType } from "next";
import BlogListingPage from "../components/pages/BlogListingPage";
import { getBlogPostPreviews } from "../lib/blog/get-blog-post-previews";
import { getNavData } from "../lib/nav/buildNavData";
import type { NavData } from "../lib/nav/types";
import type { BlogPostPreview } from "../types/data";

type Props = {
  blogPosts: BlogPostPreview[];
  navData: NavData;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      blogPosts: getBlogPostPreviews(),
      // The full list above already feeds the Learn panel.
      navData: getNavData({ blog: false }),
    },
  };
};

export default function BlogRoute({ blogPosts, navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogListingPage blogPosts={blogPosts} navData={navData} />;
}
