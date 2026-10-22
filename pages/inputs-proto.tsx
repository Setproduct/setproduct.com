import type { GetStaticProps, InferGetStaticPropsType } from "next";
import InputsProtoPage from "../components/pages/InputsProtoPage";
import { getNavData } from "../lib/nav/buildNavData";
import type { NavData } from "../lib/nav/types";

type Props = {
  navData: NavData;
};

// Temporary prototype page (noindex, not in sitemap). Remove after the input styles ship.
export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      navData: getNavData(),
    },
  };
};

export default function InputsProtoRoute({ navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <InputsProtoPage navData={navData} />;
}
