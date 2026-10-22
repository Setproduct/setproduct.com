import type { GetStaticProps, InferGetStaticPropsType } from "next";
import FreebiesListingPage from "../components/pages/FreebiesListingPage";
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

export default function FreebiesRoute({ navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <FreebiesListingPage navData={navData} />;
}
