import type { GetServerSideProps } from "next";
import FreebieDetailPage from "../../components/pages/FreebieDetailPage";
import { FREEBIE_PRODUCTS } from "../../data/freebies-listing";
import type { FreebieItem } from "../../types/data";

type PageProps = {
  item: FreebieItem;
};

type SlugParams = {
  slug: string;
};

export const getServerSideProps: GetServerSideProps<PageProps, SlugParams> = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }

  const item = FREEBIE_PRODUCTS.find((product) => product.slug === params.slug);

  if (!item) {
    return { notFound: true };
  }

  return {
    props: { item },
  };
};

export default function FreebieDetailRoute({ item }: PageProps) {
  return <FreebieDetailPage item={item} />;
}
