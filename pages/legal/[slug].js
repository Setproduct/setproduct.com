import LegacyPage from "../../components/LegacyPage";
import { buildLegacyPageData } from "../../lib/legacy-page";

const LEGAL_PAGE_BY_SLUG = {
  license: "license.html",
  "refunds-policy": "refunds-policy.html",
  "terms-of-paid-posts": "terms-of-paid-posts.html",
};

export async function getServerSideProps({ params }) {
  const filename = LEGAL_PAGE_BY_SLUG[params.slug];

  if (!filename) {
    return { notFound: true };
  }

  try {
    return {
      props: {
        pageData: buildLegacyPageData(`legal/${filename}`),
      },
    };
  } catch {
    return { notFound: true };
  }
}

export default function LegalLegacyPage({ pageData }) {
  return <LegacyPage {...pageData} />;
}
