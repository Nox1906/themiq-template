import type { ThemeSpecTypography } from "../spec/typography";

/**
 * Theme2 typography scale.
 *
 * Sizes are in `rem`, computed relative to {@link htmlFontSize} (12 px).
 * Use `pixelsToRem(n)` to convert a design-spec pixel value to the correct
 * rem string — all `rem` values in MUI are relative to `htmlFontSize`, not
 * the browser's 16 px default.
 *
 * Theme2 uses **Inter** as its primary font, distinguishing it from
 * Theme1 which uses Helvetica/Arial. Make sure Inter is loaded in the
 * app shell (via `@font-face`, Google Fonts, or a local asset).
 *
 * ### Changing the font family
 * Replace `fontFamily` with any valid CSS font stack:
 * ```ts
 * fontFamily: '"Roboto", "Helvetica", sans-serif',
 * ```
 *
 * ### Adjusting a variant
 * Edit the relevant entry — `fontSize` and `fontWeight` are required;
 * all other fields are optional:
 * ```ts
 * h1: {
 *   fontWeight: 700,
 *   fontSize: pixelsToRem(40),
 *   lineHeight: pixelsToRem(48),
 * },
 * ```
 *
 * ### Changing the base font size
 * Update `htmlFontSize` — all `rem` values recalculate automatically:
 * ```ts
 * const htmlFontSize = 14; // was 12
 * ```
 */

const htmlFontSize = 12;

/** Converts a pixel value to a `rem` string relative to {@link htmlFontSize}. */
function pixelsToRem(pixels: number) {
  return `${(pixels / htmlFontSize).toFixed(3)}rem`;
}

const typography: ThemeSpecTypography = {
  htmlFontSize,
  fontFamily: "Inter",

  // ── Headings ───────────────────────────────────────────────────────────────────────
  h1: {
    fontWeight: 500,
    fontSize: pixelsToRem(32),
    letterSpacing: 0,
    lineHeight: pixelsToRem(40),
  },
  h2: {
    fontWeight: 500,
    fontSize: pixelsToRem(24),
    letterSpacing: 0,
    lineHeight: pixelsToRem(32),
  },
  h3: {
    fontWeight: 500,
    fontSize: pixelsToRem(20),
    letterSpacing: 0,
    lineHeight: pixelsToRem(28),
  },
  h4: {
    fontWeight: 500,
    fontSize: pixelsToRem(16),
    letterSpacing: 0,
    lineHeight: pixelsToRem(22),
  },
  h5: {
    fontWeight: 500,
    fontSize: pixelsToRem(14),
    letterSpacing: 0,
    lineHeight: pixelsToRem(20),
  },
  h6: {
    fontWeight: 500,
    fontSize: pixelsToRem(13),
    letterSpacing: 0,
    lineHeight: pixelsToRem(18),
  },

  // ── Body ───────────────────────────────────────────────────────────────────────────
  body1: {
    fontWeight: "normal",
    fontSize: pixelsToRem(14),
    letterSpacing: 0,
    lineHeight: pixelsToRem(20),
  },
  body2: {
    fontWeight: "normal",
    fontSize: pixelsToRem(12),
    letterSpacing: 0,
    lineHeight: pixelsToRem(18),
  },
  subtitle1: {
    fontWeight: "normal",
    fontSize: pixelsToRem(16),
    letterSpacing: 0,
    lineHeight: pixelsToRem(24),
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: pixelsToRem(14),
    letterSpacing: 0,
    lineHeight: pixelsToRem(20),
  },
  caption: {
    fontWeight: "normal",
    fontSize: pixelsToRem(11),
    letterSpacing: 0,
    lineHeight: pixelsToRem(16),
  },

  // ── Utility ─────────────────────────────────────────────────────────────────────
  overline: {
    fontWeight: 500,
    fontSize: pixelsToRem(10),
    letterSpacing: pixelsToRem(1),
    textTransform: "uppercase",
    lineHeight: pixelsToRem(16),
  },
  button: {
    fontWeight: 500,
    fontSize: pixelsToRem(13),
    letterSpacing: pixelsToRem(1),
    textTransform: "uppercase",
    lineHeight: pixelsToRem(20),
  },

  // ── Icons ─────────────────────────────────────────────────────────────────────────
  iconography: {
    xxs: pixelsToRem(12),
    xs: pixelsToRem(13),
    sm: pixelsToRem(15),
    md: pixelsToRem(18),
    lg: pixelsToRem(21),
    xl: pixelsToRem(45),
  },
};

export default typography;
