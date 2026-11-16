import { useRef } from "react";
import ArrowIcon from "../../sections/ArrowIcon";
import { NavLink } from "./NavLink";
import { MenuTrigger } from "./MenuTrigger";
import { handlePanelKeyDown } from "./interaction";
import type { MegaMenuState } from "./useMegaMenuState";

export type GuidesPanelGroup = {
  key: string;
  title: string;
  guides: Array<{ slug: string; label: string }>;
};

export type GuidesPanelStartItem = {
  slug: string;
  label: string;
  thumbImage: string;
};

type GuidesPanelProps = {
  state: MegaMenuState;
  /** The current route is the hub or a guide. */
  isCurrent: boolean;
  startHere: GuidesPanelStartItem[];
  groups: GuidesPanelGroup[];
  total: number;
};

/**
 * The UI guides dropdown. It does not follow the categories-plus-cards layout
 * of Articles and Resources on purpose: those are feeds where the reader picks
 * by picture, while this is a fixed index of 42 guides that people look up by
 * name. So the panel shows the whole index as text links, grouped by what the
 * component does, with three lead guides on the left.
 *
 * Same disclosure trigger, keyboard contract and menu-aim wrapper as the other
 * panels; the content inside is the only difference.
 */
export function GuidesPanel({ state, isCurrent, startHere, groups, total }: GuidesPanelProps) {
  const isOpen = state.isMenuOpen("guides");
  const openClass = isOpen ? "w--open" : "";
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelId = "nav-panel-guides";

  const focusTrigger = () =>
    panelRef.current?.parentElement?.querySelector<HTMLElement>(".nav_dropdown_toggle")?.focus();

  return (
    <div className="nav_dropdown-wr" data-nav-menu="guides" {...state.getWrapperProps("guides")}>
      <div className="nav_dropdown w-dropdown" data-delay="0" data-hover="true">
        <MenuTrigger
          menu="guides"
          state={state}
          panelId={panelId}
          panelRef={panelRef}
          label="UI guides"
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
            <div className="nav-guides-top">
              <p className="text-size-tiny">
                Anatomy, states and accessibility for {total} components and visual styles
              </p>
              <NavLink className="button-x-small is-text w-inline-block" href="/ui-guides">
                <div className="text-size-regular text-weight-bold">All {total} guides</div>
                <div className="button-icon is-small text-color-primary w-embed">
                  <ArrowIcon />
                </div>
              </NavLink>
            </div>

            <div className="nav_dropdown-menu2 nav-guides-panel">
              <div className="nav_dropdown-column list nav-guides-start" data-nav-group="start_here">
                <div className="nav_dropdown-column-title-wr">
                  <div className="text-size-regular">Start here</div>
                </div>
                {startHere.map((item) => (
                  <NavLink className="nav-guides-start-item" href={`/blog/${item.slug}`} key={item.slug}>
                    <span className="nav-guides-start-img">
                      <img alt="" decoding="async" loading="lazy" src={item.thumbImage} />
                    </span>
                    <span className="nav-guides-start-label">{item.label}</span>
                  </NavLink>
                ))}
              </div>

              <div className="nav-guides-groups">
                {groups.map((group) => (
                  <div className="nav-guides-col" data-nav-group={group.key} key={group.key}>
                    <div className="nav_dropdown-column-title-wr">
                      <div className="text-size-regular">{group.title}</div>
                    </div>
                    <div className="nav-links is-1-column">
                      {group.guides.map((guide) => (
                        <NavLink className="nav-guides-link w-inline-block" href={`/blog/${guide.slug}`} key={guide.slug}>
                          <p className="text-size-regular">{guide.label}</p>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
