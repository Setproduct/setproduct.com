import type { GetStaticPaths, GetStaticProps } from "next";
import FreebieDetailPage from "../../components/pages/FreebieDetailPage";
import { FREEBIE_PRODUCTS } from "../../data/freebies-listing";
import { getNavData } from "../../lib/nav/buildNavData";
import type { NavData } from "../../lib/nav/types";
import type { FreebieItem } from "../../types/data";

type PageProps = {
  item: FreebieItem;
  navData: NavData;
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

  return { props: { item, navData: getNavData() } };
};

export default function FreebieDetailRoute({ item, navData }: PageProps) {
  return <FreebieDetailPage item={item} navData={navData} />;
}
