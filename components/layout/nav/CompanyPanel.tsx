import ArrowIcon from "../../sections/ArrowIcon";
import { ChevronIcon } from "./ChevronIcon";
import { NavLink } from "./NavLink";
import { INFORMATION_LINKS } from "./navConfig";
import type { MegaMenuState } from "./useMegaMenuState";

type CompanyPanelProps = {
  state: MegaMenuState;
  /** The current route is one of the Company pages. */
  isCurrent: boolean;
  onContact: () => void;
};

/**
 * The Company dropdown: a plain link list plus two promo cards (custom design
 * and advertising) and their compact mobile variant. Its trigger has no
 * landing page, so it's a role="button" toggle instead of a transparent link.
 */
export function CompanyPanel({ state, isCurrent, onContact }: CompanyPanelProps) {
  const isOpen = state.isMenuOpen("information");
  const openClass = isOpen ? "w--open" : "";

  return (
    <div className="nav_dropdown-wr" data-nav-menu="information" {...state.getWrapperProps("information")}>
      <div className={`nav_dropdown w-dropdown ${openClass}`} data-delay="0" data-hover="true">
        <div
          className={`nav_dropdown_toggle w-dropdown-toggle ${openClass}${isCurrent || isOpen ? " w--current" : ""}`}
          onClick={() => state.toggleMenu("information")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              state.toggleMenu("information");
            }
          }}
          role="button"
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <div className="text-size-regular">Company</div>
          <span className="icon nav_chevron"><ChevronIcon /></span>
        </div>
        <nav className={`nav_dropdown_list w-dropdown-list ${openClass}`} inert={!isOpen}>
          <div className="container">
            <div className="nav_dropdown-menu2">
              <div className="nav_dropdown-column list">
                <div className="nav_dropdown-column-title-wr">
                  <div className="text-size-regular">Company</div>
                </div>
                <div className="nav-links is-1-column">
                  {INFORMATION_LINKS.map((link) =>
                    link.modal ? (
                      <a
                        className="link-block w-inline-block"
                        href={link.href}
                        key={link.label}
                        onClick={(e) => { e.preventDefault(); onContact(); }}
                      >
                        <div className="text-size-regular">{link.label}</div>
                      </a>
                    ) : (
                      <NavLink className="link-block w-inline-block" href={link.href} key={link.label}>
                        <div className="text-size-regular">{link.label}</div>
                      </NavLink>
                    ),
                  )}
                </div>
              </div>
              <div className="nav_info-promo-wr">
                <div className="nav_info-promo">
                  <span className="nav_info-promo-glow" aria-hidden="true" />
                  <div className="nav_info-promo-content">
                    <div className="nav_info-promo-eyebrow">Work with us</div>
                    <div className="nav_info-promo-title">Need a custom design?</div>
                    <p className="text-size-regular nav_info-promo-text">
                      Tell us about your product — our team crafts tailored dashboards, mobile, and web UI, or a full design system built around your brand.
                    </p>
                    <button
                      type="button"
                      className="button w-inline-block nav_info-promo-cta"
                      onClick={() => onContact()}
                    >
                      <div className="text-size-large text-weight-bold">Get a quote</div>
                    </button>
                  </div>
                </div>
                <div className="nav_info-promo is-advertising">
                  <span className="nav_info-promo-glow" aria-hidden="true" />
                  <div className="nav_info-promo-content">
                    <div className="nav_info-promo-eyebrow">Advertising</div>
                    <div className="nav_info-promo-title">Publish on our blog</div>
                    <p className="text-size-regular nav_info-promo-text">
                      Reach thousands of designers and founders. Place a sponsored article or banner and put your product in front of our audience.
                    </p>
                    <a
                      className="button secondary w-inline-block nav_info-promo-cta"
                      href="https://publish.setproduct.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="text-size-large text-weight-bold">Advertise with us</div>
                      <div className="button-icon w-embed"><ArrowIcon /></div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="nav_info-promo-mobile">
                <div className="nav_info-promo-mobile-eyebrow">Work with us</div>
                <div className="nav_info-promo-mobile-title">Custom design or advertising?</div>
                <p className="text-size-regular nav_info-promo-mobile-text">
                  Tell us about your product, or place a sponsored post in front of our audience.
                </p>
                <button
                  type="button"
                  className="button-small w-inline-block nav_info-promo-mobile-cta"
                  onClick={() => onContact()}
                >
                  <div className="text-size-medium text-weight-bold">Get a quote</div>
                </button>
                <a
                  className="button-small secondary w-inline-block nav_info-promo-mobile-cta"
                  href="https://publish.setproduct.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-size-medium text-weight-bold">Advertise with us</div>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
