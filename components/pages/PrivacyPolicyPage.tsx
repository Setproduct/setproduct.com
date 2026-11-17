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
  { id: "summary", text: "TL;DR", level: 2 },
  { id: "who-we-are", text: "Who we are", level: 2 },
  { id: "what-we-collect", text: "What we collect", level: 2 },
  { id: "what-we-skip", text: "What we never collect", level: 2 },
  { id: "cookies", text: "Cookies and analytics", level: 2 },
  { id: "providers", text: "Third-party services", level: 2 },
  { id: "where", text: "Where data lives", level: 2 },
  { id: "retention", text: "How long we keep it", level: 2 },
  { id: "rights", text: "Your rights", level: 2 },
  { id: "california", text: "California residents", level: 2 },
  { id: "security", text: "Security", level: 2 },
  { id: "children", text: "Children", level: 2 },
  { id: "changes", text: "Changes", level: 2 },
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
                  We collect as little as we can and keep it for as short as we can. Last updated {LAST_UPDATED}.
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
                      This policy covers setproduct.com: the site, the blog, the contact form and the newsletter
                      form. UI kit checkout runs on Gumroad and paid publishing runs on publish.setproduct.com. Their
                      own privacy terms apply to whatever you share there.
                    </p>

                    <h2 id="summary">TL;DR</h2>
                    <ul>
                      <li>No account, no sign-up, no login. Read everything anonymously.</li>
                      <li>Write to us and we get your email and your message. We use them to reply. That is it.</li>
                      <li>We count page views to see what is worth writing. Nobody gets a profile.</li>
                      <li>We sell nothing about you to anyone. No ad networks, no data brokers.</li>
                      <li>Email {mail} and we wipe what we have on you.</li>
                    </ul>

                    <h2 id="who-we-are">Who we are</h2>
                    <p>
                      Setproduct, the team behind setproduct.com, decides what happens to the data described here.
                      We are a small distributed team. There is no office, no reception desk and no filing cabinet
                      full of your details. The only reliable way to reach us is {mail}.
                    </p>

                    <h2 id="what-we-collect">What we collect</h2>
                    <div className="blog-fit-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Data</th>
                            <th>Why</th>
                            <th>Legal basis (GDPR)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Contact form: email and message</td>
                            <td>To read your question and answer it</td>
                            <td>Steps you ask for before a deal, or our legitimate interest in replying</td>
                          </tr>
                          <tr>
                            <td>
                              Contact form context: which button you pressed, the page you were on, your first page of
                              the visit with its campaign tags, the referring site
                            </td>
                            <td>So we understand your question without asking twice</td>
                            <td>Legitimate interest</td>
                          </tr>
                          <tr>
                            <td>Newsletter form: email</td>
                            <td>To send you the newsletter</td>
                            <td>Consent, revocable any time</td>
                          </tr>
                          <tr>
                            <td>Usage data: pages viewed, clicks, device type, rough location from the IP</td>
                            <td>To see which content helps and fix what breaks</td>
                            <td>Consent where the law requires it, otherwise legitimate interest</td>
                          </tr>
                          <tr>
                            <td>IP address, in server memory only</td>
                            <td>To rate-limit the forms and stop spam bots</td>
                            <td>Legitimate interest in keeping the service up</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h2 id="what-we-skip">What we never collect</h2>
                    <p>
                      Names you did not type, phone numbers, postal addresses, ID documents, card numbers, wallet
                      addresses. We have no database of users because we have no users to register. Keep passwords,
                      keys and seed phrases out of the contact form. We will not ask for them, ever, and anyone who
                      does in our name is a scammer.
                    </p>

                    <h2 id="cookies">Cookies and analytics</h2>
                    <p>
                      We run Google Analytics 4. It sets first-party cookies (named <code>_ga</code> and similar) to
                      tell one visit from another. It stores no name or email and does not keep full IP addresses.
                    </p>
                    <p>
                      The site also remembers one value for the length of a visit: the address of the first page you
                      opened. It sits in your browser&apos;s session storage so the contact form can tell us how you
                      found us, and it disappears when you close the tab. Pages that sell UI kits load a Gumroad
                      script, which may set its own cookies to run checkout.
                    </p>
                    <p>
                      Block or delete cookies in your browser, use a tracker blocker, or install the{" "}
                      <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics opt-out add-on</a>. Every page
                      still works.
                    </p>

                    <h2 id="providers">Third-party services</h2>
                    <p>
                      We do not run our own servers. These providers handle data for us, only for the purposes above,
                      under their own data processing terms.
                    </p>
                    <div className="blog-fit-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Provider</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Vercel</td>
                            <td>Hosts the site and runs the form handlers</td>
                          </tr>
                          <tr>
                            <td>Resend</td>
                            <td>Delivers form submissions to our inbox</td>
                          </tr>
                          <tr>
                            <td>Google (Analytics and Workspace mail)</td>
                            <td>Counts visits and holds the emails we receive</td>
                          </tr>
                          <tr>
                            <td>Gumroad</td>
                            <td>Sells and delivers UI kits under its own privacy policy</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h2 id="where">Where data lives</h2>
                    <p>
                      The team works from wherever it happens to be, so your data does not sit in one country with
                      us. It sits with the providers above, mostly in the United States. When data leaves the
                      European Economic Area, the UK or Switzerland, the transfer relies on the EU-US Data Privacy
                      Framework or the European Commission&apos;s standard contractual clauses.
                    </p>

                    <h2 id="retention">How long we keep it</h2>
                    <ul>
                      <li>Contact messages: while we handle your request, and 24 months after the last message at most.</li>
                      <li>Newsletter emails: until you unsubscribe or ask us to drop you.</li>
                      <li>Google Analytics data: 14 months, then deleted automatically.</li>
                      <li>IP addresses for spam control: server memory only, gone within a day.</li>
                    </ul>

                    <h2 id="rights">Your rights</h2>
                    <p>
                      Wherever you are, you can ask us to show, correct, delete, export or stop using your data, and
                      to withdraw consent you gave earlier. People in the EU, the UK and several US states have these
                      rights by law. We extend them to everyone.
                    </p>
                    <p>
                      Email {mail} from the address the request is about. We answer within 30 days, free of charge.
                      If you think we handled it badly, you can complain to the data protection authority where you
                      live.
                    </p>

                    <h2 id="california">California residents</h2>
                    <p>
                      In the last 12 months we collected identifiers (email address, IP address) and internet
                      activity (pages viewed, clicks) for the purposes above. We do not sell personal information and
                      do not share it for cross-context behavioral advertising. You can ask to know, delete and
                      correct your data, and using these rights changes nothing about how we treat you.
                    </p>

                    <h2 id="security">Security</h2>
                    <p>
                      HTTPS everywhere. Forms check a signed token, rate-limit by IP and trap bots with a hidden
                      field. Only the people who answer messages can open the inbox. The safest data is data we never
                      received, so keep anything sensitive out of the form.
                    </p>

                    <h2 id="children">Children</h2>
                    <p>
                      Setproduct is for designers, developers and founders at work. We do not knowingly collect data
                      from anyone under 16. If a child has sent us something, tell us and we delete it.
                    </p>

                    <h2 id="changes">Changes</h2>
                    <p>
                      When our data handling changes, this page and the date at the top change with it. If a change
                      matters for data you already gave us, we email you before it takes effect.
                    </p>

                    <h2 id="contact">Contact</h2>
                    <p>Privacy questions, requests and complaints go to {mail}.</p>
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
