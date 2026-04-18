/**
 * A/B Experiment Resolver
 *
 * Resolves the active theme by delegating to a **caller-supplied async
 * function** — the experiment getter. This makes the resolver SDK-agnostic:
 * plug in LaunchDarkly, Unleash, Optimizely, or a custom cohort service by
 * providing a single `getVariant` async function.
 *
 * ### Characteristics
 * - **Async**: renders synchronously with `fallback`, then updates to the
 *   experiment-assigned theme once `getVariant` resolves (one extra render).
 * - **SDK-agnostic**: the resolver does not know (or care) which experiment
 *   platform is used — it only requires a `Promise<ThemeSpec['name']>`.
 * - An `AbortSignal` is passed to `getVariant` so in-flight SDK calls can be
 *   cancelled when `PlatformTheme` unmounts.
 * - If `getVariant` rejects, the resolver keeps `fallback` and logs a warning.
 *
 * ### Difference from `remoteConfig`
 * | | remoteConfig | abExperiment |
 * |---|---|---|
 * | Data source | Internal REST endpoint | Any async function / SDK |
 * | Protocol | `fetch` + JSON | Caller decides |
 * | Use case | Ops-controlled rollout | Per-user cohort assignment |
 *
 * ### Registering this resolver
 * In `resolvers/index.ts`:
 * ```ts
 * import { createAbExperimentResolver } from './abExperiment';
 * import { experimentClient } from '../experiments/client'; // your own SDK
 *
 * export const useThemeResolver = createAbExperimentResolver({
 *   getVariant: (signal) =>
 *     experimentClient.getThemeVariant({ signal }),
 *   fallback: 'theme1',
 * });
 * ```
 *
 * ### Implementing `getVariant` with LaunchDarkly (example)
 * ```ts
 * getVariant: async () => {
 *   const variant = ldClient.variation('theme-experiment', 'theme1');
 *   // Cast to a registered theme name — validate if the source is untrusted
 *   return variant as ThemeSpec['name'];
 * }
 * ```
 */

import { useEffect,useState } from "react";

import type { ThemeSpec } from "../themes/spec";
import type { ResolverConfig,UseThemeResolver } from "./types";

/** Configuration for the A/B experiment resolver. */
export interface AbExperimentResolverConfig extends ResolverConfig {
  /**
   * An async function that resolves to the theme name assigned by the
   * experiment platform for the current user/session.
   *
   * Receives an `AbortSignal` so long-running SDK calls can be cancelled if
   * `PlatformTheme` unmounts before the promise settles. Wrap SDK calls that
   * do not natively support `AbortSignal` in a `Promise.race` against the
   * signal if needed.
   *
   * @param signal - An `AbortSignal` that fires on component unmount.
   * @returns The experiment-assigned `ThemeSpec['name']`.
   *
   * @example
   * ```ts
   * getVariant: async (signal) => {
   *   const res = await fetch('/api/experiment-variant', { signal });
   *   const { theme } = await res.json();
   *   return theme;
   * }
   * ```
   */
  getVariant: (signal: AbortSignal) => Promise<ThemeSpec["name"]>;
}

/**
 * Creates a resolver that delegates theme resolution to an async experiment
 * getter function.
 *
 * Returns `fallback` synchronously on the first render, then updates once
 * `getVariant` resolves. Uses an `AbortController` to cancel the in-flight
 * call if `PlatformTheme` unmounts.
 */
export function createAbExperimentResolver(
  config: AbExperimentResolverConfig,
): UseThemeResolver {
  const { fallback, getVariant } = config;

  return function useThemeResolver(): ThemeSpec["name"] {
    /**
     * Initialise with `fallback` so the first render is synchronous and
     * theme-aware. The state is updated (causing one re-render) after
     * `getVariant` returns the experiment-assigned variant.
     */
    const [themeName, setThemeName] = useState<ThemeSpec["name"]>(fallback);

    useEffect(() => {
      const controller = new AbortController();

      getVariant(controller.signal)
        .then((variant) => {
          setThemeName(variant);
        })
        .catch((err: Error) => {
          /**
           * AbortError is expected on unmount — ignore it silently.
           * All other rejections are logged so they surface in the console
           * without crashing the application.
           */
          if (err.name !== "AbortError") {
            console.warn(
              "[abExperiment] getVariant() rejected. " +
                `Keeping fallback theme "${fallback}".`,
              err,
            );
          }
        });

      return () => controller.abort();
      // `getVariant` and `fallback` come from the factory closure and are
      // stable for the resolver's lifetime — safe to omit from deps.
       
    }, []);

    return themeName;
  };
}
