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
 *
 * It also peeks earlier when a reader past 40% scrolls back up: that gesture
 * usually means "looking for where to go next". The header stays put, so the
 * publishing button in it is never hidden.
 */
/** Share of the article body read before the pill slides in. */
const SHOW_AT_PROGRESS = 0.8;
/** Scroll-up peek works only after this share of the article. */
const PEEK_FROM_PROGRESS = 0.4;
/** Upward travel (px) that counts as "looking for the next step". */
const PEEK_UP_DISTANCE = 300;
/** Downward travel (px) that means the reader is back to reading. */
const PEEK_HIDE_DISTANCE = 200;
/**
 * A single frame that moves more than this share of the viewport is a jump
 * (Cmd+F, Home without smooth scroll, restored position, TOC pin), never a
 * reader scrolling back with a wheel or a finger.
 */
const JUMP_SHARE = 0.6;
/**
 * In-page anchor jumps (TOC, footnotes, the "up" button) and Home/End are
 * not a reader's scroll-up. With `scroll-behavior: smooth` they animate for
 * an unknown time, so they are ignored until scrolling stays quiet this long.
 */
const SETTLE_MS = 150;

type Trigger = "progress" | "scroll_up";

export default function BlogReadNextBar({ post, articleRef }: BlogReadNextBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  // "×" first plays the blur dissolve, then unmounts on animationend.
  const [dissolving, setDissolving] = useState(false);
  // One view event per trigger: a pill first shown by scroll-up must still
  // report "progress" when the reader later reaches 80%.
  const reported = useRef<Set<Trigger>>(new Set());
  // Why the pill is on screen now; read by the click event.
  const triggerRef = useRef<Trigger>("progress");
  const slug = post?.frontmatter.slug;

  useEffect(() => {
    if (!slug || dismissed) return;
    const article = articleRef.current;
    const footer = document.querySelector<HTMLElement>(".footer");
    if (!article) return;

    let frame = 0;
    let lastY = window.scrollY;
    let upTravel = 0;
    let downTravel = 0;
    let peeking = false;
    let ignoring = false;
    let settleTimer = 0;
    const armSettle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        ignoring = false;
        lastY = window.scrollY;
      }, SETTLE_MS);
    };
    const startIgnoring = () => {
      ignoring = true;
      peeking = false;
      armSettle();
    };

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      // Slide in at 80% of the article body (same formula as the reading
      // progress line and the sidebar "Read next"); hide only when the footer
      // fills most of the screen.
      const rect = article.getBoundingClientRect();
      const distance = rect.height - vh;
      const progress = distance <= 0 ? 1 : -rect.top / distance;
      const footerTakesOver = footer ? footer.getBoundingClientRect().top < vh * 0.4 : false;

      if (ignoring || Math.abs(delta) > vh * JUMP_SHARE) {
        upTravel = 0;
        downTravel = 0;
      } else if (delta < 0) {
        upTravel -= delta;
        downTravel = 0;
        if (upTravel >= PEEK_UP_DISTANCE) peeking = true;
      } else if (delta > 0) {
        downTravel += delta;
        upTravel = 0;
        if (downTravel >= PEEK_HIDE_DISTANCE) peeking = false;
      }
      if (progress < PEEK_FROM_PROGRESS) peeking = false;

      const byProgress = progress >= SHOW_AT_PROGRESS;
      const show = (byProgress || peeking) && !footerTakesOver;
      if (show) {
        const trigger: Trigger = byProgress ? "progress" : "scroll_up";
        triggerRef.current = trigger;
        if (!reported.current.has(trigger)) {
          reported.current.add(trigger);
          event("blog_read_next_view", { location: "floating_bar", slug, trigger });
        }
      }
      setVisible(show);
    };
    const schedule = () => {
      if (ignoring) armSettle();
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('a[href^="#"]')) startIgnoring();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Home" || e.key === "End") startIgnoring();
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey, true);
      window.clearTimeout(settleTimer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [slug, dismissed, articleRef]);

  if (!post || dismissed) return null;

  const { frontmatter } = post;
  const thumb = frontmatter.thumbImage ?? frontmatter.coverImage;

  return (
    <div
      className={`blog-read-next-bar${visible || dissolving ? " is-visible" : ""}${dissolving ? " is-dissolving" : ""}`}
      inert={!visible || dissolving}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && dissolving) setDismissed(true);
      }}
    >
      <Link
        href={`/blog/${frontmatter.slug}`}
        className="blog-read-next-bar-link"
        onClick={() =>
          event("blog_read_next_click", {
            location: "floating_bar",
            position: 1,
            slug: frontmatter.slug,
            trigger: triggerRef.current,
          })
        }
      >
        {thumb ? (
          <span className="blog-read-next-bar-thumb radius-16">
            <img
              alt={`${frontmatter.title} cover`}
              src={thumb}
              loading="lazy"
              decoding="async"
              className="image-cover"
            />
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
          setDissolving(true);
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
