import { createContext } from "react";
import type { DocEntry } from "./registry";

/** Registry entry of the page being rendered; null on the overview. */
export const DocContext = createContext<DocEntry | null>(null);
