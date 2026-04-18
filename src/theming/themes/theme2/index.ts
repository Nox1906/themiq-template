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
 * Theme2-specific type, narrowing the shared {@link ThemeSpec} contract.
 *
 * Intersect here to add Theme2-only fields:
 * ```ts
 * export type Theme2Spec = ThemeSpec & {
 *   name: "theme2";
 *   designSystem: "theme2";
 *   customBrandColor: string; // ← Theme2-only addition
 * };
 * ```
 */
export type Theme2Spec = ThemeSpec & {
  name: "theme2";
  designSystem: "theme2";
};

/**
 * Theme2 theme object implementing the {@link ThemeSpec} contract.
 *
 * Theme2 uses **Inter** as its primary font, distinguishing it from
 * Theme1 which uses Helvetica/Arial. All other values are intentionally
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
 * import { Theme2 } from "src/theming/themes";
 * import { getTheme } from "src/theming/utils";
 * import { createTheme } from "@mui/material/styles";
 *
 * const muiTheme = createTheme(getTheme(Theme2));
 * ```
 */
const theme: Theme2Spec = {
  name: "theme2",
  designSystem: "theme2",
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
