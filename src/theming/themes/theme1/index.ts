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
 * Theme1-specific type, narrowing the shared {@link ThemeSpec} contract.
 *
 * Intersect here to add Theme1-only fields:
 * ```ts
 * export type Theme1Spec = ThemeSpec & {
 *   name: "theme1";
 *   designSystem: "theme1";
 *   customBrandColor: string; // ← Theme1-only addition
 * };
 * ```
 */
export type Theme1Spec = ThemeSpec & {
  name: "theme1";
  designSystem: "theme1";
};

/**
 * Theme1 theme object implementing the {@link ThemeSpec} contract.
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
 * import { Theme1 } from "src/theming/themes";
 * import { getTheme } from "src/theming/utils";
 * import { createTheme } from "@mui/material/styles";
 *
 * const muiTheme = createTheme(getTheme(Theme1));
 * ```
 */
const theme: Theme1Spec = {
  name: "theme1",
  designSystem: "theme1",
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
