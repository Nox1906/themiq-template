/**
 * Active Theme Resolver
 * ─────────────────────────────────────────────────────────────────────────────
 * THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE THEMING STRATEGY.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * A "resolver" is a React hook factory. The factory accepts a configuration
 * object and returns a `useThemeResolver()` hook. `PlatformTheme` calls that
 * hook once per render to obtain the current theme name.
 *
 * ## How to switch strategy
 *
 * 1. Replace the import at the top of this file with the desired resolver module.
 * 2. Replace the factory call + configuration object below.
 *
 * For more resolver types, see **Themiq Pro** — https://themiq.io/pro
 */

// ─── Active resolver ─────────────────────────────────────────────────────────
// Change THIS import to switch strategies. Uncomment the one you want and
// remove or comment out the current one.

// For more resolver types, see Themiq Pro — https://themiq.io/pro
import { createUrlSlugResolver } from "./urlSlug";

// ─── Resolver configuration ───────────────────────────────────────────────────
// Change THIS call (and the object below) to configure the active strategy.

/**
 * The hook that `PlatformTheme` calls to resolve the current theme name.
 *
 * Must satisfy the `UseThemeResolver` contract defined in `./types`.
 */
export const useThemeResolver = createUrlSlugResolver({
  /**
   * Maps URL path slugs to theme names.
   *
   * Add an entry here when onboarding a new app slug → theme pairing.
   * The key is the first path segment of the URL (e.g. `"my-app"` for
   * `/my-app/dashboard`).
   */
  slugMapping: {
    "theme1-app": "theme1",
    "theme2-app": "theme2",
  },

  /** Theme used when no slug matches or the URL has no first segment. */
  fallback: "theme1",
});
