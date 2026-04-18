/**
 * URL Slug Resolver
 *
 * Selects the active theme by matching the **first path segment** of the
 * current URL (`/:appSlug`) against a developer-supplied mapping.
 *
 * Examples:
 * - `/theme1-app/dashboard`  →  `"theme1"`
 * - `/theme2-app/settings`   →  `"theme2"`
 * - `/`                      →  `config.fallback`
 *
 * ### Characteristics
 * - **Resolved at module load time** — `matchPath` runs once when this module
 *   is first imported, before React mounts. The returned hook is a stable
 *   getter that causes zero additional renders.
 * - **Not reactive** to client-side navigation: if the URL changes via
 *   React Router, the theme does not update until the page is reloaded.
 *   → Use the `queryParam` resolver if you need reactive URL-driven theming.
 *
 * ### When to use
 * Best for **multi-app platforms** where each app lives under a distinct URL
 * prefix and its theme is a deployment-time concern, not a user preference.
 *
 * ### Registering this resolver
 * In `resolvers/index.ts`:
 * ```ts
 * import { createUrlSlugResolver } from './urlSlug';
 *
 * export const useThemeResolver = createUrlSlugResolver({
 *   slugMapping: {
 *     'my-app':      'theme1',
 *     'admin-portal': 'theme2',
 *   },
 *   fallback: 'theme1',
 * });
 * ```
 */

import { matchPath } from "react-router-dom";

import type { ThemeSpec } from "../themes/spec";
import type { ResolverConfig,UseThemeResolver } from "./types";

/** Shape of the URL parameters captured from `/:appSlug`. */
type AppParams = { appSlug: string };

/**
 * The first path segment of the current URL, captured **once at module load
 * time**.
 *
 * Uses `self.location` instead of `window.location` for compatibility with
 * web workers and SSR environments. The `matchPath` call mirrors what
 * React Router would do for a top-level dynamic route segment.
 */
const appParams = matchPath({ path: "/:appSlug" }, self.location.pathname)
  ?.params as AppParams | undefined;

/** Configuration for the URL slug resolver. */
export interface UrlSlugResolverConfig extends ResolverConfig {
  /**
   * Map of `appSlug → themeName`.
   *
   * Each key is the first URL path segment (e.g. `"my-app"` for the URL
   * `/my-app/dashboard`). When a slug matches, its mapped theme is activated.
   * Unrecognised slugs fall through to `config.fallback`.
   *
   * ### Adding a new app
   * Append an entry here — no other file needs to change:
   * ```ts
   * slugMapping: {
   *   'existing-app': 'theme1',
   *   'new-app':      'theme2',  // ← new entry
   * }
   * ```
   */
  slugMapping: Record<string, ThemeSpec["name"]>;
}

/**
 * Creates a URL-slug-based theme resolver.
 *
 * The resolution runs immediately inside the factory (at the call site in
 * `resolvers/index.ts`, which is typically at module load time). The returned
 * hook is therefore a pure stable getter — it captures the resolved value in
 * a closure and returns it directly, producing no React state or side effects.
 */
export function createUrlSlugResolver(
  config: UrlSlugResolverConfig,
): UseThemeResolver {
  const { fallback, slugMapping } = config;
  const { appSlug } = appParams ?? {};

  /** The resolved theme name — stable for the entire page lifetime. */
  const resolved: ThemeSpec["name"] =
    appSlug && slugMapping[appSlug] ? slugMapping[appSlug] : fallback;

  return function useThemeResolver(): ThemeSpec["name"] {
    return resolved;
  };
}
