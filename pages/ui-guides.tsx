import type { GetStaticProps, InferGetStaticPropsType } from "next";
import UiGuidesPage from "../components/pages/UiGuidesPage";
import { getNavData } from "../lib/nav/buildNavData";
import { getUiGuidesData, type UiGuidesData } from "../lib/ui-guides/load";
import type { NavData } from "../lib/nav/types";

type Props = {
  guides: UiGuidesData;
  navData: NavData;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      guides: getUiGuidesData(),
      navData: getNavData(),
    },
  };
};

export default function UiGuidesRoute({ guides, navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <UiGuidesPage guides={guides} navData={navData} />;
}
