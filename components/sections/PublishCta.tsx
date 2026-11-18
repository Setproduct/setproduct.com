"use client";

import ArrowIcon from "./ArrowIcon";
import { useContactModal } from "../modals/ContactModalContext";
import { PUBLISH_OFFER, getPublishLinkProps, type PublishLocation } from "../../lib/publish";
import type { ContactLocation } from "../../lib/contact";

type Props = {
  /** Placement tag for publish_cta_click and the portal UTM. */
  publishLocation: PublishLocation;
  /** Placement tag for contact_cta_click when the reader asks a question. */
  contactLocation: ContactLocation;
  /** Light purple band on template pages, plain section elsewhere. */
  tinted?: boolean;
  /**
   * Kit title on a product page. When set, "Ask a question" opens the modal on
   * the product topic with this kit preselected, so the reader does not have to
   * pick it again. Omit on listing or testimonials pages, where the question is
   * about publishing rather than one kit.
   */
  product?: string;
};

/**
 * Closing CTA band for template, dashboard and testimonials pages.
 * Replaced the old "hire us" band: custom work is off the table,
 * the paid publishing offer is what the site sells to businesses now.
 */
export default function PublishCta({ publishLocation, contactLocation, tinted = true, product }: Props) {
  const { openContactModal } = useContactModal();

  return (
    <div className={`section${tinted ? " background-color-light-primary" : ""}`}>
      <div className="section-padding top-80 bottom-80">
        <div className="container">
          <div className="main_cta-section">
            <div className="main_cta-active">
              <div className="heading-center-wr lets-connect">
                <h2 className="heading-style-h2">
                  Put your product in front of {PUBLISH_OFFER.readersPerMonth} readers
                </h2>
                <div className="heading-style-h5 mob-18">
                  Publish a guest post with a dofollow link on a blog with domain rating{" "}
                  {PUBLISH_OFFER.domainRating}. It goes live within {PUBLISH_OFFER.turnaround}, from $
                  {PUBLISH_OFFER.priceFrom}.
                </div>
              </div>
              <div className="btn-link-align-center">
                <div className="buttons-row flex-wrap justify-center [row-gap:calc(12*var(--em-px))]">
                  <a className="button w-inline-block" {...getPublishLinkProps(publishLocation)}>
                    <div className="text-size-large text-weight-bold">Publish a post</div>
                    <div className="button-icon w-embed">
                      <ArrowIcon />
                    </div>
                  </a>
                  <button
                    className="button secondary w-inline-block"
                    onClick={() =>
                      openContactModal(contactLocation, product ? { topic: "product", product } : undefined)
                    }
                    type="button"
                  >
                    <div className="text-size-large text-weight-bold">Ask a question</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
