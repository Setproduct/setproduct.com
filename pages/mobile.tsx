import type { GetStaticProps, InferGetStaticPropsType } from "next";
import CategoryPage from "../components/pages/CategoryPage";
import { PRODUCTS } from "../data/products";
import { PAGE_META } from "../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../data/breadcrumbs";
import { PAGE_FAQ } from "../data/faq";
import { getBlogPostPreviews } from "../lib/blog/get-blog-post-previews";
import type { BlogPostPreview } from "../types/data";

const SLUG = "mobile";
const PRODUCT_SLUGS = [
  "nucleus-ui",
  "material-you",
  "rome",
  "material",
  "mobile-x",
  "appka-ios-ui-kit",
  "android-ui-kit",
  "xela-swift",
  "xela-android",
  "xela-flutter",
  "full-ios",
  "ios-ui-kit",
  "s8",
  "most",
];

const productMap = new Map(PRODUCTS.map((p) => [p.slug, p]));
const products = PRODUCT_SLUGS.map((s) => productMap.get(s)!);

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

export default function MobilePage({ blogPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const meta = PAGE_META[SLUG];
  return (
    <CategoryPage
      slug={SLUG}
      title="Mobile app templates"
      description="Native and custom iOS & Android UI kits with frequent app patterns designed for Figma"
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
