import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        <link
          href="/images/fav-32.webp"
          rel="shortcut icon"
          type="image/x-icon"
        />
        <link
          href="/images/fav-256.webp"
          rel="apple-touch-icon"
        />
        {/* The upright variable font is used on every page: fetch it with the CSS, not after it. */}
        <link
          href="/fonts/UncutSans-Variable.woff2"
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link href="/css/normalize.css" rel="stylesheet" />
        <link href="/css/webflow.css" rel="stylesheet" />
        {/* <link href="/css/setproduct.webflow.css" rel="stylesheet" /> */}
        <link href="/css/setproduct.webflow.shared.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/@splidejs/splide@3.2.2/dist/css/splide-core.min.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
