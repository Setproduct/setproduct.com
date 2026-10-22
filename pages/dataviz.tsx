import type { GetStaticProps, InferGetStaticPropsType } from "next";
import CategoryPage from "../components/pages/CategoryPage";
import { PRODUCTS } from "../data/products";
import { PAGE_META } from "../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../data/breadcrumbs";
import { PAGE_FAQ } from "../data/faq";
import { getNavData } from "../lib/nav/buildNavData";
import type { NavData } from "../lib/nav/types";

const SLUG = "dataviz";
const PRODUCT_SLUGS = ["orion", "charts", "hyper-charts"];

const productMap = new Map(PRODUCTS.map((p) => [p.slug, p]));
const products = PRODUCT_SLUGS.map((s) => productMap.get(s)!);

type Props = {
  navData: NavData;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      navData: getNavData(),
    },
  };
};

export default function DatavizPage({ navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  const meta = PAGE_META[SLUG];
  return (
    <CategoryPage
      slug={SLUG}
      title="Charts templates"
      description="Graphs & Infographics for dashboards, presentations, web & mobile applications"
      metaTitle={meta.title}
      metaDescription={meta.description}
      canonical={meta.canonical}
      breadcrumbs={PAGE_BREADCRUMBS[SLUG] ?? []}
      products={products}
      faq={PAGE_FAQ[SLUG] ?? []}
      navData={navData}
    />
  );
}
