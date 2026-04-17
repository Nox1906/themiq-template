/**
 * OS Preference Resolver
 *
 * Automatically selects between a "light" and "dark" theme based on the
 * operating system's colour scheme preference (`prefers-color-scheme` media
 * query).
 *
 * ### Characteristics
 * - **Reactive**: MUI's `useMediaQuery` subscribes to `matchMedia` change
 *   events, so `PlatformTheme` re-renders automatically when the user switches
 *   their system between Light and Dark mode while the app is open.
 * - Requires no configuration or user action inside the app itself.
 *
 * ### When to use
 * Best for apps that should honour the system dark mode setting automatically,
 * without requiring an explicit in-app toggle. Can be combined with the
 * `uiToggle` resolver for a "follow system / override manually" pattern.
 *
 * ### Registering this resolver
 * In `resolvers/index.ts`:
 * ```ts
 * import { createOsPreferenceResolver } from './osPreference';
 *
 * export const useThemeResolver = createOsPreferenceResolver({
 *   light: 'theme1',
 *   dark:  'theme2',
 * });
 * ```
 */

import { useMediaQuery } from "@mui/material";
import type { ThemeSpec } from "../themes/spec";
import type { UseThemeResolver } from "./types";

/** Configuration for the OS preference resolver. */
export interface OsPreferenceResolverConfig {
  /** Theme to activate when the OS is in **light** mode. */
  light: ThemeSpec["name"];
  /** Theme to activate when the OS is in **dark** mode. */
  dark: ThemeSpec["name"];
}

/**
 * Creates a resolver that maps the OS colour scheme preference to a theme.
 *
 * Uses MUI's `useMediaQuery('(prefers-color-scheme: dark)')` internally.
 * The hook subscribes to `matchMedia` change events, so the returned theme
 * name updates automatically whenever the OS preference changes.
 */
export function createOsPreferenceResolver(
  config: OsPreferenceResolverConfig,
): UseThemeResolver {
  const { light, dark } = config;

  return function useThemeResolver(): ThemeSpec["name"] {
    /**
     * `useMediaQuery` subscribes to `matchMedia` change events and triggers
     * a re-render when `prefersDark` flips, so the theme switch is seamless.
     */
    const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
    return prefersDark ? dark : light;
  };
}
