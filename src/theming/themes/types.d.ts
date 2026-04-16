import type * as themes from ".";
import type { ThemeSpec } from "./spec";
import type { ThemeSpecTypography } from "./spec/typography";
import type { ThemeOptions as MuiThemeOptions } from "@mui/material/styles";

export type IntegrationEngineTheme = (typeof themes)[keyof typeof themes];
export type IntegrationEngineThemeName = IntegrationEngineTheme["name"];

declare module "@mui/material/styles" {
  interface Theme {
    name: IntegrationEngineThemeName;
    designSystem: ThemeSpec["designSystem"];
    palette: ThemeSpec["palette"];
    typography: ThemeSpecTypography;
    shadows: string[];
  }

  function createTheme(options?: MuiThemeOptions, ...args: object[]): Theme;
}
