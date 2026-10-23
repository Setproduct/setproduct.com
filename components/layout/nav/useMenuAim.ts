import { useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent, RefObject } from "react";
import { isAimingAt } from "./interaction";
import type { Point } from "./interaction";
import { NAV_MENU_AIM_HISTORY, NAV_MENU_AIM_RECHECK_MS, NAV_MENU_AIM_TOLERANCE_PX } from "./navConfig";

type UseMenuAimOptions = {
  /** The preview grid the pointer may be travelling to. */
  targetRef: RefObject<HTMLElement | null>;
  /** The pointer settled on a category: switch the previews to it. */
  onSwitch: (value: string | null) => void;
  /** The pointer left a category row before the switch happened. */
  onCancel: () => void;
};

/**
 * Menu aim for the Categories column of a mega-menu panel (C4). Replaces the
 * old fixed 260 ms delay with a direction test:
 *
 * - pointer moving down or up the list → the hovered category switches at once
 *   (after the short settle delay in useMegaMenuState);
 * - pointer moving diagonally towards the preview grid → the current category
 *   stays, so crossing other rows on the way doesn't swap the cards under it;
 * - pointer that stops on a row while "aiming" → after a recheck interval the
 *   row wins anyway, the user evidently wants it.
 *
 * Keyboard focus and touch taps don't go through here (setCategoryNow).
 */
export function useMenuAim({ targetRef, onSwitch, onCancel }: UseMenuAimOptions) {
  const historyRef = useRef<Point[]>([]);
  const lastMoveAtRef = useRef(0);
  // Wrapped so the "All" category (null) is distinguishable from "nothing".
  const pendingRef = useRef<{ value: string | null } | null>(null);
  const recheckRef = useRef<number | null>(null);

  const clearRecheck = () => {
    if (recheckRef.current !== null) {
      window.clearTimeout(recheckRef.current);
      recheckRef.current = null;
    }
  };

  const isAiming = (): boolean => {
    const target = targetRef.current;
    const history = historyRef.current;
    if (!target || history.length < 2) return false;
    // A pointer that hasn't moved for a while isn't travelling anywhere.
    if (performance.now() - lastMoveAtRef.current >= NAV_MENU_AIM_RECHECK_MS) return false;
    return isAimingAt(
      history[0],
      history[history.length - 1],
      target.getBoundingClientRect(),
      NAV_MENU_AIM_TOLERANCE_PX,
    );
  };

  const attempt = () => {
    clearRecheck();
    const pending = pendingRef.current;
    if (!pending) return;
    if (isAiming()) {
      recheckRef.current = window.setTimeout(attempt, NAV_MENU_AIM_RECHECK_MS);
      return;
    }
    onSwitch(pending.value);
  };

  /** onMouseMove on the Categories column. */
  const track = (event: ReactMouseEvent<HTMLElement>) => {
    const now = performance.now();
    // Points from an earlier visit to the column say nothing about the current
    // path; start the history afresh after a pause.
    if (now - lastMoveAtRef.current >= NAV_MENU_AIM_RECHECK_MS) historyRef.current = [];
    const history = historyRef.current;
    history.push({ x: event.clientX, y: event.clientY });
    if (history.length > NAV_MENU_AIM_HISTORY) history.shift();
    lastMoveAtRef.current = now;
  };

  /**
   * onMouseEnter on a category row. The browser fires it before the mousemove
   * at the same spot, so the entry point is recorded here as well.
   */
  const enter = (value: string | null, event: ReactMouseEvent<HTMLElement>) => {
    track(event);
    pendingRef.current = { value };
    attempt();
  };

  /** onMouseLeave on a category row. */
  const leave = () => {
    pendingRef.current = null;
    clearRecheck();
    onCancel();
  };

  // A queued recheck must never fire after the panel unmounts.
  useEffect(() => clearRecheck, []);

  return { track, enter, leave };
}
