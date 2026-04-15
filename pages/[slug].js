import LegacyPage from "../components/LegacyPage";
import { getRootPageData } from "../lib/legacy-collections";

export async function getServerSideProps({ params }) {
  try {
    return {
      props: {
        pageData: getRootPageData(params.slug),
      },
    };
  } catch {
    return { notFound: true };
  }
}

export default function StaticLegacyPage({ pageData }) {
  return <LegacyPage {...pageData} />;
}
