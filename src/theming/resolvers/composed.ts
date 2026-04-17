/**
 * Composed (Priority Chain) Resolver
 *
 * Combines multiple **optional resolvers** into a single priority-ordered
 * chain. The composed resolver calls every step unconditionally (required by
 * React's rules of hooks) and returns the **first non-null result**, falling
 * back to `config.fallback` only if all steps return `null`.
 *
 * ### Why "optional" resolvers?
 * Each step uses `UseOptionalThemeResolver` — a variant that returns
 * `ThemeSpec['name'] | null` instead of always returning a name. A `null`
 * return means "this strategy has no opinion for the current context", which
 * allows the next step in the chain to take over. Every resolver module in
 * this folder exposes a `createOptional*` sibling factory for this purpose.
 *
 * ### Rules of hooks constraint
 * Because hooks must be called unconditionally, **all** resolvers in the chain
 * are called on every render, even those after the first matching one. This is
 * safe — later steps simply return `null` once an earlier step has matched.
 * The performance cost is proportional to the number of steps, not the first
 * match position.
 *
 * ### When to use
 * Best when the selection strategy has a **natural priority order**:
 * - First check if the host injected a specific theme (prop injection)
 * - Then check if the URL carries a QA override (?theme=…)
 * - Then check the user's role
 * - Finally fall back to the user's stored preference
 *
 * A composed resolver is also the right tool for "follow OS preference by
 * default, but allow the user to override it via a toggle".
 *
 * ### Registering this resolver
 * In `resolvers/index.ts`:
 * ```ts
 * import { createComposedResolver }               from './composed';
 * import { createOptionalPropInjectionResolver }  from './propInjection';
 * import { createOptionalQueryParamResolver }     from './queryParam';
 * import { createOptionalUserRoleResolver }       from './userRole';
 * import { createOptionalLocalStorageResolver }   from './localStorage';
 * import { useAuthRole }                          from '../auth/useAuthRole';
 *
 * export const useThemeResolver = createComposedResolver(
 *   [
 *     // Highest priority: host-injected theme (micro-frontend / test harness)
 *     createOptionalPropInjectionResolver(),
 *
 *     // Second: QA override via ?theme= query parameter
 *     createOptionalQueryParamResolver({ paramName: 'theme' }),
 *
 *     // Third: user's authenticated role
 *     createOptionalUserRoleResolver({
 *       useRole: useAuthRole,
 *       roleMapping: { admin: 'theme2', user: 'theme1' },
 *     }),
 *
 *     // Lowest-priority explicit strategy: saved localStorage preference
 *     createOptionalLocalStorageResolver({ storageKey: 'chameleon-theme' }),
 *   ],
 *   { fallback: 'theme1' },  // used only if ALL steps return null
 * );
 * ```
 *
 * ### Adding optional variants to existing resolvers
 * Every `create*Resolver` factory in this folder exposes a
 * `createOptional*Resolver` sibling. See the JSDoc in each module for the
 * exact export name and configuration shape — they accept the same config
 * minus the `fallback` field (since the composed resolver owns the fallback).
 */

import type { ThemeSpec } from "../themes/spec";
import type {
  UseThemeResolver,
  UseOptionalThemeResolver,
  ResolverConfig,
} from "./types";

/**
 * Creates a resolver that evaluates a list of optional resolvers in priority
 * order and returns the first non-null result.
 *
 * @param steps    - Ordered list of optional resolvers (highest to lowest priority).
 * @param config   - Must include `fallback`, used when all steps return `null`.
 */
export function createComposedResolver(
  steps: UseOptionalThemeResolver[],
  config: ResolverConfig,
): UseThemeResolver {
  const { fallback } = config;

  return function useThemeResolver(): ThemeSpec["name"] {
    /**
     * Call every step unconditionally — React's rules of hooks require that
     * the same hooks are called on every render in the same order. The `map`
     * call preserves that order; steps that have already "yielded" to a
     * higher-priority match simply return `null` at negligible cost.
     */
    const results = steps.map((step) => step());

    /**
     * Return the first non-null result (the highest-priority strategy that
     * had an opinion this render), or the guaranteed fallback if none matched.
     */
    return results.find((r): r is ThemeSpec["name"] => r !== null) ?? fallback;
  };
}
