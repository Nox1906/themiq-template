/**
 * @deprecated
 * The logic in this file has moved to `src/theming/resolvers/urlSlug.ts`.
 *
 * `PlatformTheme` no longer imports `pickAvailableTheme` from here — it
 * calls `useThemeResolver()` from `resolvers/index.ts` instead.
 *
 * This file is kept temporarily to avoid breaking any external callers.
 * It can be safely deleted once all references have been updated.
 */

import type { Theme } from "@mui/material";
import { matchPath } from "react-router-dom";

/**
 * The URL segment captured from `/:appSlug`.
 * The shape matches what `matchPath` provides for a single dynamic segment.
 */
type AppParams = { appSlug: string };

/**
 * Reads the first path segment of the current URL at **module load time**.
 *
 * Uses react-router-dom's `matchPath` against `self.location.pathname`, which
 * is evaluated once when this module is first imported — not on every render.
 * This means the captured slug is stable for the lifetime of the page load,
 * matching the intent of selecting a theme from the URL before React mounts.
 *
 * Examples:
 * - URL `/theme1-app/dashboard` → `appSlug = "theme1-app"`
 * - URL `/` → `appSlug = undefined`
 */
const appParams = matchPath(
  {
    path: "/:appSlug",
  },
  self.location.pathname,
)?.params as AppParams | undefined;

/**
 * Selects which themes are available for the current app context,
 * driven by the URL's first path segment (the *app slug*).
 *
 * ### How it works
 * 1. At module load time, `/:appSlug` is extracted from the URL
 * 2. The slug is looked up in `slugsToThemeMapping`
 * 3. If a match is found → return `[mappedThemeName]` (single-element array)
 * 4. If no match (unknown slug or no slug) → fall back to `["theme1"]`
 * 5. If `themes` is empty → return it as-is (no themes registered)
 *
 * ### Registering a new app slug → theme mapping
 * In `PlatformTheme.tsx`, extend the `slugsToThemeMapping` argument:
 * ```ts
 * pickAvailableTheme(["theme1", "theme2", "theme3"], {
 *   "theme1-app":  "theme1",
 *   "theme2-app":  "theme2",
 *   "my-new-app":  "theme3",  // ← new entry
 * });
 * ```
 *
 * ### Adding a completely new theme
 * 1. Create the theme folder + implementation (see `themes/spec/index.ts`)
 * 2. Add its name to the `themes` array in `PlatformTheme.tsx`
 * 3. Map its app slug(s) in `slugsToThemeMapping`
 *
 * @deprecated Use `createUrlSlugResolver` from `resolvers/urlSlug.ts` instead.
 *
 * @param themes - All theme names known to the application
 * @param slugsToThemeMapping - Map of `appSlug → themeName` pairs
 * @returns A single-element array with the resolved theme name, or the full
 *          `themes` array if routing information is unavailable
 */
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

  // No matching slug — fall back to the first registered theme
  return [themes[0]];
};
