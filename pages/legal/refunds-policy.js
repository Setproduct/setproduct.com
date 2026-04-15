import LegacyPage from "../../components/LegacyPage";
import { buildLegacyPageData } from "../../lib/legacy-page";

export async function getStaticProps() {
  return {
    props: {
      pageData: buildLegacyPageData("legal/refunds-policy.html"),
    },
  };
}

export default function RefundsPolicyPage({ pageData }) {
  return <LegacyPage {...pageData} />;
}
