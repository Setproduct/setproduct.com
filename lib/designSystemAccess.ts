/**
 * Whether the /design-system docs are built for this deploy.
 *
 * The section is work in progress. It must stay available locally and on
 * Vercel preview deploys, but must not reach the live site until the author
 * says so, even when someone deploys an unrelated change (a new blog post).
 *
 * - local `npm run dev` / `npm run build`: VERCEL_ENV is unset → on;
 * - Vercel preview: VERCEL_ENV = "preview" → on;
 * - Vercel production: off, every /design-system URL is a 404,
 *   unless DESIGN_SYSTEM_PUBLIC=true is set in the Vercel project env.
 *
 * To go live: add DESIGN_SYSTEM_PUBLIC=true for Production in Vercel and
 * redeploy. The pages are built at build time, so the variable only takes
 * effect on the next deploy. Removing it hides the section again.
 *
 * Lives in lib/, not in design-system/: it is a decision of the host site,
 * the design system itself knows nothing about deploys.
 */
export function isDesignSystemPublished(): boolean {
  if (process.env.DESIGN_SYSTEM_PUBLIC === "true") return true;
  return process.env.VERCEL_ENV !== "production";
}
