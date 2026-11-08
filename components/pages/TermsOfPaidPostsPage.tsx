import Head from "next/head";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import Breadcrumbs from "../sections/Breadcrumbs";
import TableOfContents from "../blog/TableOfContents";
import MobileTableOfContents from "../blog/MobileTableOfContents";
import { useArticleToc } from "../../hooks/useArticleToc";
import { getPublishLinkProps } from "../../lib/publish";
import type { BlogHeading } from "../../types/blog";
import { PAGE_META } from "../../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../../data/breadcrumbs";
import type { NavData } from "../../lib/nav/types";

const TOC_ITEMS: BlogHeading[] = [
  { id: "your-content", text: "Content you submit", level: 2 },
  { id: "payment", text: "Payment", level: 2 },
  { id: "rights", text: "Rights to your content", level: 2 },
  { id: "edits", text: "Edits before publishing", level: 2 },
  { id: "duration", text: "How long your post stays live", level: 2 },
  { id: "results", text: "Traffic and results", level: 2 },
  { id: "removal", text: "Removing a post", level: 2 },
  { id: "refunds", text: "Refunds", level: 2 },
  { id: "liability", text: "Limitation of liability", level: 2 },
  { id: "changes", text: "Changes to these terms", level: 2 },
];

type Props = {
  navData?: NavData;
};

export default function TermsOfPaidPostsPage({ navData }: Props) {
  const meta = PAGE_META["terms-of-paid-posts"];
  const breadcrumbs = PAGE_BREADCRUMBS["terms-of-paid-posts"] ?? [];
  const toc = useArticleToc(TOC_ITEMS, "legal/terms-of-paid-posts");
  const publishLink = getPublishLinkProps("terms_page");

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <link href={meta.canonical} rel="canonical" />
      </Head>
      <SiteHeader navData={navData} />
      <main>
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        <div className="section">
          <div className="section-padding top-80 bottom-80">
            <div className="container">
              <div className="heading-left-text-wr">
                <h1 className="heading-style-h1">Paid post terms of service</h1>
                <div className="heading-style-h5">What you agree to when you publish a sponsored story on the Setproduct blog</div>
              </div>
              <div className="spacer-64"></div>
              <div className="blogpost_content-section">
                <aside className="blogpost_content-column1">
                  <TableOfContents
                    items={toc.items}
                    activeId={toc.activeId}
                    onNavigate={toc.onSidebarNavigate}
                  />
                </aside>
                <div className="blogpost_content-column2">
                  <MobileTableOfContents
                    items={toc.items}
                    activeId={toc.activeId}
                    onNavigate={toc.onMobileNavigate}
                    onOpen={toc.onMobileOpen}
                  />
                  <div className="rich-text-18 w-richtext">
                    <p>
                      These terms apply when you buy a paid post on the Setproduct blog through{" "}
                      <a {...publishLink}>publish.setproduct.com</a>. By paying for a post, you accept every section
                      below.
                    </p>

                    <h2 id="your-content">Content you submit</h2>
                    <p>
                      You are responsible for the accuracy and completeness of the content you send us. It should be
                      relevant to design and tech, the two topics the blog covers.
                    </p>
                    <p>
                      We may ask for revisions, or decline a post that misses our editorial standards or contains
                      offensive material.
                    </p>

                    <h2 id="payment">Payment</h2>
                    <p>
                      You pay the full price before the post goes live. Payments are processed by{" "}
                      <a href="https://gumroad.com/" target="_blank" rel="noreferrer">
                        Gumroad
                      </a>
                      .
                    </p>

                    <h2 id="rights">Rights to your content</h2>
                    <p>
                      You confirm that you own the content or have permission to publish it. Ownership stays with you.
                    </p>
                    <p>
                      You grant Setproduct a non-exclusive, worldwide license to use and display the content
                      to promote your post.
                    </p>

                    <h2 id="edits">Edits before publishing</h2>
                    <p>
                      We may fix formatting and add visuals so the post matches the style of the blog. You review and
                      approve the final version before it goes live.
                    </p>

                    <h2 id="duration">How long your post stays live</h2>
                    <p>
                      Each package states how long the post stays on the blog. Check that period before you buy, because
                      it is part of what you pay for.
                    </p>

                    <h2 id="results">Traffic and results</h2>
                    <p>
                      We promote every paid post, yet we can&apos;t guarantee a specific amount of traffic or
                      conversions. Results depend on what readers are looking for and on market conditions outside our
                      control.
                    </p>

                    <h2 id="removal">Removing a post</h2>
                    <p>
                      We may remove a paid post if it breaks these terms, or for another reason we consider necessary. In
                      that case we may offer a partial refund for the unused period, depending on the circumstances.
                    </p>

                    <h2 id="refunds">Refunds</h2>
                    <p>
                      Apart from the removal case above, payments for paid posts are non-refundable. Every post takes
                      manual editing and publishing work on our side.
                    </p>

                    <h2 id="liability">Limitation of liability</h2>
                    <p>
                      Setproduct is not liable for any direct, indirect, incidental, consequential or special damages
                      arising from the use of the paid post service, the inability to use it, or any content published on
                      the blog.
                    </p>

                    <h2 id="changes">Changes to these terms</h2>
                    <p>
                      We may update these terms at any time and will notify clients about the changes. If you keep using
                      the paid post service after an update, you accept the new version.
                    </p>
                    <p>
                      Packages and prices are listed on <a {...publishLink}>publish.setproduct.com</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter navData={navData} />
      <ScrollUpButton />
    </>
  );
}
