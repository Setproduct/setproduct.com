"use client";

import SeoHead from "../seo/SeoHead";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import Breadcrumbs from "../sections/Breadcrumbs";
import TableOfContents from "../blog/TableOfContents";
import MobileTableOfContents from "../blog/MobileTableOfContents";
import { useArticleToc } from "../../hooks/useArticleToc";
import type { BlogHeading } from "../../types/blog";
import { PAGE_META } from "../../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../../data/breadcrumbs";
import type { NavData } from "../../lib/nav/types";

/** Bump together with the visible date when the text changes in substance. */
const LAST_UPDATED = "November 17, 2026";
const CONTACT_EMAIL = "hello@setproduct.com";

const TOC_ITEMS: BlogHeading[] = [
  { id: "summary", text: "Short version", level: 2 },
  { id: "who-we-are", text: "Who is responsible", level: 2 },
  { id: "what-we-collect", text: "What we collect and why", level: 2 },
  { id: "cookies", text: "Cookies and analytics", level: 2 },
  { id: "providers", text: "Services that process data for us", level: 2 },
  { id: "transfers", text: "Transfers outside your country", level: 2 },
  { id: "retention", text: "How long we keep data", level: 2 },
  { id: "rights", text: "Your rights", level: 2 },
  { id: "california", text: "Notice for California residents", level: 2 },
  { id: "security", text: "Security", level: 2 },
  { id: "children", text: "Children", level: 2 },
  { id: "changes", text: "Changes to this policy", level: 2 },
  { id: "contact", text: "Contact", level: 2 },
];

type Props = {
  navData?: NavData;
};

export default function PrivacyPolicyPage({ navData }: Props) {
  const meta = PAGE_META["privacy-policy"];
  const breadcrumbs = PAGE_BREADCRUMBS["privacy-policy"] ?? [];
  const toc = useArticleToc(TOC_ITEMS, "legal/privacy-policy");
  const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

  return (
    <>
      <SeoHead canonical={meta.canonical} description={meta.description} title={meta.title} />
      <SiteHeader navData={navData} />
      <main>
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        <div className="section">
          <div className="section-padding top-80 bottom-80">
            <div className="container">
              <div className="heading-left-text-wr">
                <h1 className="heading-style-h1">Privacy policy</h1>
                <div className="heading-style-h5">
                  What we collect on setproduct.com, why we need it and how to get it removed. Last updated{" "}
                  {LAST_UPDATED}.
                </div>
              </div>
              <div className="spacer-64"></div>
              <div className="blogpost_content-section">
                <aside className="blogpost_content-column1">
                  <TableOfContents items={toc.items} activeId={toc.activeId} onNavigate={toc.onSidebarNavigate} />
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
                      This policy covers setproduct.com: the website, the blog, the contact form and the newsletter
                      form. Purchases of UI kits run on Gumroad, and paid publishing runs on publish.setproduct.com.
                      Both have their own privacy terms, which apply to what you share there.
                    </p>

                    <h2 id="summary">Short version</h2>
                    <ul>
                      <li>You can read the whole site without giving us any personal data.</li>
                      <li>If you write to us, we use your email and message only to reply.</li>
                      <li>We count visits with Google Analytics to see which pages are useful.</li>
                      <li>We do not sell your data and we do not share it for advertising.</li>
                      <li>Write to {mail} and we will delete what we hold about you.</li>
                    </ul>

                    <h2 id="who-we-are">Who is responsible</h2>
                    <p>
                      Setproduct, the team behind setproduct.com, is the controller of the personal data described
                      here. You can reach us at {mail} for any question about this policy or your data.
                    </p>

                    <h2 id="what-we-collect">What we collect and why</h2>
                    <div className="blog-fit-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Data</th>
                            <th>Why we use it</th>
                            <th>Legal basis (GDPR)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Contact form: your email address and message</td>
                            <td>To read your request and reply to it</td>
                            <td>Steps you ask for before a contract, or our legitimate interest in answering you</td>
                          </tr>
                          <tr>
                            <td>
                              Contact form context: the button you used, the page you were on, the first page of
                              your visit with its campaign tags, and the referring site
                            </td>
                            <td>To understand your question without asking twice and to see which pages bring requests</td>
                            <td>Legitimate interest</td>
                          </tr>
                          <tr>
                            <td>Newsletter form: your email address</td>
                            <td>To add you to the Setproduct newsletter</td>
                            <td>Consent, which you can withdraw at any time</td>
                          </tr>
                          <tr>
                            <td>Usage data: pages viewed, clicks, device type, approximate location from the IP address</td>
                            <td>To measure which content helps and to fix what does not</td>
                            <td>Consent where the law requires it, otherwise legitimate interest</td>
                          </tr>
                          <tr>
                            <td>IP address, held in server memory for a short time</td>
                            <td>To limit how often a form can be sent and block spam</td>
                            <td>Legitimate interest in keeping the service secure</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p>
                      We do not ask for sensitive data. Please do not put passwords, payment details or health
                      information into the contact form.
                    </p>

                    <h2 id="cookies">Cookies and analytics</h2>
                    <p>
                      We use Google Analytics 4. It sets first-party cookies (names starting with <code>_ga</code>)
                      that tell visits apart, and it stores no name or email. Google Analytics does not log or keep
                      full IP addresses.
                    </p>
                    <p>
                      The site also keeps one small value in your browser for the length of a visit: the address of
                      the first page you opened, held in session storage so the contact form can tell us how you
                      found us. It is cleared when you close the tab. Pages that sell UI kits load a script from
                      Gumroad, which may set its own cookies to run checkout.
                    </p>
                    <p>
                      You can block or delete cookies in your browser settings, or install the{" "}
                      <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out add-on</a>. The site
                      keeps working without them.
                    </p>

                    <h2 id="providers">Services that process data for us</h2>
                    <p>
                      These companies handle data on our behalf and only for the purposes above. Each of them is bound
                      by its own data processing terms.
                    </p>
                    <div className="blog-fit-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Provider</th>
                            <th>What it does for us</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Vercel</td>
                            <td>Hosts the website and runs the form handlers</td>
                          </tr>
                          <tr>
                            <td>Resend</td>
                            <td>Delivers contact and newsletter form messages to our inbox</td>
                          </tr>
                          <tr>
                            <td>Google (Analytics and Workspace mail)</td>
                            <td>Measures site usage and stores the emails we receive</td>
                          </tr>
                          <tr>
                            <td>Gumroad</td>
                            <td>Sells and delivers UI kits under its own privacy policy</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h2 id="transfers">Transfers outside your country</h2>
                    <p>
                      Our providers are based in the United States and may process data there. Where data leaves the
                      European Economic Area, the UK or Switzerland, the transfer relies on the EU-US Data Privacy
                      Framework or on the European Commission&apos;s standard contractual clauses.
                    </p>

                    <h2 id="retention">How long we keep data</h2>
                    <ul>
                      <li>
                        Contact messages stay in our mailbox while we handle your request and any follow-up, and no
                        longer than 24 months after the last message.
                      </li>
                      <li>Newsletter addresses stay until you unsubscribe or ask us to remove them.</li>
                      <li>Google Analytics data is kept for up to 14 months, then deleted automatically.</li>
                      <li>IP addresses used against spam live in server memory and disappear within a day.</li>
                    </ul>

                    <h2 id="rights">Your rights</h2>
                    <p>
                      Depending on where you live, including the EU, the UK and several US states, you can ask us to:
                    </p>
                    <ul>
                      <li>Show you the personal data we hold about you.</li>
                      <li>Correct it if it is wrong.</li>
                      <li>Delete it.</li>
                      <li>Limit how we use it, or object to a use based on legitimate interest.</li>
                      <li>Send it to you in a portable format.</li>
                      <li>Withdraw consent you gave earlier, without affecting what happened before.</li>
                    </ul>
                    <p>
                      Write to {mail} from the address the request concerns. We answer within 30 days and do not
                      charge for it. If you think we got it wrong, you can also complain to the data protection
                      authority in your country.
                    </p>

                    <h2 id="california">Notice for California residents</h2>
                    <p>
                      In the last 12 months we collected identifiers (email address, IP address) and internet
                      activity (pages viewed, clicks) for the purposes listed above. We do not sell personal
                      information and do not share it for cross-context behavioral advertising. You have the right
                      to know, delete and correct your data, and we will not treat you differently for using these
                      rights.
                    </p>

                    <h2 id="security">Security</h2>
                    <p>
                      The site is served only over HTTPS. Forms are protected against automated abuse, and access to
                      the mailbox that receives your messages is limited to the people who answer them. No method of
                      transmission is perfectly secure, so please keep sensitive details out of the form.
                    </p>

                    <h2 id="children">Children</h2>
                    <p>
                      Setproduct is made for designers and developers at work. We do not knowingly collect data from
                      anyone under 16. If you believe a child has sent us personal data, write to us and we will
                      delete it.
                    </p>

                    <h2 id="changes">Changes to this policy</h2>
                    <p>
                      When we change how we handle data, we update this page and the date at the top. If a change
                      affects data you already gave us in a significant way, we will tell you by email before it
                      takes effect.
                    </p>

                    <h2 id="contact">Contact</h2>
                    <p>Questions, requests and complaints about privacy go to {mail}.</p>
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
