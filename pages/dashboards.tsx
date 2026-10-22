import type { GetStaticProps, InferGetStaticPropsType } from "next";
import DashboardsPage from "../components/pages/DashboardsPage";
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

export default function DashboardsRoute({ navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <DashboardsPage navData={navData} />;
}
