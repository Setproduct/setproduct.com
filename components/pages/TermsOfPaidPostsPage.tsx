import Head from "next/head";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import Breadcrumbs from "../sections/Breadcrumbs";
import TableOfContents from "../blog/TableOfContents";
import MobileTableOfContents from "../blog/MobileTableOfContents";
import { useArticleToc } from "../../hooks/useArticleToc";
import { PUBLISH_OFFER, getPublishLinkProps } from "../../lib/publish";
import type { BlogHeading } from "../../types/blog";
import { PAGE_META } from "../../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../../data/breadcrumbs";
import type { NavData } from "../../lib/nav/types";

const TOC_ITEMS: BlogHeading[] = [
  { id: "plans", text: "Plans and prices", level: 2 },
  { id: "after-payment", text: "What happens after you pay", level: 2 },
  { id: "turnaround", text: "Turnaround time", level: 2 },
  { id: "indexing", text: "Google indexing", level: 2 },
  { id: "what-we-accept", text: "What we accept", level: 2 },
  { id: "prohibited", text: "Topics we don't accept", level: 2 },
  { id: "edits", text: "Edits and review", level: 2 },
  { id: "labels", text: "Sponsored labels", level: 2 },
  { id: "payment", text: "Payment and refunds", level: 2 },
  { id: "duration", text: "How long the post stays online", level: 2 },
  { id: "ownership", text: "Who owns the content", level: 2 },
  { id: "full-terms", text: "Full terms and contact", level: 2 },
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
                <div className="heading-style-h5">What you get, what we accept and what we don't when you publish a paid article on the Setproduct blog</div>
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
                      This page explains how paid publishing works on the Setproduct blog. Packages and prices live
                      on <a {...publishLink}>publish.setproduct.com</a>, and the legal text that governs the
                      service is the Terms of Service on the same site.
                    </p>

                    <h2 id="plans">Plans and prices</h2>
                    <p>
                      Both plans publish your article on the Setproduct blog, which reaches{" "}
                      {PUBLISH_OFFER.readersPerMonth} readers a month at DR {PUBLISH_OFFER.domainRating}.
                    </p>
                    <div className="blog-fit-table">
                      <table>
                        <thead>
                          <tr>
                            <th>What you get</th>
                            <th>Accelerate</th>
                            <th>Maximize</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Price per article</td>
                            <td>${PUBLISH_OFFER.priceFrom}</td>
                            <td>${PUBLISH_OFFER.priceTwoLinks}</td>
                          </tr>
                          <tr>
                            <td>Do-follow links</td>
                            <td>One</td>
                            <td>Two</td>
                          </tr>
                          <tr>
                            <td>Published within</td>
                            <td>3 days</td>
                            <td>24 hours</td>
                          </tr>
                          <tr>
                            <td>Word count</td>
                            <td>Up to 3,000</td>
                            <td>Up to 5,000</td>
                          </tr>
                          <tr>
                            <td>Placement</td>
                            <td>Blog</td>
                            <td>Blog, plus the homepage</td>
                          </tr>
                          <tr>
                            <td>Newsletter promotion</td>
                            <td>No</td>
                            <td>Yes, to 7,000 subscribers</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p>
                      No-follow links are free. A free submission goes through the same moderation as a paid one,
                      and its review can take up to 30 days.
                    </p>

                    <h2 id="after-payment">What happens after you pay</h2>
                    <p>
                      Payment opens the member zone, where you manage the post from draft to publication. Inside it
                      you can:
                    </p>
                    <ul>
                      <li>Insert your draft and edit it as needed.</li>
                      <li>Add your anchor text and target keywords.</li>
                      <li>Upload images and other media.</li>
                      <li>Preview and finalize the post before it goes live.</li>
                      <li>Track the status, from review to publication.</li>
                      <li>Talk to our team through the support system.</li>
                      <li>Read analytics and tracking data, on the Maximize plan only.</li>
                    </ul>

                    <h2 id="turnaround">Turnaround time</h2>
                    <p>The clock starts when your prepayment clears. From there the order is the same on both plans:</p>
                    <ol>
                      <li>You pay, and the member zone opens for you.</li>
                      <li>You add the draft, the anchor text and the images, then finalize the post.</li>
                      <li>We review it and ask for changes if something needs tightening.</li>
                      <li>The post goes live, and we tell you it is up.</li>
                    </ol>
                    <p>
                      Most paid posts go live within 24 hours of payment. Treat that as the normal speed. What we
                      guarantee per plan is the outer limit: Accelerate within 3 days, Maximize within 24 hours.
                      Send the draft together with the payment, otherwise the review cannot start and the timing
                      above does not hold.
                    </p>

                    <h2 id="indexing">Google indexing</h2>
                    <p>
                      We guarantee that the post gets indexed by Google, and in most cases that happens within 48
                      hours of publication. Indexing is the part we control. Ranking for a specific keyword is not
                      something we promise.
                    </p>

                    <h2 id="what-we-accept">What we accept</h2>
                    <p>
                      Original articles about tech that have not been published elsewhere. We check grammar and
                      formatting before publishing, and we may ask you to tighten structure or tone.
                    </p>

                    <h2 id="prohibited">Topics we don't accept</h2>
                    <p>We do not publish content that promotes or relates to:</p>
                    <ul>
                      <li>Betting and casino gambling.</li>
                      <li>CBD or cannabis products.</li>
                      <li>Adult or explicit content.</li>
                      <li>Illicit or controlled substances.</li>
                      <li>Hate speech or discriminatory language.</li>
                      <li>Spam or low-quality content.</li>
                    </ul>
                    <p>
                      When a draft falls into these categories we reject the submission and do not publish it. A
                      declined draft does not close your account.
                    </p>

                    <h2 id="edits">Edits and review</h2>
                    <p>
                      We may fix small copy issues ourselves and we may ask you for changes before we accept a
                      draft. Once the post is live, you can still ask for changes to the text or to a link, and we
                      make them free of charge.
                    </p>

                    <h2 id="labels">Sponsored labels</h2>
                    <p>
                      By default we do not add a sponsored tag to a paid post. If you want a label or a disclosure
                      line next to your article, tell us before publication and we add the wording you need.
                    </p>

                    <h2 id="payment">Payment and refunds</h2>
                    <p>
                      You pay the full price in advance through <a {...publishLink}>publish.setproduct.com</a>,
                      which accepts several payment methods. Payments are not refundable. What we guarantee
                      instead is that your post is published within the timeframe of the plan you bought.
                    </p>

                    <h2 id="duration">How long the post stays online</h2>
                    <p>
                      A published paid post stays on the blog permanently. We do not take paid posts down once
                      they are live.
                    </p>

                    <h2 id="ownership">Who owns the content</h2>
                    <p>
                      You keep ownership of your article. By submitting it, you give Setproduct a license to use,
                      modify and distribute it on the blog.
                    </p>

                    <h2 id="full-terms">Full terms and contact</h2>
                    <p>
                      The Terms of Service on publish.setproduct.com is the binding document. It covers accounts,
                      warranties, liability and termination. Read it before you pay.
                    </p>
                    <p>
                      If your case is not covered here, write to{" "}
                      <a href="mailto:hello@setproduct.com">hello@setproduct.com</a> and we answer before you buy.
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
