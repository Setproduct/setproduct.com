import type { GetStaticProps, InferGetStaticPropsType } from "next";
import PrivacyPolicyPage from "../../components/pages/PrivacyPolicyPage";
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

export default function PrivacyPolicyRoute({ navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PrivacyPolicyPage navData={navData} />;
}
