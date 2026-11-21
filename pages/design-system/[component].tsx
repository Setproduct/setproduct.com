import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { DocsLayout } from "../../design-system/docs/DocsLayout";
import { DOC_PAGES } from "../../design-system/docs/pages";
import { DOC_COMPONENTS, getDocEntry } from "../../design-system/docs/registry";

type Props = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const missing = DOC_COMPONENTS.filter((entry) => !DOC_PAGES[entry.slug]).map((entry) => entry.slug);
  if (missing.length > 0) {
    throw new Error(`Design system: no page body for ${missing.join(", ")} (add it to design-system/docs/pages/index.ts)`);
  }

  return {
    paths: DOC_COMPONENTS.map((entry) => ({ params: { component: entry.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => ({
  props: { slug: String(params?.component) },
});

export default function SystemComponentRoute({ slug }: InferGetStaticPropsType<typeof getStaticProps>) {
  const entry = getDocEntry(slug);
  const Page = DOC_PAGES[slug];
  if (!entry || !Page) return null;

  return (
    <DocsLayout entry={entry}>
      <Page />
    </DocsLayout>
  );
}
