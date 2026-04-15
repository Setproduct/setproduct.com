import LegacyPage from "../../components/LegacyPage";
import { getCollectionPageData } from "../../lib/legacy-collections";

export async function getServerSideProps({ params }) {
  try {
    return {
      props: {
        pageData: getCollectionPageData("freebies", params.slug),
      },
    };
  } catch {
    return { notFound: true };
  }
}

export default function FreebieDetailPage({ pageData }) {
  return <LegacyPage {...pageData} />;
}
