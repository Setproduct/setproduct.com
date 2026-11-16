import type { GetStaticProps, InferGetStaticPropsType } from "next";
import HomePage, { type HomeResource } from "../components/pages/HomePage";
import { FREEBIE_PRODUCTS } from "../data/freebies-listing";
import { HOME_FEED_LIMIT, HOME_FEED_PINNED_SLUG, HOME_FREEBIE_SLUGS, HOME_MOST_READ_COUNT } from "../data/home";
import { PUBLISH_SHOWCASE_SLUGS } from "../data/publish-showcase";
import { BLOG_POPULAR_SLUGS } from "../lib/blog/popular";
import { getBlogPostPreviews } from "../lib/blog/get-blog-post-previews";
import { getNavData, pickNavBlogSlugs } from "../lib/nav/buildNavData";
import type { NavBlogPost, NavData } from "../lib/nav/types";

type Props = {
  /** Mega-menu Learn panel and footer Popular reads. */
  blogPosts: NavBlogPost[];
  feedPosts: NavBlogPost[];
  mostRead: NavBlogPost[];
  showcase: NavBlogPost[];
  resources: HomeResource[];
  navData: NavData;
};

function bySlugs(posts: NavBlogPost[], slugs: readonly string[]): NavBlogPost[] {
  return slugs.map((slug) => posts.find((post) => post.slug === slug)).filter((post): post is NavBlogPost => !!post);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts: NavBlogPost[] = getBlogPostPreviews().map(({ slug, title, description, thumbImage, category }) => ({
    slug,
    title,
    description,
    thumbImage,
    category,
  }));

  // Each block gets only the posts it renders.
  const navSlugs = pickNavBlogSlugs(posts);
  const blogPosts = posts.filter((post) => navSlugs.has(post.slug));

  const pinned = HOME_FEED_PINNED_SLUG ? bySlugs(posts, [HOME_FEED_PINNED_SLUG]) : [];
  const feedPosts = [...pinned, ...posts.filter((post) => post.slug !== HOME_FEED_PINNED_SLUG)].slice(
    0,
    HOME_FEED_LIMIT,
  );

  const mostRead = bySlugs(posts, BLOG_POPULAR_SLUGS).slice(0, HOME_MOST_READ_COUNT);
  const showcase = bySlugs(posts, PUBLISH_SHOWCASE_SLUGS);

  const resources: HomeResource[] = HOME_FREEBIE_SLUGS.map((slug) =>
    FREEBIE_PRODUCTS.find((item) => item.slug === slug),
  )
    .filter((item): item is (typeof FREEBIE_PRODUCTS)[number] => !!item)
    .map(({ slug, title, description, thumb, imageAlt, category, previewHref }) => ({
      slug,
      title,
      description,
      thumb,
      // getStaticProps can't serialise `undefined`.
      imageAlt: imageAlt ?? title,
      category,
      previewHref,
    }));

  return {
    props: {
      blogPosts,
      feedPosts,
      mostRead,
      showcase,
      resources,
      // The list above already feeds the Learn panel.
      navData: getNavData({ blog: false }),
    },
  };
};

export default function IndexPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return <HomePage {...props} />;
}
