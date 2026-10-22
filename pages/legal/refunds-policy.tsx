import type { GetStaticProps, InferGetStaticPropsType } from "next";
import RefundsPolicyPage from "../../components/pages/RefundsPolicyPage";
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

export default function RefundsPolicyRoute({ navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <RefundsPolicyPage navData={navData} />;
}
