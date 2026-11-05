import type { InlineCta } from "../../types/blog";
import { PUBLISH_OFFER, getPublishLinkProps, isPublishHref } from "../../lib/publish";

type BlogInlineCtaProps = {
  cta: InlineCta;
};

/**
 * Default bottom CTA for posts in founder/marketer categories that have no
 * inlineCta of their own (see isPublishAudienceCategory in lib/publish.ts).
 */
export const DEFAULT_PUBLISH_CTA: InlineCta = {
  title: `Put your product in front of ${PUBLISH_OFFER.readersPerMonth} readers`,
  description: `Publish a story on Setproduct within ${PUBLISH_OFFER.turnaround}, with a dofollow link to your site. From $${PUBLISH_OFFER.priceFrom}.`,
  buttonText: "See packages",
  buttonLink: "https://publish.setproduct.com/",
};

export default function BlogInlineCta({ cta }: BlogInlineCtaProps) {
  // Links to the publishing portal get UTM tags and the GA4 location, so the
  // bottom-of-post CTA is measured the same way as the header button.
  const linkProps = isPublishHref(cta.buttonLink)
    ? getPublishLinkProps("blog_inline")
    : { href: cta.buttonLink, target: "_blank", rel: "noopener noreferrer" };

  return (
    <div className="section background-color-light-primary">
      <div className="section-padding top-80 bottom-80">
        <div className="container">
          <div className="main_cta-section">
            <div className="main_cta-active">
              <div className="heading-center-wr lets-connect is-bigger">
                <h2 className="heading-style-h2">{cta.title}</h2>
                <div className="heading-style-h5 mob-18">{cta.description}</div>
              </div>
              <div className="btn-link-align-center">
                <a className="button w-inline-block" {...linkProps}>
                  <div className="text-size-large text-weight-bold">{cta.buttonText}</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
