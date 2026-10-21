import type { FormEvent } from "react";
import type { BlogHeading } from "../../types/blog";
import { useSubscribe } from "../../hooks/useSubscribe";
import { event } from "../../lib/gtag";
import TableOfContents from "./TableOfContents";

type BlogSidebarProps = {
  headings: BlogHeading[];
  activeId: string;
  onNavigate: (item: BlogHeading, position: number) => void;
};

/**
 * Left column of a blog post. Stickiness is pure CSS (position: sticky on
 * .blogpost_content-column1, see globals.css): no scroll listeners, no
 * re-renders while scrolling.
 */
export default function BlogSidebar({ headings, activeId, onNavigate }: BlogSidebarProps) {
  const { isSubscribed, isSubmitting, handleSubscribe } = useSubscribe();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    event("newsletter_subscribe", { location: "blog_sidebar" });
    void handleSubscribe(e);
  };

  return (
    <aside id="w-node-sidebar" className="blogpost_content-column1">
      {headings.length > 0 ? (
        <>
          {/* No divider or spacer: the list dissolves right above the
              subscribe title; its own bottom padding is the gap. */}
          <TableOfContents items={headings} activeId={activeId} onNavigate={onNavigate} />
        </>
      ) : null}
      <div className="blogpost_content-cta-wr hide-on-mobile">
        <p className="text-size-medium text-weight-bold">Subscribe to new posts</p>
        {!isSubscribed ? (
          <div className="form-block w-form">
            <form className="form-cta is-vertical" onSubmit={onSubmit}>
              <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
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
    </aside>
  );
}
