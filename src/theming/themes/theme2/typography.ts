import type { ThemeSpecTypography } from "../spec/typography";

const htmlFontSize = 12;

function pixelsToRem(pixels: number) {
  return `${(pixels / htmlFontSize).toFixed(3)}rem`;
}

const typography: ThemeSpecTypography = {
  htmlFontSize,
  fontFamily: "Inter",
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
