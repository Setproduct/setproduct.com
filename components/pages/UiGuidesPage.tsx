import Link from "next/link";
import Image from "next/image";
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
                <div className="blog_list">
                  {guides.startHere.map((guide, index) => (
                    <div className="blog_list-item w-dyn-item hover-lift is-large" key={guide.slug}>
                      <div className="blog_list-item-wr hover-lift-media">
                        <Link
                          className="blog_list-item-img-wr w-inline-block relative overflow-hidden"
                          href={`/blog/${guide.slug}`}
                        >
                          <Image
                            alt={`${guide.title} cover`}
                            className="image-cover"
                            fill
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            src={guide.image}
                          />
                        </Link>
                        <div className="blog_list-item-info">
                          <div className="main_blog-liist1-item-info-row">
                            <div className="category-tag">
                              <p className="text-size-tiny text-weight-semibold">{guide.label}</p>
                            </div>
                          </div>
                          <Link className="blog_liist-item-heading-wr w-inline-block" href={`/blog/${guide.slug}`}>
                            <p className="hover-lift-title heading-style-h5 text-style-2lines">{guide.title}</p>
                          </Link>
                          <p className="text-size-small text-style-3lines">{guide.description}</p>
                          <div className="main_blog-liist-item-btn-wr">
                            <Link className="button-x-small is-text w-inline-block" href={`/blog/${guide.slug}`}>
                              <div className="text-size-regular text-weight-bold">Read the guide</div>
                              <div className="button-icon is-small text-color-primary w-embed">
                                <ArrowIcon />
                              </div>
                            </Link>
                          </div>
                        </div>
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
