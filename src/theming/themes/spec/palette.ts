/**
 * Palette type specification for the design system.
 *
 * All theme palette files must export a value satisfying {@link ThemeSpecPalette}.
 * Colors are sourced from `primitives.ts` and mapped to semantic roles.
 *
 * ### Adding a new semantic color role
 * 1. Add the property to {@link ThemeSpecPalette} below
 * 2. Implement it in every theme's `palette.ts`
 * 3. To expose it as `theme.palette.<role>` with full MUI typing, extend
 *    MUI's `Palette` interface in `types.d.ts`:
 *    ```ts
 *    declare module "@mui/material/styles" {
 *      interface Palette       { brand: ColorVariant; }
 *      interface PaletteOptions { brand?: Partial<ColorVariant>; }
 *    }
 *    ```
 *
 * ### Color scale keys
 * Beyond the four required MUI fields, each color can include optional
 * numeric scale keys for fine-grained component usage:
 *
 * | Key     | Intended use                                      |
 * |---------|---------------------------------------------------|
 * | `"0"`   | Very light tint — page/section backgrounds        |
 * | `"100"` | Light — borders, dividers, tag fills              |
 * | `"300"` | Medium-light — secondary icons, placeholder text  |
 * | `"600"` | Slightly darker (used by the neutral family only) |
 * | `"700"` | Dark hover — active/pressed fills                 |
 * | `"900"` | Near-black — high-contrast text, inverse surfaces |
 */

/**
 * A semantic color with the four MUI-required fields plus optional
 * design-system numeric scale keys.
 */
export type ColorVariant = {
  /** Base color — filled surfaces, icon fills, text on dark */
  main: string;
  /** Light tint — hover backgrounds, chip fills */
  light: string;
  /** Dark shade — pressed states, focus ring borders */
  dark: string;
  /** Text/icon color that achieves WCAG AA contrast over `main` */
  contrastText: string;
  /** Very light tint — page-level background washes */
  "0"?: string;
  /** Light — borders, tag backgrounds */
  "100"?: string;
  /** Medium-light — secondary icon color, placeholder text */
  "300"?: string;
  /** Slightly darker than `main` (neutral family only) */
  "600"?: string;
  /** Dark hover — active-state fills */
  "700"?: string;
  /** Darkest — near-black, high-contrast text */
  "900"?: string;
};

/**
 * Full semantic color palette.
 * Each role maps to a {@link ColorVariant} (or a subset for special cases).
 */
export type ThemeSpecPalette = {
  /** Brand primary — CTAs, active states, links, primary buttons */
  primary: ColorVariant;
  /** Brand secondary — secondary actions, tags, less prominent UI */
  secondary: ColorVariant;
  /** Positive feedback — success banners, confirmations, checkmarks */
  success: ColorVariant;
  /** Cautionary feedback — warning alerts, non-blocking notices */
  warning: ColorVariant;
  /** Destructive feedback — error messages, validation failures */
  error: ColorVariant;
  /**
   * Neutral — borders, dividers, subtle backgrounds, muted text.
   * Includes the extended scale (0–900) for fine-grained component usage.
   */
  neutral: ColorVariant;
  /**
   * Dark neutral — sidebar backgrounds, inverted surfaces, dark headers.
   * Use when neutral elements appear on dark rather than light backgrounds.
   */
  "neutral-dark": {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  /** Disabled state — inputs, buttons, and interactive elements when inactive */
  disabled: {
    /** Disabled surface fill */
    main: string;
    /** Lighter disabled surface */
    light: string;
    /** Darker disabled surface */
    dark: string;
    /** Disabled text / icon color */
    contrastText: string;
  };
  /** Pure black and white — use sparingly for absolute-value needs */
  common: {
    black: string;
    white: string;
  };
  /** Page and surface background colors */
  background: {
    /** Default page background */
    default: string;
  };
};
