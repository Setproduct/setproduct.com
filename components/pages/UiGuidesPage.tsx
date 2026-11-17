import Link from "next/link";
import ArrowIcon from "../sections/ArrowIcon";
import SeoHead from "../seo/SeoHead";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import Breadcrumbs from "../sections/Breadcrumbs";
import CtaSubscribe from "../sections/CtaSubscribe";
import { PAGE_META } from "../../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../../data/breadcrumbs";
import { UI_GUIDES } from "../../data/ui-guides";
import { buildUiGuidesJsonLd } from "../../lib/blog/schema";
import type { UiGuidesData } from "../../lib/ui-guides/load";
import type { NavData } from "../../lib/nav/types";
import styles from "./UiGuidesPage.module.css";

type Props = {
  guides: UiGuidesData;
  navData?: NavData;
};

/**
 * Hub for the component and style guides: /ui-guides. It is the landing spot
 * of the navbar item, so the page has to answer "which guide do I need" in one
 * screen. Three lead guides get cards, the rest is a scannable text index
 * grouped by what the component does, with a jump row at the top.
 */
export default function UiGuidesPage({ guides, navData }: Props) {
  const meta = PAGE_META["ui-guides"];
  const breadcrumbs = PAGE_BREADCRUMBS["ui-guides"] ?? [];
  const total = UI_GUIDES.length;

  return (
    <>
      <SeoHead
        canonical={meta.canonical}
        description={meta.description}
        imageAlt="UI design guides by Setproduct"
        jsonLd={[buildUiGuidesJsonLd(meta.canonical, guides)]}
        title={meta.title}
      />
      <SiteHeader navData={navData} />
      <main className="mt-22.5">
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        <div className="section">
          <div className="section-padding top-80 bottom-80">
            <div className="container">
              <div className="blog_hero-section">
                <div className="heading-left-text-wr max-width-900">
                  <h1 className="heading-style-h1 is-smaller-on-mob">UI design guides</h1>
                  <div className="heading-style-h5">
                    Anatomy, states and accessibility notes for the components and styles product teams keep
                    rebuilding, with real product examples.
                  </div>
                </div>
              </div>

              <div className="spacer-40" />
              <nav className="ui-guides-jump" aria-label="Guide groups">
                {guides.groups.map((group) => (
                  <a className="home-guides-link" href={`#${group.key}`} key={group.key}>
                    {group.title}
                  </a>
                ))}
              </nav>

              <div className="spacer-64" />

              <div data-home-section="ui-guides-start-here">
                <h2 className="heading-style-h3">Start here</h2>
                <div className="spacer-8" />
                <p className="text-size-regular">
                  The three guides readers open most often. Each one covers a component that appears on
                  almost every product screen.
                </p>
                <div className="spacer-32" />
                {/* Same card as the home feed: bordered shell, guide pill,
                    title, description, "Read more" and the cover pinned below
                    the text. See UiGuidesPage.module.css for the layout. */}
                <div className={styles.startHere}>
                  {guides.startHere.map((guide, index) => (
                    <div
                      className="main_blog-liist2-item w-dyn-item hover-lift is-large"
                      data-home-position={index + 1}
                      key={guide.slug}
                      role="listitem"
                    >
                      <div className="main_blog-liist2-item-wr hover-lift-media">
                        <div className="main_blog-liist2-item-info">
                          <div className="category-tag">
                            <p className="text-size-tiny text-weight-semibold">{guide.label}</p>
                          </div>
                          <Link className="w-inline-block" href={`/blog/${guide.slug}`}>
                            <p className="hover-lift-title heading-style-h5 text-color-dark-primary text-style-3lines">
                              {guide.title}
                            </p>
                          </Link>
                          <p className="text-size-small text-style-3lines">{guide.description}</p>
                          <div className="main_blog-liist-item-btn-wr">
                            <Link className="button-x-small is-text w-inline-block" href={`/blog/${guide.slug}`}>
                              <div className="text-size-regular text-weight-bold">Read more</div>
                              <div className="button-icon is-small text-color-primary w-embed">
                                <ArrowIcon />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <Link
                          aria-hidden="true"
                          className="main_blog-liist2-item-img-wr w-inline-block relative overflow-hidden"
                          href={`/blog/${guide.slug}`}
                          tabIndex={-1}
                        >
                          <img
                            alt=""
                            className="image-cover"
                            decoding="async"
                            loading={index === 0 ? "eager" : "lazy"}
                            src={guide.thumbImage}
                          />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="spacer-80" />

              <div>
                <h2 className="heading-style-h2">All {total} guides</h2>
                <div className="spacer-8" />
                <p className="text-size-regular">
                  Grouped by what the component does, alphabetical inside each group.
                </p>
                <div className="spacer-40" />

                {guides.groups.map((group) => (
                  <section className="ui-guides-group" id={group.key} key={group.key}>
                    <h3 className="heading-style-h3 ui-guides-group-head">
                      {group.title}
                      <span className="ui-guides-count">{group.guides.length}</span>
                    </h3>
                    <div className="spacer-16" />
                    <ul className="ui-guides-list">
                      {group.guides.map((guide) => (
                        <li key={guide.slug}>
                          <Link className="ui-guides-row" href={`/blog/${guide.slug}`}>
                            <span className="ui-guides-row-label">{guide.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <div className="spacer-48" />
              <p className="text-size-regular">
                Looking for a post that is not about a component?{" "}
                <Link className="text-color-primary text-weight-bold" href="/blog">
                  Browse every article
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        <CtaSubscribe />
      </main>
      <SiteFooter navData={navData} hideSubscribe />
      <ScrollUpButton />
    </>
  );
}
