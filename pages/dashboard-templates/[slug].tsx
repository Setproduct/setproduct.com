import type { GetStaticPaths, GetStaticProps } from "next";
import DashboardTemplatePage from "../../components/pages/DashboardTemplatePage";
import { getBlogPostPreviews } from "../../lib/blog/get-blog-post-previews";
import {
  DASHBOARD_TEMPLATES,
  getDashboardTemplateBySlug,
} from "../../data/dashboard-templates";
import type { DashboardTemplatePageData } from "../../data/dashboard-templates";
import { PRODUCTS } from "../../data/products";
import type { BlogPostPreview, Product } from "../../types/data";

type PageProps = {
  data: DashboardTemplatePageData;
  products: Product[];
  blogPosts: BlogPostPreview[];
};

type SlugParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<SlugParams> = async () => ({
  paths: DASHBOARD_TEMPLATES.map((d) => ({ params: { slug: d.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PageProps, SlugParams> = async ({ params }) => {
  const slug = params?.slug;
  if (!slug) return { notFound: true };

  const data = getDashboardTemplateBySlug(slug);
  if (!data) return { notFound: true };

  const products = PRODUCTS.filter((p) => p.categories.includes("dashboards"));
  const blogPosts = getBlogPostPreviews();

  return { props: { data, products, blogPosts } };
};

export default function DashboardTemplateRoute({ data, products, blogPosts }: PageProps) {
  return <DashboardTemplatePage data={data} products={products} blogPosts={blogPosts} />;
}
