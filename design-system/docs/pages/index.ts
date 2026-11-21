import type { ComponentType } from "react";
import { ButtonsDoc } from "./ButtonsDoc";
import { ChipsDoc } from "./ChipsDoc";
import { InputsDoc } from "./InputsDoc";

/**
 * Page body for every registry slug. A slug listed in registry.ts without a
 * body here fails the build (see pages/design-system/[component].tsx), so a menu item
 * can never lead to a 404.
 */
export const DOC_PAGES: Record<string, ComponentType> = {
  buttons: ButtonsDoc,
  inputs: InputsDoc,
  chips: ChipsDoc,
};

export { OverviewDoc } from "./OverviewDoc";
