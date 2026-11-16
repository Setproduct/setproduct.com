import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import { PUBLISH_OFFER, getPublishLinkProps } from "../../lib/publish";
import { PUBLISH_SHOWCASE_BADGE, PUBLISH_STEPS } from "../../data/publish-showcase";
import type { NavBlogPost } from "../../lib/nav/types";

type ShowcasePost = Pick<NavBlogPost, "slug" | "title" | "thumbImage">;

type Props = {
  /** Own posts that rank on Google's first page, in display order. */
  showcase: ShowcasePost[];
};

const FACTS = [
  { value: PUBLISH_OFFER.readersPerMonth, label: "readers a month" },
  { value: `DR ${PUBLISH_OFFER.domainRating}`, label: "dofollow links" },
  { value: PUBLISH_OFFER.turnaround, label: "to go live" },
  { value: `$${PUBLISH_OFFER.priceFrom}`, label: "per post, from" },
];

/**
 * Home page offer for paid publishing (publish.setproduct.com).
 * Left: the pitch, facts, steps and the CTA. Right: proof that posts on this
 * blog rank. The proof cards are our own guides only, never paid posts.
 */
export default function HomePublishBand({ showcase }: Props) {
  return (
    <div className="section" data-home-section="publish_band">
      <div className="section-padding top-80 bottom-64">
        <div className="container">
          <div className="home-publish">
            <div className="home-publish-main">
              <p className="blog-publish-card-eyebrow">For founders and marketers</p>
              <div className="spacer-12" />
              <h2 className="heading-style-h2">
                Get your product in front of {PUBLISH_OFFER.readersPerMonth} readers
              </h2>
              <div className="spacer-16" />
              <p className="text-size-large">
                Publish an article about your product on Setproduct. It sits next to our design
                guides, reaches people who build tech products and keeps a dofollow link for good.
              </p>

              <div className="spacer-32" />
              <ul className="home-publish-facts">
                {FACTS.map((fact) => (
                  <li className="home-publish-fact" key={fact.label}>
                    <span className="home-publish-fact-value">{fact.value}</span>
                    <span className="text-size-small">{fact.label}</span>
                  </li>
                ))}
              </ul>

              <div className="spacer-32" />
              <ol className="home-publish-steps">
                {PUBLISH_STEPS.map((step, index) => (
                  <li className="home-publish-step" key={step.title}>
                    <span className="home-publish-step-num" aria-hidden="true">{index + 1}</span>
                    <div>
                      <p className="text-size-medium text-weight-bold">{step.title}</p>
                      <p className="text-size-small">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="spacer-32" />
              <div className="home-publish-actions">
                <a className="button w-inline-block" {...getPublishLinkProps("home_band")}>
                  <div className="text-size-large text-weight-bold">See packages</div>
                  <div className="button-icon w-embed"><ArrowIcon /></div>
                </a>
                <Link className="home-publish-terms text-size-small" href="/legal/terms-of-paid-posts">
                  Read the terms
                </Link>
              </div>
            </div>

            {showcase.length > 0 ? (
              <div className="home-publish-proof">
                <p className="text-size-small text-weight-bold">Our guides that rank on Google</p>
                <div className="spacer-16" />
                <ul className="home-publish-proof-list">
                  {showcase.map((post, index) => (
                    <li key={post.slug} data-home-position={index + 1}>
                      <Link className="home-publish-proof-card hover-lift" href={`/blog/${post.slug}`}>
                        <span className="home-publish-proof-img hover-lift-media">
                          <img alt="" src={post.thumbImage} loading="lazy" decoding="async" />
                        </span>
                        <span className="home-publish-proof-info">
                          <span className="home-publish-badge text-size-tiny text-weight-semibold">
                            {PUBLISH_SHOWCASE_BADGE}
                          </span>
                          <span className="hover-lift-title text-size-medium text-weight-bold text-style-2lines">
                            {post.title}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
