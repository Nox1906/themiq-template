import primitives from "../primitives";
import type { ThemeSpecPalette } from "../spec/palette";

/**
 * Theme2 color palette.
 *
 * Maps design-token primitives (`../primitives`) to the semantic roles
 * defined by {@link ThemeSpecPalette}.
 *
 * Currently identical to Theme1's palette — diverge colors here as the
 * Theme2 design evolves.
 *
 * ### Changing a color
 * Replace the primitive reference with another entry from `primitives.ts`
 * or a raw hex string:
 * ```ts
 * primary: {
 *   main: primitives.purple[500],  // ← swap brand color
 *   light: primitives.purple[50],
 *   dark: primitives.purple[700],
 *   contrastText: primitives.white,
 * },
 * ```
 *
 * ### Adding numeric scale keys
 * Components can access `theme.palette.primary["100"]` when the optional
 * scale keys are populated. Add them as needed:
 * ```ts
 * primary: {
 *   main:  primitives.purple[500],
 *   light: primitives.purple[50],
 *   dark:  primitives.purple[700],
 *   contrastText: primitives.white,
 *   // — optional scale keys —
 *   "0":   primitives.purple[0],
 *   "100": primitives.purple[100],
 *   "300": primitives.purple[300],
 *   "700": primitives.purple[700],
 *   "900": primitives.purple[900],
 * },
 * ```
 */
const palette: ThemeSpecPalette = {
  /**
   * Primary — blue family.
   * Full scale included as a reference; add only the keys your components use.
   */
  primary: {
    main: primitives.blue[500],
    light: primitives.blue[50],
    dark: primitives.blue[700],
    contrastText: primitives.white,
    "0": primitives.blue[0],
    "100": primitives.blue[100],
    "300": primitives.blue[300],
    "700": primitives.blue[700],
    "900": primitives.blue[900],
  },

  /** Secondary — stone (grey) family. */
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

  /** Light blueish-white page background. */
  background: {
    default: primitives.blue[25],
  },
};

export default palette;
