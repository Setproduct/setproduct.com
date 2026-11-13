import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import type { BlogHeading, BlogPostMeta } from "../../types/blog";
import { useSubscribe } from "../../hooks/useSubscribe";
import { event } from "../../lib/gtag";
import { PUBLISH_OFFER, getPublishLinkProps, isPublishAudienceCategory } from "../../lib/publish";
import ArrowIcon from "../sections/ArrowIcon";
import TableOfContents, { buildTocEntries } from "./TableOfContents";

type BlogSidebarProps = {
  headings: BlogHeading[];
  activeId: string;
  onNavigate: (item: BlogHeading, position: number) => void;
  category?: string;
  /** Related posts of this article; the first five become "Read next". */
  readNext?: BlogPostMeta[];
};

const READ_NEXT_COUNT = 5;
/** Share of the article body read before "Read next" replaces the TOC. */
const READ_NEXT_PROGRESS = 0.8;

/**
 * "Read next" takes the TOC's place near the end of the article (80% read or
 * the penultimate H2, whichever comes first) and then stays: a fast scroll
 * would otherwise flash it for a second. Only "Back to contents" brings the
 * TOC back.
 */
function ReadNext({ posts, onBack }: { posts: BlogPostMeta[]; onBack?: () => void }) {
  return (
    <nav aria-label="Read next" className="blog-read-next">
      <div className="blog-read-next-head">
        <p className="text-size-medium text-weight-bold">Read next</p>
        {onBack ? (
          <button type="button" className="blog-read-next-back text-size-tiny" onClick={onBack}>
            Back to contents
          </button>
        ) : null}
      </div>
      <ol className="blog-read-next-list">
        {posts.map((post, index) => {
          const href = `/blog/${post.frontmatter.slug}`;
          const thumb = post.frontmatter.thumbImage ?? post.frontmatter.coverImage;
          return (
            <li key={post.frontmatter.slug}>
              <Link
                className="blog-read-next-item hover-lift"
                href={href}
                onClick={() =>
                  event("blog_read_next_click", {
                    location: "sidebar",
                    position: index + 1,
                    slug: post.frontmatter.slug,
                  })
                }
              >
                {thumb ? (
                  <span className="blog-read-next-thumb hover-lift-media radius-8">
                    <img
                      alt={`${post.frontmatter.title} cover`}
                      src={thumb}
                      loading="lazy"
                      decoding="async"
                      className="image-cover"
                    />
                  </span>
                ) : null}
                <span className="blog-read-next-title hover-lift-title text-size-small text-weight-semibold">
                  {post.frontmatter.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Publishing offer for founder/marketer categories. Takes the place of the
 * subscribe block: one call to action per column.
 */
function PublishCard() {
  return (
    <div className="blog-publish-card hide-on-mobile">
      <p className="blog-publish-card-eyebrow">For founders</p>
      <p className="text-size-medium text-weight-bold">
        Launching a product? Get it in front of {PUBLISH_OFFER.readersPerMonth} readers a month
      </p>
      <ul className="blog-publish-card-facts text-size-small">
        <li>Live within {PUBLISH_OFFER.turnaround}</li>
        <li>Dofollow link, DR {PUBLISH_OFFER.domainRating}</li>
        <li>From ${PUBLISH_OFFER.priceFrom}</li>
      </ul>
      <a className="button-small w-inline-block" {...getPublishLinkProps("blog_sidebar")}>
        <div className="text-size-medium text-weight-bold">See packages</div>
        <div className="button-icon is-small w-embed">
          <ArrowIcon />
        </div>
      </a>
    </div>
  );
}

/**
 * Left column of a blog post. Stickiness is pure CSS (position: sticky on
 * .blogpost_content-column1, see globals.css): no scroll listeners, no
 * re-renders while scrolling.
 */
export default function BlogSidebar({ headings, activeId, onNavigate, category, readNext = [] }: BlogSidebarProps) {
  const showPublish = isPublishAudienceCategory(category);
  const nextPosts = readNext.slice(0, READ_NEXT_COUNT);
  const hasToc = headings.length > 0;
  const asideRef = useRef<HTMLElement>(null);

  // Trigger 1: the reader is in the penultimate or last H2 section.
  const nearEndSectionIds = useMemo(() => {
    const h2 = headings.filter((h) => h.level === 2);
    return new Set(h2.slice(-2).map((h) => h.id));
  }, [headings]);
  const activeParentId = useMemo(
    () => buildTocEntries(headings).find((e) => e.id === activeId)?.parentId ?? "",
    [headings, activeId],
  );
  const inNearEndSection = activeParentId !== "" && nearEndSectionIds.has(activeParentId);

  // Trigger 2: 80% of the article body is read. Same formula as the reading
  // progress line; the listener goes away once the threshold is crossed.
  const [pastProgress, setPastProgress] = useState(false);
  useEffect(() => {
    if (!hasToc || pastProgress) return;
    const section = asideRef.current?.parentElement;
    if (!section) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance <= 0 ? 1 : -rect.top / distance;
      if (progress >= READ_NEXT_PROGRESS) setPastProgress(true);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [hasToc, pastProgress]);

  // Latch: once triggered, "Read next" stays while scrolling either way.
  const [latched, setLatched] = useState(false);
  const [trigger, setTrigger] = useState<"progress" | "section" | null>(null);
  useEffect(() => {
    if (latched) return;
    if (pastProgress || inNearEndSection) {
      setLatched(true);
      setTrigger(pastProgress ? "progress" : "section");
    }
  }, [latched, pastProgress, inNearEndSection]);

  // "Back to contents" is an explicit choice, so it wins for the rest of the visit.
  const [tocPinned, setTocPinned] = useState(false);

  // Without a TOC the column has room, so "Read next" is there from the start.
  const showReadNext = nextPosts.length > 0 && (!hasToc || (latched && !tocPinned));

  // One "shown" event per page view, the denominator for the click rate.
  const reportedShown = useRef(false);
  useEffect(() => {
    if (!showReadNext || reportedShown.current) return;
    reportedShown.current = true;
    event("blog_read_next_view", { location: "sidebar", trigger: hasToc ? trigger : "no_toc" });
  }, [showReadNext, hasToc, trigger]);

  const { isSubscribed, isSubmitting, handleSubscribe } = useSubscribe();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    event("newsletter_subscribe", { location: "blog_sidebar" });
    void handleSubscribe(e);
  };

  return (
    <aside ref={asideRef} id="w-node-sidebar" className="blogpost_content-column1">
      {/* One slot, two states: the TOC while reading, "Read next" near the
          end. They swap instead of stacking, so the TOC never loses
          height. No divider or spacer: the list dissolves right above the
          block below; its own bottom padding is the gap. */}
      {showReadNext ? (
        <ReadNext posts={nextPosts} onBack={hasToc ? () => setTocPinned(true) : undefined} />
      ) : hasToc ? (
        <TableOfContents items={headings} activeId={activeId} onNavigate={onNavigate} />
      ) : null}
      {showPublish ? <PublishCard /> : (
      <div className="blogpost_content-cta-wr hide-on-mobile">
        <p className="text-size-medium text-weight-bold">Subscribe to new posts</p>
        {!isSubscribed ? (
          <div className="form-block w-form">
            <form className="form-cta is-vertical" onSubmit={onSubmit}>
              {/* Honeypot: hidden from sight and from assistive tech, but still
                  submitted so the API can reject bots that fill it in. */}
              <div aria-hidden="true" className="hidden">
                <input
                  aria-label="Leave this field empty"
                  autoComplete="off"
                  name="website"
                  tabIndex={-1}
                />
              </div>
              <input
                aria-label="Email address"
                className="text-input w-input"
                disabled={isSubmitting}
                maxLength={256}
                name="Email"
                placeholder="Enter your email"
                type="email"
                required
              />
              <div className="button-form-wr">
                <button
                  className="button w-inline-block disabled:opacity-70 w-full"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <svg
                      width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                      className="animate-spin block"
                      aria-label="Subscribing"
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  ) : (
                    <div className="text-size-large text-weight-bold">Subscribe</div>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className="text-size-small" role="status">Thank you! You&apos;re subscribed.</p>
        )}
      </div>
      )}
    </aside>
  );
}
