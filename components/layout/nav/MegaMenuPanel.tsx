import { useRef } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { NavLink } from "./NavLink";
import { MenuTrigger } from "./MenuTrigger";
import { handlePanelKeyDown, isDesktopLayout } from "./interaction";
import type { CategoryMenuKey } from "./navConfig";
import type { MegaMenuState } from "./useMegaMenuState";
import { useMenuAim } from "./useMenuAim";

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
  /** Section and category links open in a new tab (off-site section). */
  external?: boolean;
  /** Prefix of the animated list key; the list remounts on category change. */
  listKeyPrefix: string;
  categories: MegaMenuCategory[];
  /**
   * Early intent signal: the pointer entered the panel, or settled on a
   * category (past the menu-aim check), just before the switch commits. Used
   * to warm up the preview images.
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
  const previewsRef = useRef<HTMLDivElement | null>(null);
  const panelId = `nav-panel-${menu}`;

  // Diagonal travel towards the previews keeps the current category; only a
  // pointer moving along the list (or stopping on a row) switches it.
  const aim = useMenuAim({
    targetRef: previewsRef,
    onSwitch: (value) => {
      onIntent?.(value);
      state.setCategoryOnHover(menu, value);
    },
    onCancel: state.clearCategoryHover,
  });

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
                <div className="nav-links is-1-column" onMouseMove={aim.track}>
                  {categories.map((cat) => (
                    <NavLink
                      className={`nav_radio w-inline-block${cat.isActive ? " w--current" : ""}`}
                      href={cat.href}
                      external={external}
                      key={cat.key}
                      aria-current={cat.isActive ? "true" : undefined}
                      onMouseEnter={(e) => aim.enter(cat.value, e)}
                      onMouseLeave={aim.leave}
                      onFocus={() => state.setCategoryNow(menu, cat.value)}
                      onPointerDown={(e) => onCategoryPointerDown(e, cat)}
                      onClick={(e) => onCategoryClick(e, cat)}
                    >
                      <p className={`text-size-regular${cat.isActive ? " text-color-primary" : ""}`}>{cat.label}</p>
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="nav_dropdown-list-wr" ref={previewsRef}>
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
