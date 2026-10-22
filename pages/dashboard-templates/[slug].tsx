import type { GetStaticPaths, GetStaticProps } from "next";
import DashboardTemplatePage from "../../components/pages/DashboardTemplatePage";
import { getNavData } from "../../lib/nav/buildNavData";
import type { NavData } from "../../lib/nav/types";
import {
  DASHBOARD_TEMPLATES,
  getDashboardTemplateBySlug,
} from "../../data/dashboard-templates";
import type { DashboardTemplatePageData } from "../../data/dashboard-templates";
import { PRODUCTS } from "../../data/products";
import type { Product } from "../../types/data";

type PageProps = {
  data: DashboardTemplatePageData;
  products: Product[];
  navData: NavData;
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
  const navData = getNavData();

  return { props: { data, products, navData } };
};

export default function DashboardTemplateRoute({ data, products, navData }: PageProps) {
  return <DashboardTemplatePage data={data} products={products} navData={navData} />;
}
