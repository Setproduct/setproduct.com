import Head from "next/head";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import Breadcrumbs from "../sections/Breadcrumbs";
import { PAGE_META } from "../../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../../data/breadcrumbs";

export default function LicensePage() {
  const meta = PAGE_META["license"];
  const breadcrumbs = PAGE_BREADCRUMBS["license"] ?? [];
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <link href={meta.canonical} rel="canonical" />
      </Head>
      <SiteHeader />
      <main>
        {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        <div className="section">
          <div className="section-padding top-80 bottom-80">
            <div className="container">
              <div className="heading-left-text-wr">
                <h1 className="heading-style-h1">Licensing terms</h1>
                <div className="heading-style-h5">Pick an Individual license for single use, or Business for the unlimited amount of users</div>
              </div>
              <div className="spacer-64"></div>
              <div className="blogpost_content-section">
                <div className="blogpost_content-column1">
                  <div className="hide-on-mobile">
                    <p className="text-size-medium text-weight-bold">Table of contents</p>
                  </div>
                  <div className="spacer-16 hide-on-mobile"></div>
                  <div className="blogpost_navigation-wr">
                    <div className="blogpost_navigation-link-wr">
                      <a className="blogpost_navigation-link w-inline-block" href="#end-product">
                        <p>An end product is one of the following</p>
                      </a>
                    </div>
                    <div className="blogpost_navigation-link-wr">
                      <a className="blogpost_navigation-link w-inline-block" href="#you-are-allowed-to">
                        <p>You are allowed to</p>
                      </a>
                    </div>
                    <div className="blogpost_navigation-link-wr">
                      <a className="blogpost_navigation-link w-inline-block" href="#you-are-not-allowed-to">
                        <p>You are not allowed to</p>
                      </a>
                    </div>
                    <div className="blogpost_navigation-link-wr">
                      <a className="blogpost_navigation-link w-inline-block" href="#other-license-terms">
                        <p>Other license terms</p>
                      </a>
                    </div>
                    <div className="blogpost_navigation-link-wr">
                      <a className="blogpost_navigation-link w-inline-block" href="#individual-license">
                        <p>Individual (Single license)</p>
                      </a>
                    </div>
                    <div className="blogpost_navigation-link-wr">
                      <a className="blogpost_navigation-link w-inline-block" href="#business-license">
                        <p>Business (Unlimited)</p>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="blogpost_content-column2">
                  <div className="rich-text-18 w-richtext">
                    <p>By purchasing any of listed products (&quot;item&quot; or &quot;file&quot;) you are being granted a license to use these files for specific uses under certain conditions.</p>
                    <p>Setproduct license grants the user an ongoing, non-exclusive, worldwide license to utilize the digital work (&quot;Item&quot;).</p>
                    <p>You are licensed to use any purchased Item to create unlimited End Products for yourself or for your clients and the End Product may be sold, licensed, sub-licensed or freely distributed.</p>

                    <h2 id="end-product">An end product is one of the following</h2>
                    <p>For an Item that is a template, the End Product is a customized implementation of the Item. For example, the item is package of UI elements and the End Product is your unique finished web app design or mobile app.</p>

                    <h2 id="you-are-allowed-to">You are allowed to</h2>
                    <p>✔ <strong>You may publish the item in your team library within your organization for unlimited participants.</strong><br />✔ You may create an End Product for a client.<br />✔ You may create an End Product for personal or commercial use.<br />✔ You may sell, license, sub-license or distributed and make any number of copies of the End Product.<br />✔ You may modify or manipulate the Item.<br />✔ You may combine the Item with other works and make a derivative work from it. The resulting works are subject to the terms of this license.<br />✔ This is a &apos;multi-use&apos; license, which means you may use an Item multiple times, in multiple projects.</p>

                    <h2 id="you-are-not-allowed-to">You are not allowed to</h2>
                    <p>✘ <strong>You can&apos;t share the item link into the web, or distribute (e.g. embed) with Figma public access.</strong><br />✘ You can&apos;t place any of Setproduct design files into the End Product as it is.<br />✘ You can&apos;t re-distribute the Item as stock, in a tool or template, or with source files. You can&apos;t do this with an Item either on its own or bundled with other items, and even if you modify the Item.<br />✘ You can&apos;t re-distribute or make available the Item as-is or with superficial modifications.<br />✘ You must not permit an end user of the End Product to extract the Item and use it separately from the End Product.</p>

                    <h2 id="other-license-terms">Other license terms</h2>
                    <p>• You are not required to attribute or link to Setproduct in any of projects.<br />• Any of listed products will not be responsible for any outcome that may occur during the course of usage of any of our resources.</p>

                    <h2 id="individual-license">Individual (Single license)</h2>
                    <p>Pick an Individual license, e.g. if you&apos;re a freelancer working for a client, or self-employed player running a commercial side-project.</p>

                    <h2 id="business-license">Business (Unlimited)</h2>
                    <p>Pick a Business license, if you&apos;re a startup, agency, or any other kind of business, where are more than 2 employees working on a project.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <ScrollUpButton />
    </>
  );
}
