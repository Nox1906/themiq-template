/**
 * Hostname Resolver
 *
 * Selects the active theme by matching the current page's hostname against a
 * developer-supplied map. Supports exact hostname strings including subdomains.
 *
 * Examples:
 * - `client-a.myapp.com`  →  `"theme1"`
 * - `client-b.myapp.com`  →  `"theme2"`
 * - `localhost`           →  `config.fallback`
 *
 * ### Characteristics
 * - **Resolved at module load time** — the hostname is read once from
 *   `self.location.hostname` when this module is first imported, the same
 *   stability guarantee as the URL slug resolver. The hook is a stable getter.
 * - The theme is invisible in the URL path query string — useful when you do
 *   not want the theme to be user-editable.
 *
 * ### When to use
 * Best for **multi-tenant SaaS** products where each customer has their own
 * subdomain or custom domain that maps to a branded theme (white-labelling).
 *
 * ### Registering this resolver
 * In `resolvers/index.ts`:
 * ```ts
 * import { createHostnameResolver } from './hostname';
 *
 * export const useThemeResolver = createHostnameResolver({
 *   hostnameMapping: {
 *     'client-a.myapp.com': 'theme1',
 *     'client-b.myapp.com': 'theme2',
 *   },
 *   fallback: 'theme1',
 * });
 * ```
 */

import type { ThemeSpec } from "../themes/spec";
import type { ResolverConfig,UseThemeResolver } from "./types";

/**
 * The full hostname of the current page, captured **once at module load time**.
 *
 * Examples: `"client-a.myapp.com"`, `"localhost"`, `"192.168.1.1"`.
 * Uses `self.location` for web worker and SSR compatibility.
 */
const currentHostname: string = self.location.hostname;

/** Configuration for the hostname resolver. */
export interface HostnameResolverConfig extends ResolverConfig {
  /**
   * Map of `hostname → themeName`.
   *
   * Use exact, full hostname strings — subdomains must be included. Entries
   * not present in the map fall through to `fallback`.
   *
   * @example
   * ```ts
   * { 'client-a.myapp.com': 'theme1', 'client-b.myapp.com': 'theme2' }
   * ```
   */
  hostnameMapping: Record<string, ThemeSpec["name"]>;
}

/**
 * Creates a resolver that maps `window.location.hostname` to a theme name.
 *
 * Resolution happens inside the factory call (at module load), so the
 * returned hook is a pure stable getter with no React state or effects.
 */
export function createHostnameResolver(
  config: HostnameResolverConfig,
): UseThemeResolver {
  const { fallback, hostnameMapping } = config;

  /** The resolved theme name — stable for the entire page lifetime. */
  const resolved: ThemeSpec["name"] =
    hostnameMapping[currentHostname] ?? fallback;

  return function useThemeResolver(): ThemeSpec["name"] {
    return resolved;
  };
}
