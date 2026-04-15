import Head from "next/head";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import Breadcrumbs from "../sections/Breadcrumbs";
import HeroSection from "../sections/HeroSection";
import TemplateGrid from "../sections/TemplateGrid";
import { PAGE_META } from "../../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../../data/breadcrumbs";
import { FREEBIE_PRODUCTS } from "../../data/freebies-listing";

export default function FreebiesListingPage() {
  const meta = PAGE_META.freebies;
  const breadcrumbs = PAGE_BREADCRUMBS.freebies ?? [];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <link href={meta.canonical} rel="canonical" />
      </Head>
      <SiteHeader />
      <main>
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        <HeroSection
          title="Free Figma templates"
          description="Discover how Setproduct Figma freebies can help you master component customization, and responsive template development. Duplicate, modify, and use for commercial use."
        />
        <div className="section">
          <div className="container">
            <TemplateGrid products={FREEBIE_PRODUCTS} />
          </div>
        </div>
      </main>
      <SiteFooter />
      <ScrollUpButton />
    </>
  );
}
