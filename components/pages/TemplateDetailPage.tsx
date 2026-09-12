import Head from "next/head";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import Breadcrumbs from "../sections/Breadcrumbs";
import CtaSubscribe from "../sections/CtaSubscribe";
import FaqSection from "../sections/FaqSection";
import TemplateStickyCta from "../sections/TemplateStickyCta";
import TemplateHero from "../sections/TemplateHero";
import type { BlogPostPreview, TemplateItem } from "../../types/data";

type Props = {
  item: TemplateItem;
  blogPosts?: BlogPostPreview[];
};

export default function TemplateDetailPage({ item, blogPosts = [] }: Props) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/all" },
    { label: item.title },
  ];

  const title = item.title;
  const description = item.description;
  const canonical = `https://setproduct.com/templates/${item.slug}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <link href={canonical} rel="canonical" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={item.ogImage} />
      </Head>
      <SiteHeader blogPosts={blogPosts} />
      <main className="pt-[70em]">
        <TemplateHero
          title={item.title}
          description={item.description}
          image={item.heroImage}
          imagePosition={item.heroImagePosition}
          actions={[
            {
              label: "Get Started",
              href: item.buyHref,
              variant: "light",
              gumroad: true,
            },
            {
              label: "Preview in Figma",
              href: item.previewHref,
              external: true,
            },
          ]}
        />

        {/* Breadcrumbs */}
        <div className="hide-on-mobile">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Feature Grid */}
        {item.features.length > 0 && (
          <div className="section">
            <div className="section-padding top-80 bottom-80">
              <div className="container">
                <div className="template_4colm-cards">
                  {item.features.map((feature, index) => (
                    <div key={index} className="template_4colm-card">
                      {feature.image && (
                        <div className="template_4colm-card-img-wr">
                          <img
                            alt={feature.title}
                            className="image-cover"
                            loading="lazy"
                            src={feature.image}
                          />
                        </div>
                      )}
                      <div className="template_4colm-card-info-wr">
                        <p className="heading-style-h5 is-template-max-width">
                          <strong>{feature.title}</strong>
                        </p>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <CtaSubscribe />
      </main>
      <SiteFooter />
      <TemplateStickyCta item={item} />
      <ScrollUpButton />
    </>
  );
}
