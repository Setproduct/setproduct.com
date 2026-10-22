import type { GetStaticProps, InferGetStaticPropsType } from "next";
import TermsOfPaidPostsPage from "../../components/pages/TermsOfPaidPostsPage";
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

export default function TermsOfPaidPostsRoute({ navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <TermsOfPaidPostsPage navData={navData} />;
}
