import type { GetStaticProps, InferGetStaticPropsType } from "next";
import PushButtonsProtoPage from "../components/pages/PushButtonsProtoPage";
import { getNavData } from "../lib/nav/buildNavData";
import type { NavData } from "../lib/nav/types";

type Props = {
  navData: NavData;
};

// Temporary prototype page (noindex, not in sitemap). Remove after push buttons ship.
export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      navData: getNavData(),
    },
  };
};

export default function PushButtonsProtoRoute({ navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PushButtonsProtoPage navData={navData} />;
}
