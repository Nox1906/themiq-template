import { matchPath } from "react-router-dom";
import type { Theme } from "@mui/material";

type AppParams = { appSlug: string };

const appParams = matchPath(
  {
    path: "/:appSlug", // Note: should be a single string, not an array
  },
  self.location.pathname,
)?.params as AppParams | undefined;

export const pickAvailableTheme = (
  themes: Array<Theme["name"]>,
  slugsToThemeMapping: Record<string, Theme["name"]>,
): Array<Theme["name"]> => {
  if (themes.length === 0) {
    return themes;
  }

  const { appSlug } = appParams || {};

  if (appSlug && slugsToThemeMapping[appSlug]) {
    return [slugsToThemeMapping[appSlug]];
  }
  return ["theme1"];
};
