import type { GetStaticProps, InferGetStaticPropsType } from "next";
import BundlePage from "../components/pages/BundlePage";
import { getNavData } from "../lib/nav/buildNavData";
import type { NavData } from "../lib/nav/types";

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

export default function BundleRoute({ navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BundlePage navData={navData} />;
}
