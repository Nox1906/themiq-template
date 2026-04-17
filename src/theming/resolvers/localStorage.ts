/**
 * localStorage Resolver
 *
 * Initialises the active theme from a `localStorage` key on first render.
 *
 * NOTE — this resolver is read-only at initialisation.
 * It reads the stored theme once when the component mounts and does not
 * expose a setter. If you also need a UI control to change the theme at
 * runtime and persist the new choice, use the `uiToggle` resolver instead —
 * the provider there can be seeded from `localStorage` and any component
 * using `useThemeControl()` can write back to storage as needed.
 *
 * ### Characteristics
 * - **Reads synchronously on mount**: uses `useState`'s lazy initialiser, so
 *   the theme is available on the very first render — no flicker.
 * - **Not reactive** to external storage changes: if another browser tab
 *   updates the same key, this resolver will not react. Add a native
 *   `window.addEventListener('storage', ...)` listener if cross-tab sync is
 *   required.
 *
 * ### When to use
 * Best for **restoring a previously saved user preference** on page load when
 * a theme toggle exists elsewhere (e.g. a settings page that writes to
 * `localStorage` directly) and the only goal here is to pick it back up.
 *
 * ### Registering this resolver
 * In `resolvers/index.ts`:
 * ```ts
 * import { createLocalStorageResolver } from './localStorage';
 *
 * export const useThemeResolver = createLocalStorageResolver({
 *   storageKey: 'chameleon-theme',  // optional — this is the default
 *   fallback:   'theme1',
 * });
 * ```
 */

import { useState } from "react";
import type { ThemeSpec } from "../themes/spec";
import type { UseThemeResolver, ResolverConfig } from "./types";

/** Configuration for the localStorage resolver. */
export interface LocalStorageResolverConfig extends ResolverConfig {
  /**
   * The `localStorage` key to read the theme name from.
   * @default 'chameleon-theme'
   */
  storageKey?: string;
}

/**
 * Creates a resolver that initialises the theme from `localStorage`.
 *
 * The `useState` lazy initialiser runs synchronously on first mount, reading
 * the value from storage without triggering an extra render cycle.
 */
export function createLocalStorageResolver(
  config: LocalStorageResolverConfig,
): UseThemeResolver {
  const { fallback, storageKey = "chameleon-theme" } = config;

  return function useThemeResolver(): ThemeSpec["name"] {
    /**
     * `useState` lazy initialiser — runs once on mount, synchronously.
     * The stored string is cast to `ThemeSpec['name']`; if it is not a
     * registered theme, `PlatformTheme`'s `!spec` guard handles the fallback
     * gracefully at render time with a console warning.
     */
    const [themeName] = useState<ThemeSpec["name"]>(() => {
      const stored = localStorage.getItem(storageKey) as
        | ThemeSpec["name"]
        | null;
      return stored ?? fallback;
    });

    return themeName;
  };
}
