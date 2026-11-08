import { useRef } from "react";
import Head from "next/head";
import { MDXRemote } from "next-mdx-remote";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import BlogHero from "./BlogHero";
import BlogAuthor from "./BlogAuthor";
import BlogSidebar from "./BlogSidebar";
import MobileTableOfContents from "./MobileTableOfContents";
import ReadingProgress from "./ReadingProgress";
import { useArticleToc } from "../../hooks/useArticleToc";
import BlogFloatingShare from "./BlogFloatingShare";
import BlogInlineCta, { DEFAULT_PUBLISH_CTA } from "./BlogInlineCta";
import { isPublishAudienceCategory, isPublishHref } from "../../lib/publish";
import BlogRelatedPosts from "./BlogRelatedPosts";
import BlogNextArticle from "./BlogNextArticle";
import BlogReadNextBar from "./BlogReadNextBar";
import CtaSubscribe from "../sections/CtaSubscribe";
import { blogMdxComponents } from "./mdx-components";
import { buildBlogPostingJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "../../lib/blog/schema";
import { formatCategoryLabel } from "../../lib/search/format";
import { SITE_URL, absoluteUrl } from "../../lib/blog/site-config";
import type { BlogPost, BlogPostMeta } from "../../types/blog";
import type { NavData } from "../../lib/nav/types";

type BlogPostLayoutProps = {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
  postUrl: string;
  navData?: NavData;
};

export default function BlogPostLayout({ post, relatedPosts, postUrl, navData }: BlogPostLayoutProps) {
  const { frontmatter, mdxSource, readingTimeText, readingTimeMinutes, headings } = post;
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const toc = useArticleToc(headings, `blog/${frontmatter.slug}`);
  const canonical = frontmatter.canonical ?? `${SITE_URL}/blog/${frontmatter.slug}`;
  const absoluteCoverUrl = absoluteUrl(frontmatter.coverImage);
  const jsonLd = buildBlogPostingJsonLd(frontmatter, canonical, readingTimeMinutes);
  const faqJsonLd = frontmatter.faq?.length ? buildFaqJsonLd(frontmatter.faq) : null;
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    frontmatter.title,
    canonical,
    frontmatter.category,
    frontmatter.category ? formatCategoryLabel(frontmatter.category) : undefined
  );
  // Founder/marketer categories default to the publishing CTA; a post's own
  // inlineCta always wins, everything else keeps the newsletter.
  const isPublishAudience = isPublishAudienceCategory(frontmatter.category);
  const bottomCta = frontmatter.inlineCta ?? (isPublishAudience ? DEFAULT_PUBLISH_CTA : null);
  // The footer drops whichever offer the page has just made above it.
  const bottomCtaIsPublish = Boolean(bottomCta && isPublishHref(bottomCta.buttonLink));
  // The first related post becomes the "Next article" card; Related posts
  // show the rest so the same post is not offered twice in a row. With
  // relatedSlugs of 3 or fewer, Related keeps all of them.
  const nextArticle = relatedPosts[0];
  const relatedBelow = relatedPosts.length > 3 ? relatedPosts.slice(1, 4) : relatedPosts;

  return (
    <>
      <Head>
        <title>{`${frontmatter.metaTitle ?? frontmatter.title} | Setproduct Blog`}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={frontmatter.metaTitle ?? frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={absoluteCoverUrl} />
        <meta property="og:url" content={canonical} />
        <meta property="article:published_time" content={frontmatter.date} />
        <meta property="article:author" content={frontmatter.author} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.metaTitle ?? frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={absoluteCoverUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {faqJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        ) : null}
      </Head>
      <ReadingProgress targetRef={contentSectionRef} />
      <SiteHeader navData={navData} />
      <main>
        <BlogHero
          title={frontmatter.title}
          subtitle={frontmatter.subtitle || frontmatter.description}
          coverImage={frontmatter.coverImage}
          coverImageAlt={frontmatter.coverImageAlt}
          date={frontmatter.date}
          readingTimeText={readingTimeText}
          category={frontmatter.category}
          lastUpdated={frontmatter.lastUpdated}
        />
        <div className="section">
          {/* bottom-40: Related posts follow on the same white background and
              bring their own top-80. */}
          <div className="section-padding bottom-40">
            <div className="container">
              <div className="blogpost_content-section" ref={contentSectionRef}>
                {/* key by slug: Next.js keeps this component mounted when one
                    post links to another, so the latched Read next state would
                    carry over. Only the sidebar and the bar are reset; header,
                    footer and article body are left alone. */}
                <BlogSidebar
                  key={frontmatter.slug}
                  headings={toc.items}
                  activeId={toc.activeId}
                  onNavigate={toc.onSidebarNavigate}
                  category={frontmatter.category}
                  readNext={relatedPosts}
                />
                <div
                  id="w-node-content"
                  className="blogpost_content-column2"
                >
                  <BlogAuthor authorSlug={frontmatter.author} />
                  <div className="spacer-16" />
                  <MobileTableOfContents
                    items={toc.items}
                    activeId={toc.activeId}
                    onNavigate={toc.onMobileNavigate}
                    onOpen={toc.onMobileOpen}
                  />
                  <div className="rich-text-18 w-richtext" data-post={frontmatter.slug}>
                    <MDXRemote {...mdxSource} components={blogMdxComponents} />
                  </div>
                  <BlogNextArticle post={nextArticle} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Related first: a finished reader is most likely to click another
            post; the CTA comes after it, right above the footer. */}
        <BlogRelatedPosts posts={relatedBelow} eagerFirst={false} />
        {bottomCta ? <BlogInlineCta cta={bottomCta} /> : <CtaSubscribe />}
      </main>
      <SiteFooter navData={navData} hidePublish={bottomCtaIsPublish} hideSubscribe={!bottomCta} />
      <BlogReadNextBar key={frontmatter.slug} post={nextArticle} articleRef={contentSectionRef} />
      <BlogFloatingShare url={postUrl} title={frontmatter.title} />
      <ScrollUpButton />
    </>
  );
}
