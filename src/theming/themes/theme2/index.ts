import type { ThemeSpec } from "../spec";
import typography from "./typography";
import palette from "./palette";
import shadows from "./shadows";

export const spacing = 4;

export const borderRadius = 8;

export type Theme2Spec = ThemeSpec & {
  name: "theme2";
  designSystem: "theme2";
};

const theme: Theme2Spec = {
  name: "theme2",
  designSystem: "theme2",
  typography,
  palette,
  shadows,
  spacing,
  borderRadius,
};

export default theme;
