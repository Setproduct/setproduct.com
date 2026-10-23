import { useRef } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import ArrowIcon from "../../sections/ArrowIcon";
import { NavLink } from "./NavLink";
import { MenuTrigger } from "./MenuTrigger";
import { handlePanelKeyDown, isDesktopLayout } from "./interaction";
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
  /**
   * Section landing page. Only needed when the panel has no "All …" category
   * (Inspiration): everywhere else the first category already links there, and
   * a second link to the same URL would just be noise.
   */
  seeAllHref?: string;
  /** Text of the "See all" link: sentence case, verb first. */
  seeAllLabel?: string;
  /** Section and category links open in a new tab (off-site section). */
  external?: boolean;
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
 *
 * The panel is a plain region inside the single <nav aria-label="Main">: no
 * nested landmarks and no leftover Webflow <form> wrappers (B4). All links stay
 * in the server-rendered HTML; closed panels are only `inert`.
 */
export function MegaMenuPanel({
  menu,
  state,
  label,
  labelStyle,
  isCurrent,
  seeAllHref,
  seeAllLabel,
  external = false,
  listKeyPrefix,
  categories,
  onIntent,
  children,
}: MegaMenuPanelProps) {
  const isOpen = state.isMenuOpen(menu);
  const openClass = isOpen ? "w--open" : "";
  const wrapperProps = state.getWrapperProps(menu);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelId = `nav-panel-${menu}`;

  const focusTrigger = () =>
    panelRef.current?.parentElement?.querySelector<HTMLElement>(".nav_dropdown_toggle")?.focus();

  // Touch on the desktop layout has no hover, so a category tap first swaps
  // the previews (C1). The decision is taken on pointerdown, before a focus
  // event could commit the category and make the first tap navigate. The flag
  // also tells the GA4 click tracker that this tap was not a navigation.
  const onCategoryPointerDown = (e: ReactPointerEvent<HTMLAnchorElement>, cat: MegaMenuCategory) => {
    const previewOnly =
      e.pointerType !== "mouse" && isDesktopLayout() && state.categories[menu] !== cat.value;
    e.currentTarget.dataset.previewTap = previewOnly ? "1" : "";
  };

  const onCategoryClick = (e: ReactMouseEvent<HTMLAnchorElement>, cat: MegaMenuCategory) => {
    if (e.currentTarget.dataset.previewTap !== "1") return;
    e.currentTarget.dataset.previewTap = "";
    e.preventDefault();
    onIntent?.(cat.value);
    state.setCategoryNow(menu, cat.value);
  };

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
        <MenuTrigger
          menu={menu}
          state={state}
          panelId={panelId}
          panelRef={panelRef}
          label={label}
          labelStyle={labelStyle}
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
            <div className="nav_dropdown-menu2">
              <div className="nav_dropdown-column list" data-nav-group="categories">
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
                      aria-current={cat.isActive ? "true" : undefined}
                      onMouseEnter={() => {
                        onIntent?.(cat.value);
                        state.setCategoryOnHover(menu, cat.value);
                      }}
                      onMouseLeave={state.clearCategoryHover}
                      onFocus={() => state.setCategoryNow(menu, cat.value)}
                      onPointerDown={(e) => onCategoryPointerDown(e, cat)}
                      onClick={(e) => onCategoryClick(e, cat)}
                    >
                      <p className={`text-size-regular${cat.isActive ? " text-color-primary" : ""}`}>{cat.label}</p>
                    </NavLink>
                  ))}
                </div>
                {seeAllHref && seeAllLabel ? (
                  <NavLink
                    className="button-x-small is-text w-inline-block nav_see-all"
                    href={seeAllHref}
                    external={external}
                  >
                    <div className="text-size-regular text-weight-bold">{seeAllLabel}</div>
                    <div className="button-icon is-small w-embed"><ArrowIcon /></div>
                  </NavLink>
                ) : null}
              </div>
              <div className="nav_dropdown-list-wr">
                <div className="nav_tabs-list-wr w-dyn-list">
                  <div
                    className="nav_tabs-list w-dyn-items w-row nav_tabs-list--animated"
                    role="list"
                    data-nav-group="previews"
                    key={`${listKeyPrefix}-${state.categories[menu] ?? "all"}`}
                  >
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
