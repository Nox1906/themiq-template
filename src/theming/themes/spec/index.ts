import type { ThemeSpecPalette } from "./pallete";
import type { ThemeSpecTypography } from "./typography";

export type ThemeSpec = {
  name: "theme1" | "theme2";
  designSystem: "theme1" | "theme2";
  palette: ThemeSpecPalette;
  typography: ThemeSpecTypography;
  shadows: string[];
  spacing: number;
  borderRadius: number;
};
