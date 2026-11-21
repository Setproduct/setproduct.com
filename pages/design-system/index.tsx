import { DocsLayout } from "../../design-system/docs/DocsLayout";
import { OverviewDoc } from "../../design-system/docs/pages";

// Setproduct Design System, overview. noindex and out of the sitemap until the
// public release (see plans/design-system-route-chips-badges-2026-11.md).
export default function SystemOverviewRoute() {
  return (
    <DocsLayout entry={null}>
      <OverviewDoc />
    </DocsLayout>
  );
}
