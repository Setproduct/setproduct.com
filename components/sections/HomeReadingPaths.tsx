import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import { UI_COMPONENT_GUIDES } from "../../data/ui-guides";
import type { NavBlogPost } from "../../lib/nav/types";

type Props = {
  /** Most-read posts, already ordered (BLOG_POPULAR_SLUGS). */
  mostRead: Pick<NavBlogPost, "slug" | "title" | "category" | "thumbImage">[];
};

/**
 * Two ways deeper into the blog for people who did not find a reason in the
 * feed: the posts most people come for, and the index of component guides
 * (the largest and best-ranking series, previously invisible from home).
 */
export default function HomeReadingPaths({ mostRead }: Props) {
  return (
    <div className="section">
      <div className="section-padding top-80 bottom-64">
        <div className="container">
          <div className="home-paths">
            {mostRead.length > 0 ? (
              <div className="home-paths-col" data-home-section="most_read">
                <h2 className="heading-style-h3">Most read</h2>
                <div className="spacer-24" />
                <ol className="home-most-read">
                  {mostRead.map((post, index) => (
                    <li key={post.slug} data-home-position={index + 1}>
                      <Link className="home-most-read-row hover-lift" href={`/blog/${post.slug}`}>
                        <span className="home-most-read-num" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="home-most-read-info">
                          <span className="text-size-tiny text-weight-semibold text-color-primary">{post.category}</span>
                          <span className="hover-lift-title text-size-large text-weight-bold text-style-2lines">
                            {post.title}
                          </span>
                        </span>
                        <span className="home-most-read-img hover-lift-media">
                          <img alt="" src={post.thumbImage} loading="lazy" decoding="async" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            <div className="home-paths-col" data-home-section="guides">
              <h2 className="heading-style-h3">UI component guides</h2>
              <div className="spacer-8" />
              <p className="text-size-regular">
                {UI_COMPONENT_GUIDES.length} in-depth guides on anatomy, states and accessibility of the
                components every product needs.
              </p>
              <div className="spacer-24" />
              <ul className="home-guides">
                {UI_COMPONENT_GUIDES.map((guide, index) => (
                  <li key={guide.slug} data-home-position={index + 1}>
                    <Link className="home-guides-link" href={`/blog/${guide.slug}`}>
                      {guide.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="spacer-24" />
              <Link className="button-x-small is-text w-inline-block" href="/ui-guides">
                <div className="text-size-regular text-weight-bold">All UI guides</div>
                <div className="button-icon is-small text-color-primary w-embed"><ArrowIcon /></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
