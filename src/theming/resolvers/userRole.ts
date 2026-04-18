/**
 * User Role Resolver
 *
 * Selects the active theme based on the authenticated user's role, obtained
 * from a caller-supplied hook. The resolver is decoupled from any specific
 * authentication library — it accepts any hook that returns a role string.
 *
 * ### Characteristics
 * - **Reactive**: re-evaluates whenever the supplied `useRole` hook returns a
 *   different value (e.g. after login, logout, or an in-session role change).
 * - Requires an auth context to be initialised above `PlatformTheme` in the
 *   component tree.
 *
 * ### When to use
 * Best for **RBAC-driven UIs** where different user types see distinct visual
 * skins — for example, an internal staff dashboard vs. an end-user portal, or
 * a free tier vs. a premium tier with distinct branding.
 *
 * ### Registering this resolver
 * In `resolvers/index.ts`:
 * ```ts
 * import { createUserRoleResolver } from './userRole';
 * import { useAuthRole } from '../auth/useAuthRole'; // your own auth hook
 *
 * export const useThemeResolver = createUserRoleResolver({
 *   useRole: useAuthRole,
 *   roleMapping: {
 *     admin:   'theme2',
 *     user:    'theme1',
 *     guest:   'theme1',
 *   },
 *   fallback: 'theme1',
 * });
 * ```
 */

import type { ThemeSpec } from "../themes/spec";
import type { ResolverConfig,UseThemeResolver } from "./types";

/** Configuration for the user role resolver. */
export interface UserRoleResolverConfig extends ResolverConfig {
  /**
   * A React hook that returns the current user's role string.
   *
   * Return `null` or `undefined` when no user is authenticated — the resolver
   * will use `fallback` in that case.
   *
   * The hook is called on every render, so it must follow React's
   * rules of hooks (no conditional calls).
   *
   * @example
   * ```ts
   * useRole: () => useAuth().user?.role
   * ```
   */
  useRole: () => string | null | undefined;

  /**
   * Map of `role → themeName`.
   *
   * Roles not present in this map resolve to `fallback`. Add entries here
   * when introducing new user roles or theme variants.
   */
  roleMapping: Record<string, ThemeSpec["name"]>;
}

/**
 * Creates a resolver that maps authenticated user roles to theme names.
 *
 * The returned hook delegates to `config.useRole` on every render, so the
 * theme is automatically updated if the user's role changes mid-session.
 */
export function createUserRoleResolver(
  config: UserRoleResolverConfig,
): UseThemeResolver {
  const { fallback, roleMapping, useRole } = config;

  return function useThemeResolver(): ThemeSpec["name"] {
    /** The current user's role, or `null`/`undefined` when unauthenticated. */
    const role = useRole();

    if (role && roleMapping[role]) {
      return roleMapping[role];
    }

    /** No role, unknown role, or unauthenticated — use the fallback. */
    return fallback;
  };
}
