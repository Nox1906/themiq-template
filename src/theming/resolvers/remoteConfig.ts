/**
 * Remote Config Resolver
 *
 * Fetches the active theme name from a trusted internal endpoint on mount,
 * activating it as soon as the response arrives. Uses `config.fallback` for
 * the initial synchronous render so no loading spinner is needed from the
 * caller's perspective — the theme simply updates on the next render after
 * the fetch resolves.
 *
 * ### Characteristics
 * - **Async**: one extra render cycle occurs after the fetch completes.
 * - If the request fails (network error or non-2xx status), the resolver
 *   logs a warning via `console.warn` and keeps `config.fallback`.
 * - An `AbortController` is used to cancel the in-flight request if
 *   `PlatformTheme` unmounts before the fetch resolves.
 * - Fetches only once per mount (empty `useEffect` dependency array).
 *
 * ### Expected response format
 * The endpoint must return `Content-Type: application/json` with a `"theme"`
 * property whose value is a registered `ThemeSpec['name']`:
 * ```json
 * { "theme": "theme2" }
 * ```
 *
 * ### Security
 * The `endpoint` value **must come from a trusted, internal configuration
 * source** — never from user input, URL parameters, or any external data.
 * Deriving the endpoint from user-controlled values would expose the app to
 * server-side request forgery (SSRF) and open-redirect risks.
 *
 * ### When to use
 * Best for **ops-controlled rollouts** (change the active theme globally
 * without a frontend deploy) or **A/B experiments** where the server assigns
 * a theme variant per user/session.
 *
 * ### Registering this resolver
 * In `resolvers/index.ts`:
 * ```ts
 * import { createRemoteConfigResolver } from './remoteConfig';
 *
 * export const useThemeResolver = createRemoteConfigResolver({
 *   endpoint: '/api/theme-config',   // trusted internal URL only
 *   fallback: 'theme1',
 * });
 * ```
 */

import { useState, useEffect } from "react";
import type { ThemeSpec } from "../themes/spec";
import type { UseThemeResolver, ResolverConfig } from "./types";

/** Shape of the JSON body returned by the theme config endpoint. */
interface ThemeConfigResponse {
  theme: ThemeSpec["name"];
}

/** Configuration for the remote config resolver. */
export interface RemoteConfigResolverConfig extends ResolverConfig {
  /**
   * The URL of the endpoint to fetch the theme configuration from.
   *
   * **Must be a trusted internal URL** — do not derive this from user input,
   * query parameters, or any external source.
   *
   * The endpoint must respond with:
   * ```json
   * { "theme": "theme1" }
   * ```
   */
  endpoint: string;
}

/**
 * Creates a resolver that fetches the active theme from a remote endpoint.
 *
 * Returns `fallback` synchronously on the first render, then updates to the
 * server-provided value once the `fetch` completes. The transition is handled
 * entirely inside `PlatformTheme`'s existing `useMemo`/`ThemeProvider` — no
 * special loading state is exposed to consumers.
 */
export function createRemoteConfigResolver(
  config: RemoteConfigResolverConfig,
): UseThemeResolver {
  const { fallback, endpoint } = config;

  return function useThemeResolver(): ThemeSpec["name"] {
    /**
     * Initialise with `fallback` so the very first render is synchronous
     * and theme-aware. The state updates (causing one re-render) once the
     * remote config arrives.
     */
    const [themeName, setThemeName] = useState<ThemeSpec["name"]>(fallback);

    useEffect(() => {
      /**
       * AbortController lets us cancel the request if the component unmounts
       * before the response arrives, preventing a "setState on unmounted
       * component" warning.
       */
      const controller = new AbortController();

      fetch(endpoint, { signal: controller.signal })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status} from "${endpoint}"`);
          }
          return res.json() as Promise<ThemeConfigResponse>;
        })
        .then(({ theme }) => {
          setThemeName(theme);
        })
        .catch((err: Error) => {
          /**
           * Silently ignore AbortError — it is expected on unmount.
           * Log all other failures so they are visible in the console
           * without crashing the application.
           */
          if (err.name !== "AbortError") {
            console.warn(
              `[remoteConfig] Failed to fetch theme config from "${endpoint}". ` +
                `Keeping fallback "${fallback}".`,
              err,
            );
          }
        });

      /** Cancel the in-flight request when the component unmounts. */
      return () => controller.abort();
      // `endpoint` and `fallback` are captured from the factory closure and
      // are stable for the lifetime of the resolver — safe to omit from deps.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return themeName;
  };
}
