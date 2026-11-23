import ArrowIcon from "../sections/ArrowIcon";
import { PUBLISH_DELEGATE_URL, PUBLISH_OFFER, getPublishLinkProps } from "../../lib/publish";

/**
 * In-article banner for the Delegate plan ("we research the topic and write
 * the post for you"). Written in MDX as `<PublishBanner />`, registered in
 * mdx-components.tsx.
 *
 * Layout: dark row that echoes the Delegate panel on publish.setproduct.com
 * (price on the left, one-line offer, secondary button on the right). On
 * narrow screens it stacks into a column.
 *
 * No <p>, <li> or headings inside: `.rich-text-18 p` and `.rich-text-18 li`
 * carry their own font-size and margins, and a heading would land in the TOC.
 */
export default function PublishBanner() {
  return (
    <aside className="blog-publish-banner" aria-label="Delegate plan">
      <div className="blog-publish-banner-price">
        <span className="blog-publish-banner-price-value">${PUBLISH_OFFER.priceWritten}</span>
        <span className="blog-publish-banner-price-caption">per article</span>
      </div>
      <div className="blog-publish-banner-body">
        <div className="blog-publish-banner-title">We research the topic and write the post for you</div>
        <div className="blog-publish-banner-text">
          Send a brief. The article goes live in {PUBLISH_OFFER.turnaroundDelegate} with{" "}
          {PUBLISH_OFFER.linksDelegate} dofollow links.
        </div>
      </div>
      <a className="button-small secondary w-inline-block" {...getPublishLinkProps("blog_banner", PUBLISH_DELEGATE_URL)}>
        <div className="text-size-medium text-weight-bold">See Delegate</div>
        <div className="button-icon is-small w-embed">
          <ArrowIcon />
        </div>
      </a>
    </aside>
  );
}
