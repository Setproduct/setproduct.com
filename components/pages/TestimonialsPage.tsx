import { useState } from "react";
import Head from "next/head";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import Breadcrumbs from "../sections/Breadcrumbs";
import TemplateShowcase from "../sections/TemplateShowcase";
import { useContactModal } from "../modals/ContactModalContext";
import { PAGE_META } from "../../data/pages-meta";
import { PAGE_BREADCRUMBS } from "../../data/breadcrumbs";

type Photo = { src: string; width: number; height: number };

const CDN_PREFIX = "/testimonials/";

const TESTIMONIAL_PAGES: Photo[][] = [
  [
    { src: "Tim_Rupper_-_Jul_2_2.avif", width: 755, height: 195 },
    { src: "testimonial_Massimo.avif", width: 875, height: 703 },
    { src: "testimonial_Leo.avif", width: 928, height: 372 },
    { src: "testimonial_Alex_Mer.avif", width: 972, height: 1606 },
    { src: "Terence_Tam_2021-09-.avif", width: 992, height: 761 },
    { src: "Robert_A_-_Nov_24_20.avif", width: 1012, height: 282 },
    { src: "rob_malkovich.avif", width: 901, height: 394 },
    { src: "Richard_Glesson_2021.avif", width: 676, height: 352 },
    { src: "Rich_2021-04-05.avif", width: 771, height: 285 },
    { src: "reddit2.avif", width: 1242, height: 203 },
    { src: "reddit.avif", width: 500, height: 284 },
    { src: "Nov_23.avif", width: 500, height: 371 },
    { src: "Mar_26.avif", width: 500, height: 577 },
    { src: "Mar_24.avif", width: 500, height: 333 },
  ],
  [
    { src: "Luke_Obrien_2020-08-.avif", width: 1206, height: 617 },
    { src: "Luke_oBrien.avif", width: 943, height: 444 },
    { src: "Kevin_Walter_2021-04.avif", width: 672, height: 378 },
    { src: "Junaid_2020-10-30_Li.avif", width: 1152, height: 1005 },
    { src: "Jun_3.avif", width: 500, height: 371 },
    { src: "Joe_Bezdek_2020-06-2.avif", width: 871, height: 948 },
    { src: "Jase_Orion_Kit.avif", width: 1371, height: 526 },
    { src: "Jan_Irwin_levelup.avif", width: 1007, height: 268 },
    { src: "Jake_L_testimonial_1.avif", width: 902, height: 590 },
    { src: "Igor_2022-02-03.avif", width: 672, height: 208 },
    { src: "driver202_2022-02-03.avif", width: 657, height: 150 },
    { src: "dec_28.avif", width: 500, height: 774 },
    { src: "Dec_5.avif", width: 500, height: 769 },
    { src: "datamagican_24may.avif", width: 895, height: 207 },
  ],
  [
    { src: "DanJasnowski_testimo.avif", width: 887, height: 831 },
    { src: "Craig_Revi_-_Feb_27_.avif", width: 717, height: 357 },
    { src: "Berc_Topcu_-_Mar_15_.avif", width: 588, height: 273 },
    { src: "Ash_-_Jun_2_2021.avif", width: 956, height: 422 },
    { src: "Anqi_L_18-10-22-min.avif", width: 950, height: 546 },
    { src: "Andrzej_-_Mar_3_2021.avif", width: 767, height: 171 },
  ],
];

export default function TestimonialsPage() {
  const meta = PAGE_META.testimonials;
  const breadcrumbs = PAGE_BREADCRUMBS.testimonials ?? [];
  const [visiblePages, setVisiblePages] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const { openContactModal } = useContactModal();

  const visiblePhotos = TESTIMONIAL_PAGES.slice(0, visiblePages)
    .flat()
    .map((p) => ({ ...p, src: `${CDN_PREFIX}${p.src}` }));
  const hasMore = visiblePages < TESTIMONIAL_PAGES.length;

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
                <h1 className="heading-style-h1">Our satisfied Customers</h1>
                <div className="heading-style-h5">
                  We helped more than 3,000 designers, developers and startups to design faster and better
                </div>
              </div>
              <div className="spacer-64"></div>
              <div className="testimonials_sect">
                <div className="testimonials_cl-wr w-dyn-list">
                  <div role="list" className="testimonials_cl w-dyn-items">
                    {visiblePhotos.map((photo, index) => (
                      <div
                        key={photo.src}
                        role="listitem"
                        className="testimonials_cl-item w-dyn-item"
                        style={{ breakInside: "avoid" }}
                      >
                        <a
                          href={photo.src}
                          onClick={(e) => {
                            e.preventDefault();
                            setLightboxIndex(index);
                          }}
                          className="lightbox-link-with-zoom w-inline-block"
                          style={{ cursor: "zoom-in" }}
                        >
                          <img
                            src={photo.src}
                            width={photo.width}
                            height={photo.height}
                            alt=""
                            loading="lazy"
                            className="image-cover"
                            style={{ width: "100%", height: "auto", display: "block" }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                  {hasMore && (
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
                      <a
                        href="#"
                        aria-label="Next Page"
                        onClick={(e) => {
                          e.preventDefault();
                          setVisiblePages((p) => p + 1);
                        }}
                        className="button secondary w-inline-block"
                      >
                        <div className="text-size-large text-weight-bold">Load more</div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <Lightbox
                open={lightboxIndex >= 0}
                index={lightboxIndex}
                close={() => setLightboxIndex(-1)}
                slides={visiblePhotos}
                plugins={[Thumbnails]}
              />
            </div>
          </div>
        </div>
        <div className="section background-color-light-primary">
          <div className="section-padding top-80 bottom-80">
            <div className="container">
              <div className="main_cta-section">
                <div className="main_cta-active">
                  <div className="heading-center-wr lets-connect">
                    <h2 className="heading-style-h2">
                      Hire us to custom design &amp; code! Let&apos;s build together ✊
                    </h2>
                    <div className="heading-style-h5 mob-18">
                      We design in Figma &amp; Webflow using the top-notch UX expertise and lay down the lines of code in React, Vue, Angular, Flutter and Swift.
                    </div>
                  </div>
                  <div className="btn-link-align-center">
                    <a href="#" className="button w-inline-block" onClick={(e) => { e.preventDefault(); openContactModal(); }}>
                      <div className="text-size-large text-weight-bold">Let&rsquo;s connect</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TemplateShowcase />
      </main>
      <SiteFooter />
      <ScrollUpButton />
    </>
  );
}
