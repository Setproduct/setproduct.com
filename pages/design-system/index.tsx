import type { GetStaticProps } from "next";
import { DocsLayout } from "../../design-system/docs/DocsLayout";
import { OverviewDoc } from "../../design-system/docs/pages";
import { isDesignSystemPublished } from "../../lib/designSystemAccess";

// Setproduct Design System, overview. noindex and out of the sitemap until the
// public release (see plans/design-system-route-chips-badges-2026-11.md).
// A 404 on the live site until DESIGN_SYSTEM_PUBLIC=true (see lib/designSystemAccess.ts).
export const getStaticProps: GetStaticProps = async () =>
  isDesignSystemPublished() ? { props: {} } : { notFound: true };

export default function SystemOverviewRoute() {
  return (
    <DocsLayout entry={null}>
      <OverviewDoc />
    </DocsLayout>
  );
}
