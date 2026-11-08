import { useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  DribbbleIcon,
  LinkedInIcon,
  MediumIcon,
  PinterestIcon,
  RedditIcon,
  XIcon,
  type FooterSocialIconComponent,
} from "./FooterSocialIcons";
import ArrowIcon from "../sections/ArrowIcon";
import { useContactModal } from "../modals/ContactModalContext";
import { useSubscribe } from "../../hooks/useSubscribe";
import { PUBLISH_OFFER, getPublishLinkProps } from "../../lib/publish";
import { describeHref, trackNav } from "../../lib/nav/analytics";
import { DESIGN_KITS, NAV_BLOG_CATEGORIES, NAV_BLOG_LATEST, getBlogPreviews } from "./nav/navConfig";
import type { NavBlogPost, NavData } from "../../lib/nav/types";

type FooterPost = Pick<NavBlogPost, "slug" | "title" | "category">;

type Props = {
  /** Same data as the navbar; its `blog` feeds Popular reads. */
  navData?: NavData;
  /** Home and /blog ship the full post list here and an empty navData.blog. */
  blogPosts?: FooterPost[];
  /** The page already ends with the publishing CTA (BlogInlineCta). */
  hidePublish?: boolean;
  /** The page already has a CtaSubscribe block. */
  hideSubscribe?: boolean;
};

type FooterGroup = "publish" | "popular" | "topics" | "kits" | "company" | "legal" | "social";
type FooterLink = { href: string; label: string };
type SocialLink = { href: string; label: string; Icon: FooterSocialIconComponent };

const POPULAR_COUNT = 5;

const TOPIC_LINKS: FooterLink[] = NAV_BLOG_CATEGORIES.filter(
  (item) => item.category !== null && item.category !== NAV_BLOG_LATEST
).map((item) => ({
  href: `/blog?category=${encodeURIComponent(item.category as string)}`,
  label: item.label,
}));

const KIT_LINKS: FooterLink[] = [
  ...DESIGN_KITS.filter((kit) => kit.category !== null).map(({ href, label }) => ({ href, label })),
  { href: "/freebies", label: "Resources" },
];

const COMPANY_LINKS: FooterLink[] = [
  { href: "/testimonials", label: "Testimonials" },
  { href: "/search", label: "Search" },
];

const LEGAL_LINKS: FooterLink[] = [
  { href: "/legal/license", label: "License" },
  { href: "/legal/refunds-policy", label: "Refund policy" },
  { href: "/legal/terms-of-paid-posts", label: "Terms of paid posts" },
];

const PUBLISH_FACTS = [
  `Live in ${PUBLISH_OFFER.turnaround}`,
  `Dofollow link, DR ${PUBLISH_OFFER.domainRating}`,
  `${PUBLISH_OFFER.readersPerMonth} readers a month`,
  `From $${PUBLISH_OFFER.priceFrom}`,
];

const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://dribbble.com/setproduct/shots", label: "Dribbble", Icon: DribbbleIcon },
  { href: "https://x.com/set_product", label: "X", Icon: XIcon },
  { href: "https://www.reddit.com/r/FigmaDesignSystems/", label: "Reddit", Icon: RedditIcon },
  { href: "https://www.pinterest.com/setproduct/", label: "Pinterest", Icon: PinterestIcon },
  { href: "https://kamushken.medium.com/", label: "Medium", Icon: MediumIcon },
  { href: "https://www.linkedin.com/company/setproduct/", label: "LinkedIn", Icon: LinkedInIcon },
];

/** One GA4 `footer_click` per link click, grouped by the column it sits in. */
function handleFooterClick(e: MouseEvent<HTMLDivElement>) {
  const anchor = e.target instanceof Element ? e.target.closest("a") : null;
  if (!anchor) return;
  const group = anchor.closest<HTMLElement>("[data-footer-group]")?.dataset.footerGroup;
  const { url, outbound } = describeHref(anchor);
  trackNav("footer_click", {
    group: group ?? "other",
    link_url: url,
    link_text: anchor.textContent?.trim(),
    outbound,
    page_path: window.location.pathname,
  });
}

type ColumnProps = {
  id: string;
  group: FooterGroup;
  title: string;
  titleHref?: string;
  collapsible?: boolean;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
};

function FooterColumn({ id, group, title, titleHref, collapsible = false, isOpen, onToggle, children }: ColumnProps) {
  const listId = `footer-links-${id}`;
  const classes = ["footer_column", collapsible ? "is-collapsible" : "", isOpen ? "is-open" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} data-footer-group={group}>
      <div className="footer-link-title">
        {titleHref ? (
          <Link className="footer-link-title-link text-size-regular text-weight-bold" href={titleHref}>
            {title}
          </Link>
        ) : (
          <div className="text-size-regular text-weight-bold">{title}</div>
        )}
        {collapsible ? (
          <button
            aria-controls={listId}
            aria-expanded={isOpen}
            aria-label={`${isOpen ? "Collapse" : "Expand"} ${title}`}
            className="footer-link-toggle"
            onClick={() => onToggle(id)}
            type="button"
          >
            <img alt="" className="footer-link-dropdown-icon" loading="lazy" src="/images/Mask.svg" />
          </button>
        ) : null}
      </div>
      <div className="footer-links" id={listId}>
        {children}
      </div>
    </div>
  );
}

function FooterLinkList({ links }: { links: FooterLink[] }) {
  return (
    <>
      {links.map((link) => (
        <Link className="link-block w-inline-block" href={link.href} key={link.href}>
          <div className="text-size-small">{link.label}</div>
        </Link>
      ))}
    </>
  );
}

export default function SiteFooter({ navData, blogPosts = [], hidePublish = false, hideSubscribe = false }: Props) {
  const { isSubscribed, isSubmitting, handleSubscribe } = useSubscribe();
  const { openContactModal } = useContactModal();
  const [openColumns, setOpenColumns] = useState<Set<string>>(() => new Set());

  const sourcePosts: FooterPost[] = navData?.blog?.length ? navData.blog : blogPosts;
  const popularPosts = getBlogPreviews(sourcePosts, null).slice(0, POPULAR_COUNT);
  const year = new Date().getFullYear();

  const toggleColumn = (id: string) => {
    setOpenColumns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="section">
      <div className="section-padding bottom-80">
        <div className="container">
          <div className="footer" onClick={handleFooterClick}>
            {!hidePublish ? (
              <div className="footer-publish" data-footer-group="publish">
                <div className="footer-publish-text">
                  <p className="blog-publish-card-eyebrow">For founders and marketers</p>
                  <p className="heading-style-h4">Tell {PUBLISH_OFFER.readersPerMonth} readers about your product</p>
                  <ul className="footer-publish-facts">
                    {PUBLISH_FACTS.map((fact) => (
                      <li className="footer-publish-fact" key={fact}>
                        <div className="text-size-small text-weight-bold">{fact}</div>
                      </li>
                    ))}
                    <li className="footer-publish-terms">
                      <Link className="text-size-small" href="/legal/terms-of-paid-posts">
                        Read the terms
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-publish-actions">
                  <a className="button w-inline-block" {...getPublishLinkProps("footer_band")}>
                    <div className="text-size-large text-weight-bold">See packages</div>
                    <div className="button-icon w-embed">
                      <ArrowIcon />
                    </div>
                  </a>
                </div>
              </div>
            ) : null}

            <div className={`footer-card${hideSubscribe ? " is-compact" : ""}`}>
              <div className={`footer_links-wr${popularPosts.length > 0 ? " has-popular" : ""}`}>
                {popularPosts.length > 0 ? (
                  <FooterColumn
                    group="popular"
                    id="popular"
                    isOpen
                    onToggle={toggleColumn}
                    title="Popular reads"
                  >
                    {popularPosts.map((post) => (
                      <Link className="link-block footer-post-link w-inline-block" href={`/blog/${post.slug}`} key={post.slug}>
                        <div className="text-size-small">{post.title}</div>
                      </Link>
                    ))}
                    <Link className="link-block footer-all-link w-inline-block" href="/blog">
                      <div className="text-size-small text-weight-bold">All articles</div>
                    </Link>
                  </FooterColumn>
                ) : null}

                <FooterColumn
                  collapsible
                  group="topics"
                  id="topics"
                  isOpen={openColumns.has("topics")}
                  onToggle={toggleColumn}
                  title="Topics"
                  titleHref="/blog"
                >
                  <FooterLinkList links={TOPIC_LINKS} />
                </FooterColumn>

                <FooterColumn
                  collapsible
                  group="kits"
                  id="kits"
                  isOpen={openColumns.has("kits")}
                  onToggle={toggleColumn}
                  title="Design kits"
                  titleHref="/all"
                >
                  <FooterLinkList links={KIT_LINKS} />
                </FooterColumn>

                <FooterColumn
                  collapsible
                  group="company"
                  id="company"
                  isOpen={openColumns.has("company")}
                  onToggle={toggleColumn}
                  title="Company"
                >
                  <a className="link-block w-inline-block" {...getPublishLinkProps("footer")}>
                    <div className="text-size-small">For advertisers</div>
                  </a>
                  <FooterLinkList links={COMPANY_LINKS} />
                  <button
                    className="link-block footer-link-button"
                    onClick={() => {
                      trackNav("footer_click", { group: "company", link_text: "Contact us", page_path: window.location.pathname });
                      openContactModal("footer");
                    }}
                    type="button"
                  >
                    <div className="text-size-small">Contact us</div>
                  </button>
                </FooterColumn>
              </div>

              <div className="footer_logo-cta-wr">
                <div className="footer_logo-wr">
                  <img alt="" className="footer_logo-img" height={56} loading="lazy" src="/images/Vectors-Wrapper_1.svg" width={137} />
                  <Link aria-label="Setproduct home" className="brand-link w-inline-block" href="/" />
                </div>
                {!hideSubscribe ? (
                  <div className="footer_cta-wr">
                    <div className={`footer_cta-active${isSubscribed ? " hidden" : ""}`}>
                      <p className="heading-style-h4">Weekly notes on building and growing tech companies</p>
                      <div className="spacer-12" />
                      <p className="text-size-small">New posts, free resources and design templates releases.</p>
                      <div className="spacer-24" />
                      <div className="form-block w-form">
                        <form className="form-cta" onSubmit={handleSubscribe}>
                          <input name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                          <input aria-label="Email address" className="text-input w-input" disabled={isSubmitting} maxLength={256} name="Email" placeholder="Enter your email" required type="email" />
                          <div className="button-form-wr">
                            <button className="button outlined w-inline-block disabled:opacity-70" disabled={isSubmitting} type="submit">
                              {isSubmitting ? (
                                <svg
                                  width="20" height="20" viewBox="0 0 24 24" fill="none"
                                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                  style={{ animation: "spin 0.8s linear infinite", display: "block" }}
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
                    </div>
                    <div
                      className="footer_cta-success"
                      style={{ display: isSubscribed ? "flex" : "none" }}
                    >
                      <p className="heading-style-h4">Congratulations!</p>
                      <div className="spacer-12" />
                      <p className="text-size-small">You&apos;re in! Expect awesome updates in your inbox</p>
                      <div className="footer_cta-trigger" />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="footer_credits">
              <div className="footer_credits-text" data-footer-group="legal">
                <div className="footer_credits-text-wr">
                  <div className="text-size-small">© {year} Setproduct</div>
                </div>
                {LEGAL_LINKS.map((link) => (
                  <Link className="footer-credits-link text-size-small" href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="footer_socials" data-footer-group="social">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    aria-label={social.label}
                    className="link-block footer-social-media w-inline-block"
                    href={social.href}
                    key={social.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="footer_social-icon w-embed">
                      <social.Icon height="100%" width="100%" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
