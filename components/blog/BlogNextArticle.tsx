import { useEffect, useRef } from "react";
import Link from "next/link";
import { event } from "../../lib/gtag";
import ArrowIcon from "../sections/ArrowIcon";
import type { BlogPostMeta } from "../../types/blog";

type BlogNextArticleProps = {
  post?: BlogPostMeta;
};

/**
 * One large "Next article" card right after the post body. It meets the
 * reader at the exact moment they finish, works on mobile (where the sidebar
 * is hidden), and costs the TOC no height.
 */
export default function BlogNextArticle({ post }: BlogNextArticleProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const slug = post?.frontmatter.slug;

  useEffect(() => {
    const el = ref.current;
    if (!el || !slug || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          event("blog_read_next_view", { location: "after_article", slug });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [slug]);

  if (!post) return null;

  const { frontmatter } = post;
  const href = `/blog/${frontmatter.slug}`;

  return (
    <>
      <div className="spacer-48" />
      <Link
        ref={ref}
        href={href}
        className="blog-next-article hover-lift"
        onClick={() => event("blog_read_next_click", { location: "after_article", position: 1, slug: frontmatter.slug })}
      >
        <span className="blog-next-article-card hover-lift-media radius-24">
          <span className="blog-next-article-img">
            <img
              alt={frontmatter.coverImageAlt ?? frontmatter.title}
              className="image-cover"
              loading="lazy"
              src={frontmatter.coverImage}
            />
          </span>
          <span className="blog-next-article-info">
            <span className="blog-next-article-eyebrow text-size-tiny text-weight-semibold">Next article</span>
            <span className="hover-lift-title heading-style-h5 text-color-dark-primary text-style-3lines">
              {frontmatter.title}
            </span>
            <span className="blog-next-article-meta text-size-small">
              {frontmatter.category ? `${frontmatter.category} · ` : ""}
              {post.readingTimeText}
            </span>
            <span className="blog-next-article-cta text-size-regular text-weight-bold">
              Read next
              <span className="button-icon is-small w-embed">
                <ArrowIcon />
              </span>
            </span>
          </span>
        </span>
      </Link>
    </>
  );
}
