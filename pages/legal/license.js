import LegacyPage from "../../components/LegacyPage";
import { buildLegacyPageData } from "../../lib/legacy-page";

export async function getStaticProps() {
  return {
    props: {
      pageData: buildLegacyPageData("legal/license.html"),
    },
  };
}

export default function LicensePage({ pageData }) {
  return <LegacyPage {...pageData} />;
}
