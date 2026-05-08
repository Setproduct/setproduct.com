import type { GetStaticPaths, GetStaticProps } from "next";
import FreebieDetailPage from "../../components/pages/FreebieDetailPage";
import { FREEBIE_PRODUCTS } from "../../data/freebies-listing";
import { getBlogPostPreviews } from "../../lib/blog/get-blog-post-previews";
import type { BlogPostPreview, FreebieItem } from "../../types/data";

type PageProps = {
  item: FreebieItem;
  blogPosts: BlogPostPreview[];
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

  return { props: { item, blogPosts: getBlogPostPreviews() } };
};

export default function FreebieDetailRoute({ item, blogPosts }: PageProps) {
  return <FreebieDetailPage item={item} blogPosts={blogPosts} />;
}
