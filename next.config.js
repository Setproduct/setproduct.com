/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/legal/license.html", destination: "/legal/license", permanent: true },
      { source: "/legal/refunds-policy.html", destination: "/legal/refunds-policy", permanent: true },
      { source: "/blog/:slug*.html", destination: "/blog/:slug*", permanent: true },
      { source: "/templates/:slug*.html", destination: "/templates/:slug*", permanent: true },
      { source: "/freebies/:slug*.html", destination: "/freebies/:slug*", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/external/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
};

module.exports = nextConfig;
