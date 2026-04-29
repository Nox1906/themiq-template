import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import * as R from "ramda";
import { useMemo } from "react";

import { useThemeResolver } from "./resolvers";
import * as allThemes from "./themes";
import type { ThemeSpec } from "./themes/spec";
import { getTheme } from "./utils.ts";

/**
 * Flat lookup map of all registered themes, keyed by `theme.name`.
 *
 * Built once at module load from every theme exported by `themes/index.ts`.
 * Adding a new theme here only requires exporting it from `themes/index.ts`
 * — no changes needed in this file.
 */
const themesByName = R.values(allThemes).reduce(
  (acc, theme) => {
    acc[theme.name] = theme;
    return acc;
  },
  {} as Record<ThemeSpec["name"], ThemeSpec>,
);

/**
 * Emotion cache configured to inject MUI styles **before** any other
 * stylesheets, so application-level CSS can override component styles
 * without needing higher specificity.
 */
const muiCache = createCache({ key: "mui", prepend: true });

/**
 * Root theming provider for the Themiq platform.
 *
 * Wraps the application tree with MUI's `ThemeProvider`, selecting the active
 * theme from the URL's first path segment (the *app slug*).
 *
 * ### How the theme is selected
 * The active theme name is provided by the **resolver hook** exported from
 * `resolvers/index.ts`. The resolver encapsulates the selection strategy
 * so this component stays strategy-agnostic.
 *
 * ### Changing the selection strategy
 * Edit **`resolvers/index.ts`** only — swap the import and factory call.
 * This file does not need to change.
 *
 * ### Adding a completely new theme
 * 1. Create the theme folder (see `themes/spec/index.ts` for the contract)
 * 2. Export it from `themes/index.ts` — `themesByName` picks it up automatically
 * 3. Add its name to the `ThemeSpec['name']` union in `themes/spec/index.ts`
 * 4. Register it in the resolver configuration inside `resolvers/index.ts`
 *
 * ### Fallback behaviour
 * If the resolved theme name is not found in `themesByName` (e.g. a stale
 * mapping after a theme is removed), a console warning is emitted and the
 * first registered theme is used instead.
 */
export default function PlatformTheme({ children }: React.PropsWithChildren) {
  /**
   * The resolved theme name for this render, provided by the active resolver.
   *
   * To change how the theme is selected, update `resolvers/index.ts` —
   * no changes are needed in this file.
   */
  const themeName = useThemeResolver();

  /**
   * The compiled MUI `Theme` object, memoized by `themeName`.
   *
   * Re-computed only when `themeName` changes (i.e. on a full page navigation
   * to a different app slug, since `config.ts` reads the URL at module load
   * time and the value is stable within a single page lifetime).
   */
  const theme = useMemo(() => {
    const spec = themesByName[themeName];

    if (!spec) {
      console.warn(
        `[PlatformTheme] Theme "${themeName}" not found in themesByName. ` +
          `Falling back to "theme1". Check that the theme is exported from themes/index.ts.`,
      );
      return getTheme(themesByName["theme1"]);
    }

    return getTheme(spec);
  }, [themeName]);

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}
