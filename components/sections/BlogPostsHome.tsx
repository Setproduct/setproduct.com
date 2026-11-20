import Link from "next/link";
import { NAV_BLOG_CATEGORIES, NAV_BLOG_LATEST } from "../layout/nav/navConfig";
import type { NavBlogPost } from "../../lib/nav/types";
import ArrowIcon from "./ArrowIcon";
import styles from "./BlogPostsHome.module.css";

type Props = {
  /** Feed posts in display order (pinned first, then newest). */
  posts: NavBlogPost[];
};

// Same topics as the Magazine menu and the footer, so the three never disagree.
const TOPIC_LINKS = NAV_BLOG_CATEGORIES.filter(
  (item) => item.category !== null && item.category !== NAV_BLOG_LATEST,
).map((item) => ({
  href: `/blog?category=${encodeURIComponent(item.category as string)}`,
  label: item.label,
}));

export default function BlogPostsHome({ posts }: Props) {
  return (
    <div className={`main_blog-liist2-section ${styles.homeBlogSection}`}>
      <div className="heading-center-wr mob-align-left">
        <h2 className="heading-style-h2">Fresh from the magazine</h2>
      </div>

      <div className="main_blog-liist2-form w-form">
        {/* Topic chips open the filtered blog listing: a filter that only
            reshuffled the home feed kept people on this page instead of
            taking them deeper. prefetch={false}: every ?category= URL is a
            separate prefetch of the same 26 KB blog.json, eight at load. */}
        <nav aria-label="Blog topics" className="main_blog-liist2-filters-wr">
          <div className="main_blog-liist2-wr2 w-dyn-list">
            <ul className={`main_blog-liist2-2 w-dyn-items ${styles.topicList}`}>
              <li className="w-dyn-item">
                <Link className="button-x-small is-text is-active fs-cmsfilter_active" href="/blog" prefetch={false}>
                  <span className="text-size-small text-weight-bold">All posts</span>
                </Link>
              </li>
              {TOPIC_LINKS.map((topic) => (
                <li key={topic.href} className="w-dyn-item">
                  <Link className="button-x-small is-text is-main-blog-filter" href={topic.href} prefetch={false}>
                    <span className="text-size-small text-weight-bold">{topic.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="main_blog-liist2-wr w-dyn-list">
          <div className="main_blog-liist2 w-dyn-items" role="list">
            {posts.map((post, index) => (
              <div
                key={post.slug}
                className="main_blog-liist2-item w-dyn-item hover-lift is-large"
                data-home-position={index + 1}
                role="listitem"
              >
                <div className="main_blog-liist2-item-wr hover-lift-media">
                  <div className="main_blog-liist2-item-info">
                    <div className="category-tag">
                      <p className="text-size-tiny text-weight-semibold">{post.category}</p>
                    </div>
                    <Link className="w-inline-block" href={`/blog/${post.slug}`}>
                      <p className="hover-lift-title heading-style-h5 text-color-dark-primary text-style-3lines">{post.title}</p>
                    </Link>
                    <p className="text-size-small text-style-2lines">{post.description}</p>
                    <div className="main_blog-liist-item-btn-wr">
                      <Link className="button-x-small is-text w-inline-block" href={`/blog/${post.slug}`}>
                        <div className="text-size-regular text-weight-bold">Read more</div>
                        <div className="button-icon is-small text-color-primary w-embed"><ArrowIcon /></div>
                      </Link>
                    </div>
                  </div>
                  <Link
                    className="main_blog-liist2-item-img-wr w-inline-block relative overflow-hidden"
                    href={`/blog/${post.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {/* The first card's image is the page's LCP element. */}
                    <img
                      alt=""
                      src={post.thumbImage}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding={index === 0 ? "sync" : "async"}
                      className="image-cover"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="spacer-40" />

        <div className="main_blog-liist2-btn-wr">
          <Link className="button-small w-inline-block" href="/blog">
            <div className="text-size-medium text-weight-bold">Read all posts</div>
            <div className="button-icon is-small w-embed"><ArrowIcon /></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
