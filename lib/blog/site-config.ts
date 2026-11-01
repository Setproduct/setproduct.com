// Absolute production origin. Use for <link rel="canonical">, which must stay
// on the production domain even on Vercel preview deployments.
export const CANONICAL_SITE_URL = "https://www.setproduct.com";

// Vercel injects VERCEL_URL on *every* deployment, production included, and its
// value is the per-deployment host (<project>-<hash>-<team>.vercel.app), never
// the custom domain. Trusting it in production sent share buttons, og:image,
// twitter:image and JSON-LD to a preview host that sits behind Deployment
// Protection, so readers landed on a Vercel login screen. VERCEL_URL is now
// honoured only for actual preview deployments.
const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

const VERCEL_HOST =
  isPreviewDeployment && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;

// An env var that is present but empty ("") would silently win over the
// fallbacks, so empty and whitespace-only values are treated as unset.
const normalizeUrl = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.replace(/\/+$/, "");
};

export const SITE_URL =
  normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? VERCEL_HOST ?? CANONICAL_SITE_URL;

// Turns a root-relative asset path ("/images/foo.webp") into an absolute URL.
// Open Graph and Twitter require absolute image URLs; a relative path is
// silently dropped by LinkedIn, Facebook, Telegram and X, leaving the shared
// card without a preview. Already absolute URLs (http/https, protocol-relative)
// are passed through untouched, so product data may hold either form.
export const absoluteUrl = (pathOrUrl: string | undefined): string => {
  if (!pathOrUrl) return "";
  if (/^(https?:)?\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
};
