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
 * | Strategy        | Module              | Best for                                |
 * |-----------------|---------------------|-----------------------------------------|
 * | URL slug ✓      | `./urlSlug`         | Multi-app platform (current)            |
 * | Query parameter | `./queryParam`      | QA / staging preview links              |
 * | User role       | `./userRole`        | RBAC — different skins per role         |
 * | Tenant / org    | `./tenant`          | White-labelling per customer org        |
 * | localStorage    | `./localStorage`    | Restore saved preference on page load   |
 * | UI toggle       | `./uiToggle`        | Runtime toggle / theme-picker button    |
 * | OS preference   | `./osPreference`    | Auto dark mode via prefers-color-scheme |
 * | Hostname        | `./hostname`        | Multi-tenant / custom-domain theming    |
 * | Remote config   | `./remoteConfig`    | Ops-controlled rollout                  |
 * | A/B experiment  | `./abExperiment`    | Per-user cohort assignment via any SDK  |
 * | Prop injection  | `./propInjection`   | Micro-frontend shell / Storybook        |
 * | Composed chain  | `./composed`        | Priority fallback across strategies     |
 *
 * ## Examples
 *
 * ### Switch to OS dark mode
 * ```ts
 * import { createOsPreferenceResolver } from './osPreference';
 *
 * export const useThemeResolver = createOsPreferenceResolver({
 *   light: 'theme1',
 *   dark:  'theme2',
 * });
 * ```
 *
 * ### Switch to user-role-based theming
 * ```ts
 * import { createUserRoleResolver } from './userRole';
 * import { useAuthRole } from '../auth/useAuthRole';  // your own auth hook
 *
 * export const useThemeResolver = createUserRoleResolver({
 *   useRole: useAuthRole,
 *   roleMapping: { admin: 'theme2', user: 'theme1' },
 *   fallback: 'theme1',
 * });
 * ```
 *
 * ### Switch to UI toggle (requires a provider above PlatformTheme)
 * ```ts
 * // resolvers/index.ts
 * import { createUiToggleResolver } from './uiToggle';
 * export const useThemeResolver = createUiToggleResolver();
 *
 * // main.tsx — wrap PlatformTheme with the provider
 * import { ThemeControlProvider } from './theming/resolvers/uiToggle';
 * <ThemeControlProvider defaultTheme="theme1">
 *   <PlatformTheme>...</PlatformTheme>
 * </ThemeControlProvider>
 * ```
 *
 * ### Switch to remote config / A/B testing
 * ```ts
 * import { createRemoteConfigResolver } from './remoteConfig';
 *
 * export const useThemeResolver = createRemoteConfigResolver({
 *   endpoint: '/api/theme-config',  // MUST be a trusted internal URL
 *   fallback: 'theme1',
 * });
 * ```
 */

// ─── Active resolver ─────────────────────────────────────────────────────────
// Change THIS import to switch strategies. Uncomment the one you want and
// remove or comment out the current one.

import { createUrlSlugResolver } from "./urlSlug";
// import { createQueryParamResolver }    from './queryParam';
// import { createUserRoleResolver }      from './userRole';
// import { createTenantResolver }        from './tenant';
// import { createLocalStorageResolver }  from './localStorage';
// import { createUiToggleResolver }      from './uiToggle';
// import { createOsPreferenceResolver }  from './osPreference';
// import { createHostnameResolver }      from './hostname';
// import { createRemoteConfigResolver }  from './remoteConfig';
// import { createAbExperimentResolver }  from './abExperiment';
// import { createPropInjectionResolver } from './propInjection';
// import { createComposedResolver }      from './composed';

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
