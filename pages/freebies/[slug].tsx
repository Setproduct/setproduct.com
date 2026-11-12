import type { GetStaticPaths, GetStaticProps } from "next";
import FreebieDetailPage from "../../components/pages/FreebieDetailPage";
import { FREEBIE_PRODUCTS } from "../../data/freebies-listing";
import { getBlogPostsMetaBySlugs, toBlogPostCard } from "../../lib/blog/mdx";
import { getNavData } from "../../lib/nav/buildNavData";
import type { NavData } from "../../lib/nav/types";
import type { BlogPostMeta } from "../../types/blog";
import type { FreebieItem } from "../../types/data";

type PageProps = {
  item: FreebieItem;
  navData: NavData;
  relatedPosts: BlogPostMeta[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: FREEBIE_PRODUCTS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const item = FREEBIE_PRODUCTS.find((p) => p.slug === params?.slug);

  if (!item) return { notFound: true };

  // Only the cards' fields go to the client, so the page payload stays small.
  const relatedPosts = getBlogPostsMetaBySlugs(item.relatedPosts ?? [])
    .slice(0, 3)
    .map(toBlogPostCard);

  return { props: { item, navData: getNavData(), relatedPosts } };
};

export default function FreebieDetailRoute({ item, navData, relatedPosts }: PageProps) {
  return <FreebieDetailPage item={item} navData={navData} relatedPosts={relatedPosts} />;
}
