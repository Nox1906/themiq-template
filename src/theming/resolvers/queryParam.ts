/**
 * Query Parameter Resolver
 *
 * Reads the active theme from a URL query parameter (default key: `theme`).
 *
 * Examples:
 * - `https://app.example.com/?theme=theme1`  →  `"theme1"`
 * - `https://app.example.com/?theme=theme2`  →  `"theme2"`
 * - `https://app.example.com/`               →  `config.fallback`
 *
 * ### Characteristics
 * - **Reactive**: responds to client-side navigation that changes the query
 *   string (powered by React Router's `useSearchParams`). When the parameter
 *   is added or removed, `PlatformTheme` re-renders with the new theme.
 * - Not persistent: the parameter must be present in the URL on every visit.
 *
 * ### When to use
 * Best for **QA / testing environments** where engineers preview a different
 * theme without changing code, or for **shareable staged-review links** that
 * include a visual-variant override.
 *
 * ### Requirements
 * The component tree must be wrapped by a React Router `<Router>` context for
 * `useSearchParams` to work.
 *
 * ### Registering this resolver
 * In `resolvers/index.ts`:
 * ```ts
 * import { createQueryParamResolver } from './queryParam';
 *
 * export const useThemeResolver = createQueryParamResolver({
 *   paramName: 'theme',  // optional — this is the default
 *   fallback:  'theme1',
 * });
 * ```
 */

import { useSearchParams } from "react-router-dom";

import type { ThemeSpec } from "../themes/spec";
import type { ResolverConfig,UseThemeResolver } from "./types";

/** Configuration for the query parameter resolver. */
export interface QueryParamResolverConfig extends ResolverConfig {
  /**
   * The URL query parameter key to read the theme name from.
   * @default 'theme'
   */
  paramName?: string;
}

/**
 * Creates a resolver that reads the theme name from a URL query parameter.
 *
 * The hook is reactive — it re-renders `PlatformTheme` whenever the parameter
 * value changes during client-side navigation.
 */
export function createQueryParamResolver(
  config: QueryParamResolverConfig,
): UseThemeResolver {
  const { fallback, paramName = "theme" } = config;

  return function useThemeResolver(): ThemeSpec["name"] {
    const [searchParams] = useSearchParams();

    /**
     * Read the raw value from the query string and cast it to the theme name
     * union. If the value is not a registered theme name, `PlatformTheme`'s
     * `!spec` guard will emit a console warning and fall back gracefully.
     */
    const value = searchParams.get(paramName) as ThemeSpec["name"] | null;
    return value ?? fallback;
  };
}
