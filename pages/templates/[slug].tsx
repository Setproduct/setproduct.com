import type { GetStaticPaths, GetStaticProps } from "next";
import TemplateDetailPage from "../../components/pages/TemplateDetailPage";
import ChartsTemplatePage from "../../components/pages/templates/ChartsTemplatePage";
import { TEMPLATE_PRODUCTS } from "../../data/templates-listing";
import type { TemplateItem } from "../../types/data";

type PageProps = {
  item: TemplateItem;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: TEMPLATE_PRODUCTS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const item = TEMPLATE_PRODUCTS.find((p) => p.slug === params?.slug);

  if (!item) return { notFound: true };

  return { props: { item } };
};

export default function TemplateDetailRoute({ item }: PageProps) {
  if (item.slug === "charts") {
    return <ChartsTemplatePage item={item} />;
  }
  return <TemplateDetailPage item={item} />;
}
