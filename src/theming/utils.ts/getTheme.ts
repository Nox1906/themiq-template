import { createTheme } from "@mui/material/styles";
import type { ThemeSpec } from "../themes/spec";
import createShadows from "./createShadows";

function interpretColor(color: string | { main: string }) {
  if (typeof color === "string") {
    return { main: color };
  }

  return color;
}

export default function createCustomTheme(theme: ThemeSpec) {
  if (!theme.name) {
    throw new Error(
      "Theme must have a name. Please provide theme.name property.",
    );
  }

  const resultTheme = createTheme({
    palette: {
      ...theme.palette,
      primary: interpretColor(theme.palette.primary),
      secondary: interpretColor(theme.palette.secondary),
      error: interpretColor(theme.palette.error),
      warning: interpretColor(theme.palette.warning),
      success: interpretColor(theme.palette.success),
      background: {
        ...theme.palette.background,
        paper: theme.palette.common.white,
        default: theme.palette.background.default,
      },
    },
    typography: theme.typography,
    shape: {
      borderRadius: theme.borderRadius,
    },
    spacing: theme.spacing,
    shadows: createShadows(theme.shadows),
  });

  resultTheme.name = theme.name;
  resultTheme.designSystem = theme.designSystem;

  return resultTheme;
}
