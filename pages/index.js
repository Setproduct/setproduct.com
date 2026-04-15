import LegacyPage from "../components/LegacyPage";
import { buildLegacyPageData } from "../lib/legacy-page";

export async function getStaticProps() {
  return {
    props: {
      pageData: buildLegacyPageData("index.html"),
    },
  };
}

export default function HomePage({ pageData }) {
  return <LegacyPage {...pageData} />;
}
