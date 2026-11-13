import { useMemo, useState } from "react";
import Link from "next/link";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import TemplateGrid from "../sections/TemplateGrid";
import BlogPostsHome from "../sections/BlogPostsHome";
import FaqSection from "../sections/FaqSection";
import ArrowIcon from "../sections/ArrowIcon";
import SeoHead from "../seo/SeoHead";
import { PAGE_META } from "../../data/pages-meta";
import { PRODUCTS } from "../../data/products";
import { PAGE_FAQ } from "../../data/faq";
import { HOME_BLOG_CATEGORIES } from "../../data/blog-categories";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "../../lib/seo/schema";
import { getPublishLinkProps } from "../../lib/publish";
import type { NavBlogPost, NavData } from "../../lib/nav/types";

const HOME_TEMPLATES_INITIAL = 15;
const HOME_TEMPLATES_PAGE = 15;


type Props = {
  blogPosts: NavBlogPost[];
  navData?: NavData;
};

export default function HomePage({ blogPosts = [], navData }: Props) {
  const meta = PAGE_META.index;
  const faq = PAGE_FAQ.index ?? [];
  const [templatesVisible, setTemplatesVisible] = useState(HOME_TEMPLATES_INITIAL);

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
        image="/images/og-setproduct-home.jpg"
        imageAlt="Setproduct: Figma templates and UI kits for design systems"
        jsonLd={jsonLd}
        title={meta.title}
      />
      <SiteHeader navData={navData} blogPosts={blogPosts} />
      <main className="mt-18">
        <div className="section">
          <div className="section-padding top-80 bottom-64">
            <div className="container">
              <div className="main_hero-section">
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

              <div className="spacer-40" />

              <BlogPostsHome posts={blogPosts} categories={HOME_BLOG_CATEGORIES} />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-padding top-80 bottom-64">
            <div className="container">
              <div className="heading-center-wr mob-align-left">
                <h2 className="heading-style-h2">Resources for your team</h2>
              </div>
              <div className="spacer-32" />
              <TemplateGrid
                products={PRODUCTS}
                variant="home"
                visibleCount={templatesVisible}
                onLoadMore={() => setTemplatesVisible((c) => c + HOME_TEMPLATES_PAGE)}
              />
            </div>
          </div>
        </div>

        {faq.length > 0 && (
          <FaqSection items={faq} title="Your questions answered" />
        )}
      </main>
      <SiteFooter navData={navData} blogPosts={blogPosts} />
      <ScrollUpButton />
    </>
  );
}
