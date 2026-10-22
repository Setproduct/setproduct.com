import type { ReactNode } from "react";
import { NavLink } from "./NavLink";

type MegaMenuCardProps = {
  /** Destination of the card title. */
  href: string;
  title: string;
  description: string;
  /** Opens the title link in a new tab (Inspiration cards point off-site). */
  external?: boolean;
  /** Image slot: MegaMenuCardMedia or a custom thumb (InspirationThumb). */
  media: ReactNode;
  /** Buttons rendered in `.nav_tabs-list-item-btn-wr`. */
  actions: ReactNode;
};

/**
 * One preview card in the right-hand grid of a mega-menu panel. The markup is
 * shared by every panel; `.nav_tabs-list-item-info-wr .hover-lift-title` is
 * also what the GA4 click tracker reads as `item_title`.
 */
export function MegaMenuCard({ href, title, description, external = false, media, actions }: MegaMenuCardProps) {
  return (
    <div className="nav_tabs-list-item hover-lift w-dyn-item w-col w-col-6" role="listitem">
      <div className="nav_tabs-list-item-wr">
        {media}
        <div className="nav_tabs-list-item-info-wr">
          <NavLink className="w-inline-block" href={href} external={external}>
            <p className="hover-lift-title text-size-regular text-weight-semibold text-color-dark-primary text-style-1line">{title}</p>
          </NavLink>
          <p className="text-size-tiny text-style-3lines">{description}</p>
          <div className="nav_tabs-list-item-btn-wr">{actions}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Standard image frame of a card. Hidden from assistive tech and the tab order
 * because the title link right next to it goes to the same place.
 */
export function MegaMenuCardMedia({ href, children }: { href: string; children: ReactNode }) {
  return (
    <NavLink
      className="nav_tabs-list-item-img-wr hover-lift-media w-inline-block relative"
      href={href}
      aria-hidden="true"
      tabIndex={-1}
    >
      {children}
    </NavLink>
  );
}
