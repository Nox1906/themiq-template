/**
 * Prop / Context Injection Resolver
 *
 * Allows an **external host** (e.g. a micro-frontend shell, a test harness,
 * or a Storybook decorator) to inject the active theme name into the
 * Chameleon platform without coupling to `PlatformTheme`'s internals.
 *
 * ### How it works
 * 1. The resolver exports `ThemeNameContext` — a plain React context whose
 *    value is `ThemeSpec['name'] | null`.
 * 2. The host wraps `<PlatformTheme>` with `<ThemeNameContext.Provider value="theme2">`.
 * 3. The resolver's hook reads the context value. If present, it is used as
 *    the active theme; otherwise the resolver falls back to `config.fallback`.
 *
 * ### Characteristics
 * - **Reactive**: if the host changes the context value, `PlatformTheme`
 *   re-renders with the new theme on the next render cycle.
 * - **No API change to `PlatformTheme`**: the host uses standard React
 *   context — no new props on `PlatformTheme` are needed.
 * - **Test-friendly**: inject any theme in a unit test or Storybook story
 *   without routing setup or auth mocks.
 *
 * ### When to use
 * Best for **micro-frontend / module federation** architectures where a shell
 * application already knows which product (and therefore which theme) is being
 * rendered, and passes that information down via context rather than relying on
 * URL or user data. Also used in **Storybook** to preview components in a
 * specific theme without the URL strategy interfering.
 *
 * ### Setup
 *
 * **Step 1 — register the resolver** in `resolvers/index.ts`:
 * ```ts
 * import { createPropInjectionResolver } from './propInjection';
 *
 * export const useThemeResolver = createPropInjectionResolver({
 *   fallback: 'theme1',
 * });
 * ```
 *
 * **Step 2 — provide the value from the host**:
 * ```tsx
 * // Shell application or test wrapper
 * import { ThemeNameContext } from './theming/resolvers/propInjection';
 * import PlatformTheme from './theming/PlatformTheme';
 *
 * <ThemeNameContext.Provider value="theme2">
 *   <PlatformTheme>
 *     <App />
 *   </PlatformTheme>
 * </ThemeNameContext.Provider>
 * ```
 *
 * **Storybook decorator example:**
 * ```tsx
 * // .storybook/preview.tsx
 * import { ThemeNameContext } from '../src/theming/resolvers/propInjection';
 *
 * export const decorators = [
 *   (Story, { globals }) => (
 *     <ThemeNameContext.Provider value={globals.theme ?? 'theme1'}>
 *       <Story />
 *     </ThemeNameContext.Provider>
 *   ),
 * ];
 * ```
 */

import { createContext, useContext } from "react";
import type { ThemeSpec } from "../themes/spec";
import type { UseThemeResolver, ResolverConfig } from "./types";

/**
 * React context that carries an externally-injected theme name.
 *
 * The default value is `null` — if no `Provider` is rendered above
 * `PlatformTheme`, the resolver falls back to `config.fallback`.
 *
 * The host application does **not** need to import this resolver's factory
 * to provide a value; importing `ThemeNameContext` alone is sufficient.
 */
export const ThemeNameContext = createContext<ThemeSpec["name"] | null>(null);

/**
 * Creates a resolver that reads the theme name injected by an external host
 * via `ThemeNameContext.Provider`.
 *
 * Falls back to `config.fallback` when no provider is present in the tree,
 * making this resolver safe to use even in environments (e.g. unit tests)
 * where the host does not wrap the component with a provider.
 */
export function createPropInjectionResolver(
  config: ResolverConfig,
): UseThemeResolver {
  const { fallback } = config;

  return function useThemeResolver(): ThemeSpec["name"] {
    /**
     * Read the injected theme name from the nearest `ThemeNameContext.Provider`
     * above this component in the tree. Returns `null` if no provider exists.
     */
    const injected = useContext(ThemeNameContext);
    return injected ?? fallback;
  };
}
