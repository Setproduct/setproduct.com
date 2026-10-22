import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { EXTERNAL_LINK_PROPS } from "./navConfig";

type NavLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  /** Off-site link: plain <a> that opens in a new tab. */
  external?: boolean;
  children?: ReactNode;
};

/**
 * Link inside the mega-menu. Internal routes go through next/link so the page
 * swaps client-side instead of reloading the whole site. Prefetch on viewport
 * is off: an open panel would otherwise fetch a dozen pages at once. Next
 * still prefetches on hover, which is exactly the intent signal we want.
 * External and Gumroad links must stay plain <a> (gumroad.js binds to them).
 */
export function NavLink({ href, external = false, children, ...rest }: NavLinkProps) {
  if (external) {
    return (
      <a href={href} {...EXTERNAL_LINK_PROPS} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} prefetch={false} {...rest}>
      {children}
    </Link>
  );
}
