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
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:path+.html", destination: "/:path+", permanent: true },
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
