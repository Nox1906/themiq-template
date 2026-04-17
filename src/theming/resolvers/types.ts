import type { ThemeSpec } from "../themes/spec";

/**
 * The contract every theme resolver must satisfy.
 *
 * A resolver is a **React hook** (it may internally call other hooks such as
 * `useState`, `useEffect`, or `useMediaQuery`). It is called once per render
 * of `PlatformTheme` and must always return a valid `ThemeSpec['name']`.
 *
 * ### Rules
 * - Always returns a value — never `undefined` or `null`.
 * - Async resolvers must return the `fallback` synchronously on the very first
 *   render, then update to the resolved value once the async operation
 *   completes. This avoids suspending `PlatformTheme` or requiring a loader.
 * - May be reactive: if the returned value changes across renders (e.g. the
 *   user toggles a theme switch), `PlatformTheme` will re-compute the MUI
 *   theme object automatically via its `useMemo` dependency on `themeName`.
 *
 * ### Implementing a custom resolver
 * 1. Create a factory function that accepts a typed configuration object.
 * 2. Return a hook named `useThemeResolver` that returns `ThemeSpec['name']`.
 * 3. Export the factory from a new file in this `resolvers/` folder.
 * 4. Switch to it by updating `resolvers/index.ts`.
 *
 * @example
 * ```ts
 * // resolvers/myResolver.ts
 * export function createMyResolver(config: MyConfig): UseThemeResolver {
 *   return function useThemeResolver(): ThemeSpec['name'] {
 *     // your logic, may call React hooks
 *     return 'theme1';
 *   };
 * }
 * ```
 */
export type UseThemeResolver = () => ThemeSpec["name"];

/**
 * A resolver variant that can signal **"no opinion"** by returning `null`.
 *
 * Used exclusively inside a `createComposedResolver` chain. Each step in the
 * chain returns either a theme name (matched) or `null` (pass-through), and
 * the composed resolver returns the first non-null result.
 *
 * ### Why a separate type?
 * React's rules of hooks forbid conditional hook calls, so a composed resolver
 * must call **all** hooks in the chain unconditionally on every render. The
 * `null` return is how each step signals "this strategy has nothing to say",
 * without the caller having to know whether the step fell back or matched.
 *
 * All `create*Resolver` factory functions in this folder expose an optional
 * sibling factory — e.g. `createUrlSlugResolver` also exports
 * `createOptionalUrlSlugResolver` — that returns this type instead.
 *
 * @see `createComposedResolver` in `./composed`
 */
export type UseOptionalThemeResolver = () => ThemeSpec["name"] | null;

/**
 * Minimal configuration shared by all resolver factories that need a fallback.
 *
 * Extend this interface in your own resolver's config type:
 * ```ts
 * export interface MyResolverConfig extends ResolverConfig {
 *   myOption: string;
 * }
 * ```
 */
export interface ResolverConfig {
  /**
   * The theme name to use when the resolver cannot determine a match.
   *
   * Must be a value registered in the `ThemeSpec['name']` union.
   * `PlatformTheme` will emit a console warning and use the first
   * registered theme if even this fallback is not found at runtime.
   */
  fallback: ThemeSpec["name"];
}
