import type { GetStaticProps, InferGetStaticPropsType } from "next";
import TestimonialsPage from "../components/pages/TestimonialsPage";
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

export default function TestimonialsRoute({ navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <TestimonialsPage navData={navData} />;
}
