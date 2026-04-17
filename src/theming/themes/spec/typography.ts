import type { Breakpoint as MuiBreakpoint } from "@mui/material";

/**
 * Extends MUI's default breakpoints with `"xxs"` for very small viewports
 * and icon-size targeting.
 *
 * Valid values: `"xxs" | "xs" | "sm" | "md" | "lg" | "xl"`
 */
type Breakpoint = MuiBreakpoint | "xxs";

/**
 * Configuration for a single typography variant.
 *
 * All sizes should be expressed in `rem` (use the `pixelsToRem` helper
 * in each theme file) so they scale correctly with the root `htmlFontSize`.
 *
 * ### Adding a custom typography variant
 * 1. Add its key to {@link ThemeSpecTypography} below
 * 2. Implement the value in every theme's `typography.ts`
 * 3. Register it with MUI so `<Typography variant="code">` works:
 *    ```ts
 *    // types.d.ts
 *    declare module "@mui/material/styles" {
 *      interface TypographyVariants       { code: VariantConfiguration; }
 *      interface TypographyVariantsOptions { code?: VariantConfiguration; }
 *    }
 *    declare module "@mui/material/Typography" {
 *      interface TypographyPropsVariantOverrides { code: true; }
 *    }
 *    ```
 */
type VariantConfiguration = {
  /** Font size — prefer `rem` values produced by `pixelsToRem()` */
  fontSize: number | string;
  /** Override the global `fontFamily` for this variant only */
  fontFamily?: string;
  /** Numeric weight or a CSS keyword (`"normal"`, `"bold"`) */
  fontWeight: number | string;
  /** Letter-spacing — prefer `rem` or `em` values */
  letterSpacing?: number | string;
  /** Line height — prefer `rem` values for consistent cross-browser rendering */
  lineHeight?: number | string;
  /** CSS `text-transform` applied by default for this variant */
  textTransform?:
    | "none"
    | "uppercase"
    | "capitalize"
    | "full-size-kana"
    | "full-width"
    | "lowercase";
};

/**
 * Full typography scale for a theme.
 *
 * All sizes use `rem` relative to `htmlFontSize` (not the browser 16 px default).
 * Use the local `pixelsToRem(px)` helper in each theme's `typography.ts` to
 * compute the correct rem string:
 * ```ts
 * const htmlFontSize = 12;
 * function pixelsToRem(pixels: number) {
 *   return `${(pixels / htmlFontSize).toFixed(3)}rem`;
 * }
 * ```
 *
 * ### Breakpoint keys for `iconography`
 * The `iconography` record maps all six breakpoint names to icon font-sizes
 * so icons scale with the viewport:
 * `"xxs"` `"xs"` `"sm"` `"md"` `"lg"` `"xl"` — all are required.
 */
export type ThemeSpecTypography = {
  /**
   * Root font size in pixels (set on `<html>`).
   * All `rem` values in the theme are relative to this.
   *
   * Common values: `12` (compact), `14` (default MUI), `16` (browser default).
   */
  htmlFontSize: number;

  /**
   * Global CSS font-family stack applied to all variants by default.
   * Individual variants can override it via `fontFamily`.
   */
  fontFamily: string;

  /** Top-level page / section headings */
  h1: VariantConfiguration;
  /** Section headings */
  h2: VariantConfiguration;
  /** Sub-section headings */
  h3: VariantConfiguration;
  /** Card / panel headings */
  h4: VariantConfiguration;
  /** Small headings, sidebar titles */
  h5: VariantConfiguration;
  /** Micro headings, table column headers */
  h6: VariantConfiguration;
  /** Primary body text */
  body1: VariantConfiguration;
  /** Secondary / smaller body text */
  body2: VariantConfiguration;
  /** Larger descriptive text, lead paragraphs */
  subtitle1: VariantConfiguration;
  /** Bold descriptive labels */
  subtitle2: VariantConfiguration;
  /** Helper text, footnotes, timestamps */
  caption: VariantConfiguration;
  /** Overline labels — ALL CAPS small text placed above a heading */
  overline: VariantConfiguration;
  /** Button labels — typically uppercase with letter-spacing */
  button: VariantConfiguration;
  /**
   * Icon font sizes per breakpoint.
   * All six breakpoint keys (`"xxs"` – `"xl"`) are required.
   * Use `pixelsToRem()` to keep sizes relative to `htmlFontSize`.
   */
  iconography: Record<Breakpoint, string>;
};
