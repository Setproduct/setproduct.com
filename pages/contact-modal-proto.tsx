import type { GetStaticProps, InferGetStaticPropsType } from "next";
import ContactModalProtoPage from "../components/pages/ContactModalProtoPage";
import { getNavData } from "../lib/nav/buildNavData";
import type { NavData } from "../lib/nav/types";

type Props = {
  navData: NavData;
};

// Temporary prototype page (noindex, not in sitemap). Remove after the dialog motion ships.
export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      navData: getNavData(),
    },
  };
};

export default function ContactModalProtoRoute({ navData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <ContactModalProtoPage navData={navData} />;
}
