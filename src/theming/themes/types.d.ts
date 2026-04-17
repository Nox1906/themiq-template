/**
 * MUI theme module augmentation for the Chameleon design system.
 *
 * This file extends MUI's built-in `Theme` interface so that `useTheme()`,
 * `styled()`, and `makeStyles()` automatically return the design-system-specific
 * properties (`name`, `designSystem`, extended `palette` and `typography`).
 *
 * TypeScript's declaration merging picks up re-declarations inside
 * `declare module "…"` globally — no explicit import is needed in consuming files.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ### Exposing a new custom palette color as `theme.palette.<role>`
 * ─────────────────────────────────────────────────────────────────────────────
 * ```ts
 * // 1. Add the field to ThemeSpecPalette in spec/palette.ts
 * // 2. Implement it in every theme's palette.ts
 * // 3. Declare it here so MUI's typed APIs are aware of it:
 * declare module "@mui/material/styles" {
 *   interface Palette       { brand: ColorVariant; }
 *   interface PaletteOptions { brand?: Partial<ColorVariant>; }
 * }
 * ```
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ### Adding a new typography variant to `<Typography variant="…">`
 * ─────────────────────────────────────────────────────────────────────────────
 * ```ts
 * declare module "@mui/material/styles" {
 *   interface TypographyVariants       { code: React.CSSProperties; }
 *   interface TypographyVariantsOptions { code?: React.CSSProperties; }
 * }
 * declare module "@mui/material/Typography" {
 *   interface TypographyPropsVariantOverrides { code: true; }
 * }
 * ```
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ### Registering a new theme
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Create the theme folder and export it from `themes/index.ts`
 * 2. Add its name to the `name` / `designSystem` unions in `spec/index.ts`
 * 3. `IntegrationEngineThemeName` below updates automatically because it is
 *    derived from the `themes/index.ts` module exports.
 */
import type * as themes from ".";
import type { ThemeSpec } from "./spec";
import type { ThemeSpecTypography } from "./spec/typography";
import type { ThemeOptions as MuiThemeOptions } from "@mui/material/styles";

/** Union of all registered theme objects (derived from `themes/index.ts` exports). */
export type IntegrationEngineTheme = (typeof themes)[keyof typeof themes];

/** Union of name strings for all registered themes. */
export type IntegrationEngineThemeName = IntegrationEngineTheme["name"];

declare module "@mui/material/styles" {
  interface Theme {
    /** The active theme's identifier string (e.g. `"theme1"`). */
    name: IntegrationEngineThemeName;
    /**
     * The design system implemented by this theme.
     * Useful for conditionally applying design-system-specific overrides.
     */
    designSystem: ThemeSpec["designSystem"];
    palette: ThemeSpec["palette"];
    typography: ThemeSpecTypography;
    shadows: string[];
  }

  /**
   * Re-declared to return the design-system-extended `Theme` type.
   *
   * @example
   * ```ts
   * import { createTheme } from "@mui/material/styles";
   * import { Theme1 } from "src/theming/themes";
   * import { getTheme } from "src/theming/utils";
   *
   * const muiTheme = createTheme(getTheme(Theme1));
   * ```
   */
  function createTheme(options?: MuiThemeOptions, ...args: object[]): Theme;

  /**
   * Extends MUI's `theme.shape` with the design-system named radius scale.
   *
   * All keys are available after `createTheme(getTheme(myTheme))`:
   * ```ts
   * theme.shape.sm    // 8  — buttons, cards
   * theme.shape.full  // 9999 — avatars, pills
   * ```
   *
   * Source of truth: `spec/shape.ts` + each theme's `shape.ts`.
   */
  interface Shape {
    none: 0;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    full: number;
  }
}

declare module "@mui/material/styles" {
  /**
   * Registers `xxs` as a valid breakpoint key throughout MUI.
   *
   * After this, all MUI APIs accept `"xxs"`:
   * ```ts
   * theme.breakpoints.up("xxs")
   * <Box sx={{ display: { xxs: "none", md: "flex" } }} />
   * ```
   *
   * The pixel value for `xxs` is defined in each theme's `breakpoints.ts`.
   */
  interface BreakpointOverrides {
    xxs: true;
  }
}
