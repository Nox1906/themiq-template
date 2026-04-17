/**
 * UI Toggle Resolver
 *
 * Allows any component anywhere in the tree to change the active theme at
 * runtime via a React context. Use this when you want a theme-switcher button,
 * a selector dropdown, or any other UI control to drive the active theme.
 *
 * ### How it works
 * 1. `ThemeControlProvider` owns a `useState` holding the current theme name
 *    and exposes it (plus the setter) via `ThemeControlContext`.
 * 2. `useThemeResolver` (used by `PlatformTheme`) reads the theme name from
 *    that context and re-renders whenever it changes.
 * 3. Any component calling `useThemeControl()` gets the setter and can update
 *    the theme without knowing about `PlatformTheme` at all.
 *
 * ### Setup — required tree structure
 * Because the resolver reads from a context, `ThemeControlProvider` **must be
 * rendered above `PlatformTheme`** in the component tree:
 *
 * ```tsx
 * // main.tsx (or your app root)
 * import { ThemeControlProvider } from './theming/resolvers/uiToggle';
 * import PlatformTheme from './theming/PlatformTheme';
 *
 * <ThemeControlProvider defaultTheme="theme1">
 *   <PlatformTheme>
 *     <App />
 *   </PlatformTheme>
 * </ThemeControlProvider>
 * ```
 *
 * ### Using the toggle control inside a component
 * ```tsx
 * import { useThemeControl } from './theming/resolvers/uiToggle';
 *
 * function ThemeSwitcher() {
 *   const { themeName, setThemeName } = useThemeControl();
 *   return (
 *     <button
 *       onClick={() =>
 *         setThemeName(themeName === 'theme1' ? 'theme2' : 'theme1')
 *       }
 *     >
 *       Switch theme
 *     </button>
 *   );
 * }
 * ```
 *
 * ### Combining with persistence (localStorage)
 * Seed `defaultTheme` from `localStorage` and write back on change:
 * ```tsx
 * const defaultTheme =
 *   (localStorage.getItem('chameleon-theme') as ThemeSpec['name']) ?? 'theme1';
 *
 * <ThemeControlProvider defaultTheme={defaultTheme}>
 *   <PlatformTheme>...</PlatformTheme>
 * </ThemeControlProvider>
 * ```
 * Inside a toggle component:
 * ```ts
 * const { setThemeName } = useThemeControl();
 * const handleChange = (name: ThemeSpec['name']) => {
 *   localStorage.setItem('chameleon-theme', name);
 *   setThemeName(name);
 * };
 * ```
 *
 * ### Registering this resolver
 * In `resolvers/index.ts`:
 * ```ts
 * import { createUiToggleResolver } from './uiToggle';
 * export const useThemeResolver = createUiToggleResolver();
 * ```
 * Remember to also render `<ThemeControlProvider>` above `<PlatformTheme>`
 * in your app root (see setup example above).
 */

import { createContext, useContext, useState } from "react";
import type { ThemeSpec } from "../themes/spec";
import type { UseThemeResolver } from "./types";

/** Shape of the value provided by `ThemeControlContext`. */
interface ThemeControl {
  /** The currently active theme name. */
  themeName: ThemeSpec["name"];
  /** Setter to change the active theme at runtime. */
  setThemeName: (name: ThemeSpec["name"]) => void;
}

/**
 * React context that carries the mutable theme name and its setter.
 *
 * Initialised to `null` — `useThemeControl` throws if called outside of a
 * `ThemeControlProvider`, making missing-provider errors explicit.
 */
const ThemeControlContext = createContext<ThemeControl | null>(null);

/** Props accepted by `ThemeControlProvider`. */
interface ThemeControlProviderProps {
  /** The theme that is active when the provider first mounts. */
  defaultTheme: ThemeSpec["name"];
  children: React.ReactNode;
}

/**
 * Context provider that owns the mutable theme state.
 *
 * Must be rendered **above** `PlatformTheme` when using the `uiToggle`
 * resolver. One `ThemeControlProvider` per application root is sufficient.
 */
export function ThemeControlProvider({
  defaultTheme,
  children,
}: ThemeControlProviderProps) {
  const [themeName, setThemeName] = useState<ThemeSpec["name"]>(defaultTheme);

  return (
    <ThemeControlContext.Provider value={{ themeName, setThemeName }}>
      {children}
    </ThemeControlContext.Provider>
  );
}

/**
 * Hook for any component that needs to read or change the active theme.
 *
 * Returns `{ themeName, setThemeName }`. Call `setThemeName` with a valid
 * `ThemeSpec['name']` to trigger an immediate theme switch.
 *
 * @throws {Error} if called outside of a `ThemeControlProvider`.
 */
export function useThemeControl(): ThemeControl {
  const ctx = useContext(ThemeControlContext);

  if (!ctx) {
    throw new Error(
      "[useThemeControl] Must be called inside <ThemeControlProvider>. " +
        "Render <ThemeControlProvider defaultTheme='theme1'> above " +
        "<PlatformTheme> in your app root.",
    );
  }

  return ctx;
}

/**
 * Creates a resolver that reads the theme name from `ThemeControlContext`.
 *
 * `PlatformTheme` re-renders automatically whenever `setThemeName` is called
 * because the hook returns a new string value, which changes the `useMemo`
 * dependency inside `PlatformTheme`.
 */
export function createUiToggleResolver(): UseThemeResolver {
  return function useThemeResolver(): ThemeSpec["name"] {
    const { themeName } = useThemeControl();
    return themeName;
  };
}
