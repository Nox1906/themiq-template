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
 * 1. Replace the import at the top of this file with the desired resolver
 *    module (see table below).
 * 2. Replace the factory call + configuration object below.
 * 3. If the new strategy requires a provider (only `uiToggle` does), also
 *    wrap `<PlatformTheme>` with that provider in your app root — see the
 *    `uiToggle` section further below.
 *
 * ## Available strategies
 *
 * | Strategy        | Availability    | Best for                                |
 * |-----------------|-----------------|------------------------------------------|
 * | URL slug ✓      | This template   | Multi-app platform (current)             |
 * | Query parameter | Themiq Pro      | QA / staging preview links               |
 * | User role       | Themiq Pro      | RBAC — different skins per role          |
 * | Tenant / org    | Themiq Pro      | White-labelling per customer org         |
 * | localStorage    | Themiq Pro      | Restore saved preference on page load    |
 * | UI toggle       | Themiq Pro      | Runtime toggle / theme-picker button     |
 * | OS preference   | Themiq Pro      | Auto dark mode via prefers-color-scheme  |
 * | Hostname        | Themiq Pro      | Multi-tenant / custom-domain theming     |
 * | Remote config   | Themiq Pro      | Ops-controlled rollout                   |
 * | A/B experiment  | Themiq Pro      | Per-user cohort assignment via any SDK   |
 * | Prop injection  | Themiq Pro      | Micro-frontend shell / Storybook         |
 * | Composed chain  | Themiq Pro      | Priority fallback across strategies      |
 *
 * The 11 Pro strategies are available in the Themiq Pro package.
 * See https://themiq.io/pro or contact hello@themiq.io
 */

// ─── Active resolver ─────────────────────────────────────────────────────────
// Change THIS import to switch strategies. Uncomment the one you want and
// remove or comment out the current one.

// Pro resolver strategies (queryParam, userRole, tenant, localStorage, uiToggle,
// osPreference, hostname, remoteConfig, abExperiment, propInjection, composed)
// are available in Themiq Pro — https://themiq.io/pro
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
