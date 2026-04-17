/**
 * Tenant / Org ID Resolver
 *
 * Selects the active theme based on the authenticated user's **organisation
 * or tenant identifier**, obtained from a caller-supplied hook. This is
 * distinct from the `userRole` resolver: role-based theming differentiates
 * *individuals within an org*, while tenant-based theming differentiates
 * *the org itself* — typically to apply a customer's brand (white-labelling).
 *
 * ### Characteristics
 * - **Reactive**: re-evaluates whenever the supplied `useTenant` hook returns
 *   a different value (e.g. after login or a tenant-context switch).
 * - Decoupled from any specific authentication library — accepts any hook
 *   that returns a tenant/org identifier string.
 *
 * ### When to use
 * Best for **white-label SaaS** products where each customer organisation is
 * served the same application code but with their own branded colour palette,
 * typography, and component styling: `org-a` → `theme1`, `org-b` → `theme2`.
 *
 * ### Difference from `userRole`
 * | | userRole | tenant |
 * |---|---|---|
 * | Granularity | Per user | Per organisation |
 * | Purpose | RBAC skins | White-labelling |
 * | Source of truth | Auth token `role` claim | Auth token `org_id` / `tenant` claim |
 *
 * ### Registering this resolver
 * In `resolvers/index.ts`:
 * ```ts
 * import { createTenantResolver } from './tenant';
 * import { useOrgId } from '../auth/useOrgId'; // your own auth hook
 *
 * export const useThemeResolver = createTenantResolver({
 *   useTenant: useOrgId,
 *   tenantMapping: {
 *     'org-abc': 'theme1',
 *     'org-xyz': 'theme2',
 *   },
 *   fallback: 'theme1',
 * });
 * ```
 */

import type { ThemeSpec } from "../themes/spec";
import type {
  UseThemeResolver,
  UseOptionalThemeResolver,
  ResolverConfig,
} from "./types";

/** Configuration for the tenant resolver. */
export interface TenantResolverConfig extends ResolverConfig {
  /**
   * A React hook that returns the current user's organisation or tenant
   * identifier string.
   *
   * Return `null` or `undefined` when no user is authenticated, or when the
   * tenant context has not yet been resolved. The resolver will use `fallback`
   * in that case.
   *
   * The hook is called on every render and must follow React's rules of hooks.
   *
   * @example
   * ```ts
   * useTenant: () => useAuth().session?.org_id
   * ```
   */
  useTenant: () => string | null | undefined;

  /**
   * Map of `tenantId → themeName`.
   *
   * Each key is an organisation or tenant identifier as returned by
   * `useTenant`. Tenants not present in this map resolve to `fallback`.
   *
   * Add entries here when onboarding a new customer with their own brand:
   * ```ts
   * tenantMapping: {
   *   'existing-org': 'theme1',
   *   'new-customer':  'theme2',  // ← new entry
   * }
   * ```
   */
  tenantMapping: Record<string, ThemeSpec["name"]>;
}

/**
 * Creates a resolver that maps the authenticated user's tenant / org ID to a
 * theme name.
 *
 * For use in composed chains, prefer `createOptionalTenantResolver` — it
 * returns `null` instead of `fallback` when the tenant is unrecognised, which
 * allows a downstream resolver in the chain to take over.
 */
export function createTenantResolver(
  config: TenantResolverConfig,
): UseThemeResolver {
  const { fallback, tenantMapping, useTenant } = config;

  return function useThemeResolver(): ThemeSpec["name"] {
    const tenantId = useTenant();

    if (tenantId && tenantMapping[tenantId]) {
      return tenantMapping[tenantId];
    }

    /** Unauthenticated, unknown tenant ID, or mapping not yet populated. */
    return fallback;
  };
}

/**
 * Optional variant for use inside `createComposedResolver`.
 *
 * Returns `null` when the tenant is not authenticated or not found in the
 * mapping, allowing a lower-priority resolver in the composition chain to
 * handle the case instead of hard-falling to `fallback`.
 */
export function createOptionalTenantResolver(
  config: TenantResolverConfig,
): UseOptionalThemeResolver {
  const { tenantMapping, useTenant } = config;

  return function useThemeResolver(): ThemeSpec["name"] | null {
    const tenantId = useTenant();

    if (tenantId && tenantMapping[tenantId]) {
      return tenantMapping[tenantId];
    }

    return null;
  };
}
