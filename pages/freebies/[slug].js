import LegacyPage from "../../components/LegacyPage";
import { getCollectionPageData, getCollectionSlugs } from "../../lib/legacy-collections";

export async function getStaticPaths() {
  const slugs = getCollectionSlugs("freebies");

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      pageData: getCollectionPageData("freebies", params.slug),
    },
  };
}

export default function FreebieDetailPage({ pageData }) {
  return <LegacyPage {...pageData} />;
}
