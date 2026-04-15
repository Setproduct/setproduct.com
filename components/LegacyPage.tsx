import Head from "next/head";
import type { LegacyPageData } from "../types/legacy";

export default function LegacyPage({
  title,
  description,
  canonical,
  inlineStyles = [],
  bodyHtml,
}: LegacyPageData) {
  return (
    <>
      <Head>
        {title ? <title>{title}</title> : null}
        {description ? <meta content={description} name="description" /> : null}
        {canonical ? <link href={canonical} rel="canonical" /> : null}
        {inlineStyles.map((style, index) => (
          <style dangerouslySetInnerHTML={{ __html: style }} key={`legacy-style-${index}`} />
        ))}
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
