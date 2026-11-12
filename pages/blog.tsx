import type { GetStaticProps, InferGetStaticPropsType } from "next";
import BlogListingPage from "../components/pages/BlogListingPage";
import type { BlogListingPost } from "../components/pages/BlogListingPage";
import { getBlogPostPreviews } from "../lib/blog/get-blog-post-previews";
import { getNavData } from "../lib/nav/buildNavData";
import type { NavData } from "../lib/nav/types";

type Props = {
  blogPosts: BlogListingPost[];
  navData: NavData;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      // thumbImage is derived from image on the client (see blogThumbPath).
      blogPosts: getBlogPostPreviews().map(({ thumbImage: _thumb, ...post }) => post),
      // The full list above already feeds the Learn panel.
      navData: getNavData({ blog: false }),
    },
  };
};

export default function BlogRoute({ blogPosts, navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BlogListingPage blogPosts={blogPosts} navData={navData} />;
}
