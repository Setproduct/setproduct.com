import Head from "next/head";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import Breadcrumbs from "../sections/Breadcrumbs";
import TemplateShowcase from "../sections/TemplateShowcase";
import { PAGE_META } from "../../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../../data/breadcrumbs";

const SLUG = "search";

export default function SearchPage() {
  const meta = PAGE_META[SLUG];
  const breadcrumbs = PAGE_BREADCRUMBS[SLUG] ?? [];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <meta content="noindex" name="robots" />
        <meta content={meta.title} property="og:title" />
        <meta content={meta.title} property="twitter:title" />
        <link href={meta.canonical} rel="canonical" />
      </Head>
      <SiteHeader />
      <main className="mt-22.5">
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        <div className="section">
          <div className="section-padding top-80 bottom-80">
            <div className="container">
              <div className="freebies_rich-text-component">
                <h1 className="heading-style-h1">Search results</h1>
                <div className="spacer-40" />
                <form action="/search" className="search w-form">
                  <input
                    className="text-input is-nav-search is-page-search w-input"
                    id="search"
                    maxLength={256}
                    name="query"
                    placeholder="Search…"
                    required
                    type="search"
                  />
                  <input className="hide w-button" type="submit" value="Search" />
                  <div className="search-icon-wr">
                    <img
                      alt=""
                      className="search-icon"
                      loading="lazy"
                      src="/images/search.svg"
                    />
                  </div>
                </form>
                <div className="spacer-40" />
                <div>
                  <div>
                    <div className="text-size-regular is-mob-14">No matching results.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TemplateShowcase />
      </main>
      <SiteFooter />
      <ScrollUpButton />
    </>
  );
}
