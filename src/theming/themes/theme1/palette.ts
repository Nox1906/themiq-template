import primitives from "../primitives";
import type { ThemeSpecPalette } from "../spec/palette";

/**
 * Theme1 color palette.
 *
 * Maps design-token primitives (`../primitives`) to the semantic roles
 * defined by {@link ThemeSpecPalette}.
 *
 * ### Changing a color
 * Replace the primitive reference with another entry from `primitives.ts`
 * or a raw hex string:
 * ```ts
 * primary: {
 *   main: primitives.teal[500],  // ← swap brand color
 *   light: primitives.teal[50],
 *   dark: primitives.teal[700],
 *   contrastText: primitives.white,
 * },
 * ```
 *
 * ### Adding numeric scale keys
 * Components can access `theme.palette.primary["100"]` when the optional
 * scale keys are populated. Add them as needed:
 * ```ts
 * primary: {
 *   main:  primitives.blue[500],
 *   light: primitives.blue[50],
 *   dark:  primitives.blue[700],
 *   contrastText: primitives.white,
 *   // — optional scale keys —
 *   "0":   primitives.blue[0],    // very light background wash
 *   "100": primitives.blue[100],  // border / tag fill
 *   "300": primitives.blue[300],  // secondary icon color
 *   "700": primitives.blue[700],  // dark hover
 *   "900": primitives.blue[900],  // near-black text
 * },
 * ```
 *
 * ### Changing the default page background
 * ```ts
 * background: { default: primitives.stone[0] },
 * ```
 */
const palette: ThemeSpecPalette = {
  /**
   * Primary — teal family.
   * Clean, trusted enterprise colour — used by Salesforce, Asana, and
   * other professional SaaS products. Pairs with a neutral-grey secondary.
   */
  primary: {
    main: primitives.teal[500],
    light: primitives.teal[50],
    dark: primitives.teal[700],
    contrastText: primitives.white,
    "0": primitives.teal[0],
    "100": primitives.teal[100],
    "300": primitives.teal[300],
    "700": primitives.teal[700],
    "900": primitives.teal[900],
  },

  /** Secondary — stone (cool grey) family. */
  secondary: {
    main: primitives.stone[500],
    light: primitives.stone[50],
    dark: primitives.stone[700],
    contrastText: primitives.white,
  },

  /** Success — green family. */
  success: {
    main: primitives.green[500],
    light: primitives.green[50],
    dark: primitives.green[700],
    contrastText: primitives.white,
  },

  /** Warning — orange family. */
  warning: {
    main: primitives.orange[500],
    light: primitives.orange[50],
    dark: primitives.orange[700],
    contrastText: primitives.white,
  },

  /** Error — red family. */
  error: {
    main: primitives.red[500],
    light: primitives.red[50],
    dark: primitives.red[700],
    contrastText: primitives.white,
  },

  /**
   * Neutral — stone (grey) family with full extended scale.
   * Used for borders, dividers, muted text, and subtle backgrounds.
   */
  neutral: {
    main: primitives.stone[500],
    light: primitives.stone[50],
    dark: primitives.stone[700],
    contrastText: primitives.white,
    "0": primitives.stone[0],
    "100": primitives.stone[100],
    "300": primitives.stone[300],
    "600": primitives.stone[600],
    "700": primitives.stone[700],
    "900": primitives.stone[900],
  },

  /** Neutral dark — deep stone for sidebars and inverted surfaces. */
  "neutral-dark": {
    main: primitives.stone[700],
    light: primitives.stone[100],
    dark: primitives.stone[900],
    contrastText: primitives.white,
  },

  /** Disabled — muted stone for inactive UI elements. */
  disabled: {
    main: primitives.stone[50],
    light: primitives.stone[0],
    dark: primitives.stone[100],
    contrastText: primitives.stone[300],
  },

  common: {
    black: primitives.black,
    white: primitives.white,
  },

  /** Clean white background — enterprise/professional style (Stripe, Linear). */
  background: {
    default: primitives.white,
  },
};

export default palette;
