import type { Breakpoint as MuiBreakpoint } from "@mui/material";

type Breakpoint = MuiBreakpoint | "xxs";

type VariantConfiguration = {
  fontSize: number | string;
  fontFamily?: string;
  fontWeight: number | string;
  letterSpacing?: number | string;
  lineHeight?: number | string;
  textTransform?:
    | "none"
    | "uppercase"
    | "capitalize"
    | "full-size-kana"
    | "full-width"
    | "lowercase";
};

export type ThemeSpecTypography = {
  htmlFontSize: number;
  fontFamily: string;
  h1: VariantConfiguration;
  h2: VariantConfiguration;
  h3: VariantConfiguration;
  h4: VariantConfiguration;
  h5: VariantConfiguration;
  h6: VariantConfiguration;
  body1: VariantConfiguration;
  body2: VariantConfiguration;
  subtitle1: VariantConfiguration;
  subtitle2: VariantConfiguration;
  caption: VariantConfiguration;
  overline: VariantConfiguration;
  button: VariantConfiguration;
  iconography: Record<Breakpoint, string>;
};
