import LegacyPage from "../../components/LegacyPage";
import { getCollectionPageData, getCollectionSlugs } from "../../lib/legacy-collections";

export async function getStaticPaths() {
  const slugs = getCollectionSlugs("templates");

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      pageData: getCollectionPageData("templates", params.slug),
    },
  };
}

export default function TemplateDetailPage({ pageData }) {
  return <LegacyPage {...pageData} />;
}
