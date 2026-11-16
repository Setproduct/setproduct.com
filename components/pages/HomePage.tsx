import { useMemo } from "react";
import Link from "next/link";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import TemplateGrid from "../sections/TemplateGrid";
import BlogPostsHome from "../sections/BlogPostsHome";
import FaqSection from "../sections/FaqSection";
import HomePublishBand from "../sections/HomePublishBand";
import HomeReadingPaths from "../sections/HomeReadingPaths";
import HomeResources from "../sections/HomeResources";
import ArrowIcon from "../sections/ArrowIcon";
import SeoHead from "../seo/SeoHead";
import { PAGE_META } from "../../data/pages-meta";
import { PRODUCTS } from "../../data/products";
import { PAGE_FAQ } from "../../data/faq";
import { HOME_KITS_COUNT } from "../../data/home";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "../../lib/seo/schema";
import { getPublishLinkProps } from "../../lib/publish";
import { handleHomeAuxClick, handleHomeClick, useHomeSectionViews } from "../../lib/home/analytics";
import type { NavBlogPost, NavData } from "../../lib/nav/types";
import type { FreebieItem } from "../../types/data";

export type HomeResource = Pick<
  FreebieItem,
  "slug" | "title" | "description" | "thumb" | "imageAlt" | "category" | "previewHref"
>;

type Props = {
  /** Mega-menu Magazine panel and footer Popular reads. */
  blogPosts: NavBlogPost[];
  feedPosts: NavBlogPost[];
  mostRead: NavBlogPost[];
  showcase: NavBlogPost[];
  resources: HomeResource[];
  navData?: NavData;
};

export default function HomePage({
  blogPosts = [],
  feedPosts = [],
  mostRead = [],
  showcase = [],
  resources = [],
  navData,
}: Props) {
  const meta = PAGE_META.index;
  const faq = PAGE_FAQ.index ?? [];
  useHomeSectionViews();

  // Organization and WebSite describe the whole site, so they belong to the
  // home page only; every other URL gets its own local schema instead.
  const jsonLd = useMemo(
    () => [buildOrganizationJsonLd(), buildWebSiteJsonLd()],
    [],
  );

  return (
    <>
      <SeoHead
        canonical={meta.canonical}
        description={meta.description}
        image="/images/og-setproduct-default.jpg"
        imageAlt="Setproduct: Figma templates and UI kits for design systems"
        jsonLd={jsonLd}
        title={meta.title}
      />
      <SiteHeader navData={navData} blogPosts={blogPosts} />
      <main className="mt-18" onClick={handleHomeClick} onAuxClick={handleHomeAuxClick}>
        <div className="section">
          <div className="section-padding top-80 bottom-64">
            <div className="container">
              <div className="main_hero-section" data-home-section="hero">
                <div className="heading-center-wr">
                  <div className="max-width-900">
                    <h1 className="heading-style-h1">
                      Notes from the people <span className="span-gradient">building and growing</span> tech companies
                    </h1>
                  </div>
                  <div className="max-width-800">
                    <div className="heading-style-h5">
                      Practical writing on startups, AI, growth, careers and design.
                      <br />
                      An independent magazine, trusted by 17,000 readers a month.
                    </div>
                  </div>
                  <div className="spacer-16" />
                  <div className="hero-cta-row">
                    <Link className="button w-inline-block" href="/blog">
                      <div className="text-size-large text-weight-bold">Read the latest</div>
                    </Link>
                    <a
                      className="button secondary w-inline-block"
                      {...getPublishLinkProps("home_hero")}
                    >
                      <div className="text-size-large text-weight-bold">Publish with us</div>
                      <div className="button-icon w-embed"><ArrowIcon /></div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="spacer-24" />

              <div data-home-section="feed">
                <BlogPostsHome posts={feedPosts} />
              </div>
            </div>
          </div>
        </div>

        <HomePublishBand showcase={showcase} />

        <HomeReadingPaths mostRead={mostRead} />

        <HomeResources items={resources} />

        <div className="section" data-home-section="kits">
          <div className="section-padding top-80 bottom-64">
            <div className="container">
              <div className="home-section-head">
                <div>
                  <h2 className="heading-style-h2">Design kits</h2>
                  <div className="spacer-8" />
                  <p className="text-size-large">
                    {PRODUCTS.length} Figma UI kits and design systems, from dashboards to mobile apps.
                  </p>
                </div>
                <Link className="button secondary w-inline-block" href="/all">
                  <div className="text-size-large text-weight-bold">See all kits</div>
                  <div className="button-icon w-embed"><ArrowIcon /></div>
                </Link>
              </div>
              <div className="spacer-32" />
              <TemplateGrid products={PRODUCTS} variant="home" visibleCount={HOME_KITS_COUNT} />
            </div>
          </div>
        </div>

        {faq.length > 0 && (
          <div data-home-section="faq">
            <FaqSection items={faq} title="Your questions answered" />
          </div>
        )}
      </main>
      {/* The home page has its own publishing band, so the footer one is hidden. */}
      <SiteFooter navData={navData} blogPosts={blogPosts} hidePublish />
      <ScrollUpButton />
    </>
  );
}
