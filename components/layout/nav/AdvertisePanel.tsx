import { useRef } from "react";
import ArrowIcon from "../../sections/ArrowIcon";
import { PUBLISH_OFFER, getPublishLinkProps } from "../../../lib/publish";
import { PUBLISH_SHOWCASE_BADGE } from "../../../data/publish-showcase";
import type { ContactLocation } from "../../../lib/contact";
import type { NavShowcasePost } from "../../../lib/nav/types";
import { NavLink } from "./NavLink";
import { MenuTrigger } from "./MenuTrigger";
import { handlePanelKeyDown } from "./interaction";
import type { MegaMenuState } from "./useMegaMenuState";

type AdvertisePanelProps = {
  state: MegaMenuState;
  /** The current route is one of the legal pages this panel links to. */
  isCurrent: boolean;
  /** Our own posts that hold page 1 in Google, in display order. */
  showcase: NavShowcasePost[];
  onContact: (location: ContactLocation) => void;
};

const FACTS = [
  { value: PUBLISH_OFFER.readersPerMonth, label: "readers a month" },
  { value: `DR ${PUBLISH_OFFER.domainRating}`, label: "domain rating" },
  { value: PUBLISH_OFFER.turnaround, label: "to go live" },
];

/**
 * The Advertise dropdown (formerly Company). It sells placement on the blog,
 * so instead of a link list it shows the offer: three facts from PUBLISH_OFFER,
 * the entry price and a primary "See packages" button. On the right, three of
 * our own posts that rank on Google prove the platform gets found.
 *
 * Paid posts are never listed or labelled here, so the showcase can only hold
 * Setproduct's own articles (plans/publish-showcase-phase5-1.md). The old
 * Company links did not disappear: the terms page and the contact form live in
 * the bottom row, and the other pages (Testimonials, License, Refund policy)
 * already sit in the footer.
 *
 * Desktop and the drawer get their own CTA and contact row, because the two
 * send different `location` values to GA4 (`advertise_panel` vs
 * `advertise_panel_mobile`), the same way the Company panel did.
 */
export function AdvertisePanel({ state, isCurrent, showcase, onContact }: AdvertisePanelProps) {
  const isOpen = state.isMenuOpen("advertise");
  const openClass = isOpen ? "w--open" : "";
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelId = "nav-panel-advertise";

  const focusTrigger = () =>
    panelRef.current?.parentElement?.querySelector<HTMLElement>(".nav_dropdown_toggle")?.focus();

  return (
    <div className="nav_dropdown-wr" data-nav-menu="advertise" {...state.getWrapperProps("advertise")}>
      <div className={`nav_dropdown w-dropdown ${openClass}`} data-delay="0" data-hover="true">
        <MenuTrigger
          menu="advertise"
          state={state}
          panelId={panelId}
          panelRef={panelRef}
          label="Advertise"
          isCurrent={isCurrent}
        />
        <div
          ref={panelRef}
          id={panelId}
          className={`nav_dropdown_list w-dropdown-list ${openClass}`}
          inert={!isOpen}
          onKeyDown={(e) => handlePanelKeyDown(e, focusTrigger)}
        >
          <div className="container">
            <div className="nav_dropdown-menu2 nav_advertise-panel">
              <div className="nav_advertise-main" data-nav-group="advertise_main">
                <div className="nav_advertise-eyebrow">For brands</div>
                <div className="nav_advertise-title">Feature your product on Setproduct</div>
                <ul className="nav_advertise-facts">
                  {FACTS.map((fact) => (
                    <li className="nav_advertise-fact" key={fact.label}>
                      <span className="nav_advertise-fact-value">{fact.value}</span>
                      <span className="text-size-tiny">{fact.label}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-size-small nav_advertise-price">
                  From ${PUBLISH_OFFER.priceFrom} per story, dofollow link
                </p>
                <div className="nav_advertise-actions">
                  <a className="button w-inline-block" {...getPublishLinkProps("advertise_panel")}>
                    <div className="text-size-large text-weight-bold">See packages</div>
                    <div className="button-icon w-embed"><ArrowIcon /></div>
                  </a>
                </div>
              </div>

              {showcase.length > 0 ? (
                <div className="nav_advertise-proof" data-nav-group="advertise_proof">
                  <div className="nav_advertise-proof-title">Our stories rank on Google</div>
                  <ul className="nav_advertise-proof-list">
                    {showcase.map((post) => (
                      <li key={post.slug}>
                        <NavLink className="nav_advertise-proof-row hover-lift" href={`/blog/${post.slug}`}>
                          <span className="nav_advertise-proof-img hover-lift-media">
                            <img alt="" decoding="async" loading="lazy" src={post.thumbImage} />
                          </span>
                          <span className="nav_advertise-proof-info">
                            <span className="nav_advertise-proof-name hover-lift-title">{post.title}</span>
                            <span className="nav_advertise-badge text-size-tiny text-weight-semibold">
                              {PUBLISH_SHOWCASE_BADGE}
                            </span>
                          </span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Drawer only: the proof rows lose their covers here, so their
                  message is folded into one line and the CTA moves below it. */}
              <div className="nav_advertise-mobile" data-nav-group="advertise_mobile">
                <p className="nav_advertise-mobile-note text-size-small">
                  Our posts hold page 1 of Google for UI design queries
                </p>
                <a className="button-small w-inline-block" {...getPublishLinkProps("advertise_panel_mobile")}>
                  <div className="text-size-medium text-weight-bold">See packages</div>
                  <div className="button-icon is-small w-embed"><ArrowIcon /></div>
                </a>
                <div className="nav_advertise-mobile-links">
                  <NavLink className="link-block w-inline-block" href="/legal/terms-of-paid-posts">
                    <div className="text-size-regular">Read the terms</div>
                  </NavLink>
                  <button
                    className="link-block w-inline-block"
                    onClick={() => onContact("advertise_panel_mobile")}
                    type="button"
                  >
                    <div className="text-size-regular">Contact us</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="nav_advertise-foot" data-nav-group="advertise_links">
              <NavLink className="link-block w-inline-block" href="/legal/terms-of-paid-posts">
                <div className="text-size-regular">Read the terms</div>
              </NavLink>
              <button
                className="link-block w-inline-block"
                onClick={() => onContact("advertise_panel_desktop")}
                type="button"
              >
                <div className="text-size-regular">Contact us</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
