import { useRef } from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";
import type { NavOpenSource } from "../../../lib/nav/analytics";
import { ChevronIcon } from "./ChevronIcon";
import { focusPanelEntry, focusSiblingTrigger } from "./interaction";
import type { MenuKey } from "./navConfig";
import type { MegaMenuState } from "./useMegaMenuState";

type MenuTriggerProps = {
  menu: MenuKey;
  state: MegaMenuState;
  /** id of the panel this button controls. */
  panelId: string;
  panelRef: RefObject<HTMLDivElement | null>;
  label: ReactNode;
  labelStyle?: CSSProperties;
  /** The current route belongs to this section. */
  isCurrent: boolean;
};

/**
 * Top-level navbar item. It is only a disclosure button, so one element never
 * has two roles (B2) and a tap on a touch screen opens the panel instead of
 * leaving the page (C1). The section landing page is reached through the
 * first category of the panel ("All topics" → /blog, "All" → /all), which
 * keeps the link in the server-rendered HTML.
 *
 * Enter/Space toggle, ↓ opens and moves into the panel, ←/→ hop between
 * navbar items. Focus alone never opens anything (B1).
 */
export function MenuTrigger({ menu, state, panelId, panelRef, label, labelStyle, isCurrent }: MenuTriggerProps) {
  const isOpen = state.isMenuOpen(menu);
  // pointerType of the press that precedes the click: mouse, touch or pen.
  const pointerTypeRef = useRef<string>("mouse");

  return (
    <button
      type="button"
      className={`nav_dropdown_toggle w-dropdown-toggle${isOpen ? " w--open" : ""}${isCurrent || isOpen ? " w--current" : ""}`}
      aria-expanded={isOpen}
      aria-controls={panelId}
      onPointerDown={(e) => {
        pointerTypeRef.current = e.pointerType;
      }}
      onClick={(e) => {
        // detail === 0: activated by Enter/Space rather than a pointer.
        const source: NavOpenSource =
          e.detail === 0 ? "keyboard" : pointerTypeRef.current === "mouse" ? "click" : "tap";
        state.toggleMenu(menu, source);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          state.openFromKeyboard(menu);
          focusPanelEntry(panelRef.current);
        } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          focusSiblingTrigger(e.currentTarget, e.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <span className="text-size-regular" style={labelStyle}>
        {label}
      </span>
      <span className="icon nav_chevron"><ChevronIcon /></span>
    </button>
  );
}
