import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { event } from "../../lib/gtag";
import type { BlogPostMeta } from "../../types/blog";

type BlogReadNextBarProps = {
  post?: BlogPostMeta;
  /** The article grid (sidebar + body); the bar appears once it is scrolled past. */
  articleRef: RefObject<HTMLElement | null>;
};

/**
 * Floating "Read next" pill between the end of the article and the footer.
 * By then the sidebar has scrolled away with the article, so this keeps the
 * next step on screen through Related posts and the CTA. Hides when the
 * footer comes into view, or for the rest of the visit after "×".
 */
export default function BlogReadNextBar({ post, articleRef }: BlogReadNextBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const reported = useRef(false);
  const slug = post?.frontmatter.slug;

  useEffect(() => {
    if (!slug || dismissed) return;
    const article = articleRef.current;
    const footer = document.querySelector<HTMLElement>(".footer");
    if (!article) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      // Show as soon as the end of the article text is on screen; hide only
      // when the footer fills most of the screen, so the pill rides over
      // Related posts and the CTA instead of flashing past them.
      const reachedEnd = article.getBoundingClientRect().bottom <= vh;
      const footerTakesOver = footer ? footer.getBoundingClientRect().top < vh * 0.4 : false;
      setVisible(reachedEnd && !footerTakesOver);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [slug, dismissed, articleRef]);

  useEffect(() => {
    if (!visible || !slug || reported.current) return;
    reported.current = true;
    event("blog_read_next_view", { location: "floating_bar", slug });
  }, [visible, slug]);

  if (!post || dismissed) return null;

  const { frontmatter } = post;
  const thumb = frontmatter.thumbImage ?? frontmatter.coverImage;

  return (
    <div className={`blog-read-next-bar${visible ? " is-visible" : ""}`} inert={!visible}>
      <Link
        href={`/blog/${frontmatter.slug}`}
        className="blog-read-next-bar-link"
        onClick={() => event("blog_read_next_click", { location: "floating_bar", position: 1, slug: frontmatter.slug })}
      >
        {thumb ? (
          <span className="blog-read-next-bar-thumb radius-8">
            <img alt="" src={thumb} loading="lazy" decoding="async" className="image-cover" />
          </span>
        ) : null}
        <span className="blog-read-next-bar-text">
          <span className="blog-read-next-bar-eyebrow">Read next</span>
          <span className="blog-read-next-bar-title">{frontmatter.title}</span>
        </span>
      </Link>
      <button
        type="button"
        className="blog-read-next-bar-close"
        aria-label="Hide read next"
        onClick={() => {
          setDismissed(true);
          event("blog_read_next_dismiss", { location: "floating_bar", slug: frontmatter.slug });
        }}
      >
        <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
