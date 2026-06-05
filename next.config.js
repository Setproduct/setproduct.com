// On Vercel preview deployments (VERCEL_ENV === "preview") the image
// optimizer quota is easy to blow through, so serve raw files instead.
const isVercelPreview = process.env.VERCEL_ENV === "preview";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    unoptimized: isVercelPreview,
    // Сначала пробуем WebP (универсальная поддержка), AVIF — для современных браузеров.
    formats: ["image/webp", "image/avif"],
    // Сокращённый набор брекпоинтов: мобайл / таблет / десктоп / ретина-десктоп
    deviceSizes: [640, 1080, 1920],
    // Размеры для явно заданных width/height (иконки, аватары, thumbnails)
    imageSizes: [64, 256, 384],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:path+.html", destination: "/:path+", permanent: true },
      // Deprecated dashboard D-posts merged into the pillar (Phase 4).
      {
        source: "/blog/dashboard-design-best-practices-top-dashboard-ui-design-tips",
        destination: "/blog/dashboard-ui-design",
        permanent: true,
      },
      {
        source: "/blog/why-are-dashboards-important",
        destination: "/blog/dashboard-ui-design",
        permanent: true,
      },
      {
        source: "/blog/benefits-of-dashboards",
        destination: "/blog/dashboard-ui-design",
        permanent: true,
      },
      {
        source: "/blog/marketing-dashboard-examples-templates",
        destination: "/blog/marketing-dashboard-ui-design-guide",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

module.exports = nextConfig;
