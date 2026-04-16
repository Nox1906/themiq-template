import type { ThemeSpec } from "../spec";
import typography from "./typography";
import palette from "./palette";
import shadows from "./shadows";

export const spacing = 4;

export const borderRadius = 8;

export type Theme1Spec = ThemeSpec & {
  name: "theme1";
  designSystem: "theme1";
};

const theme: Theme1Spec = {
  name: "theme1",
  designSystem: "theme1",
  typography,
  palette,
  shadows,
  spacing,
  borderRadius,
};

export default theme;
