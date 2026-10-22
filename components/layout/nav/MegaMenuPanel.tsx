import type { CSSProperties, ReactNode } from "react";
import { ChevronIcon } from "./ChevronIcon";
import { NavLink } from "./NavLink";
import type { CategoryMenuKey } from "./navConfig";
import type { MegaMenuState } from "./useMegaMenuState";

export type MegaMenuCategory = {
  /** React key, unique within the panel. */
  key: string;
  label: string;
  /** Value committed to the panel state on hover/focus (null = "All"). */
  value: string | null;
  href: string;
  isActive: boolean;
};

type MegaMenuPanelProps = {
  menu: CategoryMenuKey;
  state: MegaMenuState;
  /** Trigger label; may include a badge. */
  label: ReactNode;
  labelStyle?: CSSProperties;
  /** The current route belongs to this section. */
  isCurrent: boolean;
  /** Section landing page behind the transparent trigger link. */
  toggleHref: string;
  toggleAriaLabel: string;
  /** Trigger and category links open in a new tab (off-site section). */
  external?: boolean;
  /** Webflow form name, kept as-is so existing CSS and markup don't shift. */
  formName: string;
  /** Prefix of the animated list key; the list remounts on category change. */
  listKeyPrefix: string;
  categories: MegaMenuCategory[];
  /**
   * Early intent signal: the pointer entered the panel or a category, before
   * the hover delay commits it. Used to warm up the preview images.
   */
  onIntent?: (category: string | null) => void;
  /** Preview cards (MegaMenuCard). */
  children: ReactNode;
};

/**
 * A navbar dropdown with a Categories column on the left and a preview grid
 * on the right. Open state, hover intent and keyboard handling come from
 * useMegaMenuState; `data-nav-menu` scopes the GA4 click tracking.
 */
export function MegaMenuPanel({
  menu,
  state,
  label,
  labelStyle,
  isCurrent,
  toggleHref,
  toggleAriaLabel,
  external = false,
  formName,
  listKeyPrefix,
  categories,
  onIntent,
  children,
}: MegaMenuPanelProps) {
  const isOpen = state.isMenuOpen(menu);
  const openClass = isOpen ? "w--open" : "";
  const wrapperProps = state.getWrapperProps(menu);

  return (
    <div
      className="nav_dropdown-wr"
      data-nav-menu={menu}
      {...wrapperProps}
      onMouseEnter={() => {
        onIntent?.(state.categories[menu]);
        wrapperProps.onMouseEnter();
      }}
    >
      <div className={`nav_dropdown w-dropdown ${openClass}`} data-delay="0" data-hover="true">
        <div
          className={`nav_dropdown_toggle w-dropdown-toggle ${openClass}${isCurrent || isOpen ? " w--current" : ""}`}
          onClick={() => state.toggleMenu(menu)}
        >
          <div className="text-size-regular" style={labelStyle}>
            {label}
          </div>
          <span className="icon nav_chevron"><ChevronIcon /></span>
          <NavLink
            className="nav_dropdown_toggle-link w-inline-block"
            href={toggleHref}
            external={external}
            aria-label={toggleAriaLabel}
            aria-haspopup="true"
            aria-expanded={isOpen}
          />
        </div>
        <nav className={`nav_dropdown_list w-dropdown-list ${openClass}`} inert={!isOpen}>
          <div className="container">
            <div className="form-block w-form">
              <form method="get" name={formName}>
                <div className="nav_dropdown-menu2">
                  <div className="nav_dropdown-column list">
                    <div className="nav_dropdown-column-title-wr">
                      <div className="text-size-regular">Categories</div>
                    </div>
                    <div className="nav-links is-1-column">
                      {categories.map((cat) => (
                        <NavLink
                          className={`nav_radio w-inline-block${cat.isActive ? " w--current" : ""}`}
                          href={cat.href}
                          external={external}
                          key={cat.key}
                          onMouseEnter={() => {
                            onIntent?.(cat.value);
                            state.setCategoryOnHover(menu, cat.value);
                          }}
                          onMouseLeave={state.clearCategoryHover}
                          onFocus={() => state.setCategoryNow(menu, cat.value)}
                        >
                          <p className={`text-size-regular${cat.isActive ? " text-color-primary" : ""}`}>{cat.label}</p>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  <div className="nav_dropdown-list-wr">
                    <div className="nav_tabs-list-wr w-dyn-list">
                      <div
                        className="nav_tabs-list w-dyn-items w-row nav_tabs-list--animated"
                        role="list"
                        key={`${listKeyPrefix}-${state.categories[menu] ?? "all"}`}
                      >
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
