import type { ThemeSpec } from "../spec";
import breakpoints from "./breakpoints";
import palette from "./palette";
import shadows from "./shadows";
import shape from "./shape";
import transitions from "./transitions";
import typography from "./typography";
import zIndex from "./zIndex";

/**
 * Base spacing unit in pixels.
 * `theme.spacing(n)` returns `n × spacing` px.
 *
 * Use named multipliers from `spec/spacing.ts` at call sites:
 * ```ts
 * import { SpacingScale } from "src/theming/themes/spec/spacing";
 * theme.spacing(SpacingScale.md) // 16px
 * ```
 */
export const spacing = 4;

/**
 * Canvara-specific type, narrowing the shared {@link ThemeSpec} contract.
 *
 * Intersect here to add Canvara-only fields:
 * ```ts
 * export type CanvaraSpec = ThemeSpec & {
 *   name: "canvara";
 *   designSystem: "canvara";
 *   customBrandColor: string; // ← Canvara-only addition
 * };
 * ```
 */
export type CanvaraSpec = ThemeSpec & {
  name: "canvara";
  designSystem: "canvara";
};

/**
 * Canvara theme object implementing the {@link ThemeSpec} contract.
 *
 * Canvara uses **Inter** as its primary font, distinguishing it from
 * Novapay which uses Helvetica/Arial. All other values are intentionally
 * identical and can be diverged as the design evolves.
 *
 * ### What each file controls
 * | File              | Controls                                              |
 * |-------------------|-------------------------------------------------------|
 * | `palette.ts`      | All semantic colors (primary, error, neutral, …)     |
 * | `typography.ts`   | Font family, sizes, weights, and line-heights          |
 * | `shadows.ts`      | Box-shadow values for each elevation / focus slot     |
 * | `shape.ts`        | Named border-radius scale (xs, sm, md, lg, full)      |
 * | `breakpoints.ts`  | Responsive viewport thresholds (xxs – xl)             |
 * | `transitions.ts`  | Animation durations and easing curves                 |
 * | `zIndex.ts`       | Stacking order for overlay layers                     |
 * | `index.ts`        | `spacing` scalar + assembles all of the above         |
 *
 * ### Using this theme
 * ```ts
 * import { Canvara } from "src/theming/themes";
 * import { getTheme } from "src/theming/utils";
 * import { createTheme } from "@mui/material/styles";
 *
 * const muiTheme = createTheme(getTheme(Canvara));
 * ```
 */
const theme: CanvaraSpec = {
  name: "canvara",
  designSystem: "canvara",
  typography,
  palette,
  shadows,
  shape,
  breakpoints,
  transitions,
  zIndex,
  spacing,
};

export default theme;
