import CategoryPage from "../components/pages/CategoryPage";
import { PRODUCTS } from "../data/products";
import { PAGE_META } from "../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../data/breadcrumbs";
import { PAGE_FAQ } from "../data/faq";

const SLUG = "all";
const products = PRODUCTS;

export default function AllPage() {
  const meta = PAGE_META[SLUG];
  return (
    <CategoryPage
      slug={SLUG}
      title="Figma templates & UI kits"
      description="Design resources, Tutorials, Ideas & Inspiration"
      metaTitle={meta.title}
      metaDescription={meta.description}
      canonical={meta.canonical}
      breadcrumbs={PAGE_BREADCRUMBS[SLUG] ?? []}
      products={products}
      faq={PAGE_FAQ[SLUG] ?? []}
    />
  );
}
