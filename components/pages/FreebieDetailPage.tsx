import Head from "next/head";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import ScrollUpButton from "../layout/ScrollUpButton";
import Breadcrumbs from "../sections/Breadcrumbs";
import CtaSubscribe from "../sections/CtaSubscribe";
import FreebiesShowcase from "../sections/FreebiesShowcase";
import FreebieArticle from "../sections/FreebieArticle";
import TemplateHero from "../sections/TemplateHero";
import type { BlogPostPreview, FreebieItem } from "../../types/data";

type Props = {
  item: FreebieItem;
  blogPosts?: BlogPostPreview[];
};

export default function FreebieDetailPage({ item, blogPosts = [] }: Props) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Freebies", href: "/freebies" },
    { label: item.title },
  ];

  const title = `${item.title} — Figma freebie`;
  const description = item.description;
  const canonical = `https://setproduct.com/freebies/${item.slug}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <link href={canonical} rel="canonical" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={item.image} />
      </Head>
      <SiteHeader blogPosts={blogPosts} />
      <main className="pt-[70em]">
        <TemplateHero
          title={item.title}
          description={item.description}
          image={item.image}
          imageAlt={title}
          imagePosition={item.heroImagePosition}
          maxWidthClass=""
          actions={[
            {
              label: item.ctaLabel ?? (item.isFree ? "Duplicate ⚡" : "Buy"),
              href: item.duplicateHref,
              variant: "light",
              external: true,
            },
          ]}
        />
        <div className="hide-on-mobile">
          <Breadcrumbs items={breadcrumbs} />
          <div className="spacer-24" />
        </div>
        <FreebieArticle slug={item.slug} />
        <FreebiesShowcase excludeSlug={item.slug} />
        <CtaSubscribe />
      </main>
      <SiteFooter />
      <ScrollUpButton />
    </>
  );
}
