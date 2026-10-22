import type { GetStaticProps, InferGetStaticPropsType } from "next";
import LicensePage from "../../components/pages/LicensePage";
import { getNavData } from "../../lib/nav/buildNavData";
import type { NavData } from "../../lib/nav/types";

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

export default function LicenseRoute({ navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <LicensePage navData={navData} />;
}
