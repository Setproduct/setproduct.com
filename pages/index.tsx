import type { GetStaticProps, InferGetStaticPropsType } from "next";
import HomePage from "../components/pages/HomePage";
import { HOME_BLOG_CATEGORIES, HOME_BLOG_POST_LIMIT } from "../data/blog-categories";
import { getBlogPostPreviews } from "../lib/blog/get-blog-post-previews";
import { getNavData, pickNavBlogSlugs } from "../lib/nav/buildNavData";
import type { NavBlogPost, NavData } from "../lib/nav/types";

type Props = {
  blogPosts: NavBlogPost[];
  navData: NavData;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getBlogPostPreviews();

  // The home page renders posts in three places: the blog section (the newest
  // HOME_BLOG_POST_LIMIT overall and per home category tab), the Learn panel
  // of the mega-menu and the footer's Popular reads. Only those posts are
  // sent, instead of the whole blog.
  const keep = pickNavBlogSlugs(posts);
  for (const post of posts.slice(0, HOME_BLOG_POST_LIMIT)) keep.add(post.slug);
  for (const category of HOME_BLOG_CATEGORIES) {
    posts
      .filter((post) => post.category === category)
      .slice(0, HOME_BLOG_POST_LIMIT)
      .forEach((post) => keep.add(post.slug));
  }

  const blogPosts = posts
    .filter((post) => keep.has(post.slug))
    .map(({ slug, title, description, thumbImage, category }) => ({ slug, title, description, thumbImage, category }));

  return {
    props: {
      blogPosts,
      // The list above already feeds the Learn panel.
      navData: getNavData({ blog: false }),
    },
  };
};

export default function IndexPage({ blogPosts, navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <HomePage blogPosts={blogPosts} navData={navData} />;
}
