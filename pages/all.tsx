import type { GetStaticProps, InferGetStaticPropsType } from "next";
import CategoryPage from "../components/pages/CategoryPage";
import { PRODUCTS } from "../data/products";
import { PAGE_META } from "../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../data/breadcrumbs";
import { PAGE_FAQ } from "../data/faq";
import { getBlogPostPreviews } from "../lib/blog/get-blog-post-previews";
import type { BlogPostPreview } from "../types/data";

const SLUG = "all";
const products = PRODUCTS;

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

export default function AllPage({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const meta = PAGE_META[SLUG];
  return (
    <CategoryPage
      slug={SLUG}
      title="Figma templates & UI kits"
      description="Design resources, Tutorials, Ideas & Inspiration"
      metaTitle={meta.title}
      metaDescription={meta.description}
      canonical={meta.canonical}
      breadcrumbs={PAGE_BREADCRUMBS[SLUG] ?? []}
      products={products}
      faq={PAGE_FAQ[SLUG] ?? []}
      blogPosts={blogPosts}
    />
  );
}
