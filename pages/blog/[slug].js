import LegacyPage from "../../components/LegacyPage";
import { getCollectionPageData, getCollectionSlugs } from "../../lib/legacy-collections";

export async function getStaticPaths() {
  const slugs = getCollectionSlugs("blog");

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      pageData: getCollectionPageData("blog", params.slug),
    },
  };
}

export default function BlogArticlePage({ pageData }) {
  return <LegacyPage {...pageData} />;
}
