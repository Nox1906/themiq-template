import * as R from "ramda";
import * as themes from "./themes";
import type { ThemeSpec } from "./themes/spec";
import { pickAvailableTheme } from "./config";
import { useMemo } from "react";
import { getTheme } from "./utils.ts";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const themesByName = R.values(themes).reduce(
  (acc, theme) => {
    acc[theme.name] = theme;
    return acc;
  },
  {} as Record<ThemeSpec["name"], ThemeSpec>,
);

const muiCache = createCache({ key: "mui", prepend: true });

export default function PlatformTheme({ children }: React.PropsWithChildren) {
  const themes = pickAvailableTheme(["theme1", "theme2"], {
    "theme1-app": "theme1",
    "theme2-app": "theme2",
  });

  const options = {
    themeName: {
      options: themes,
    },
  };

  const themeName = options.themeName.options[0];

  const theme = useMemo(() => {
    if (!themesByName[themeName]) {
      console.warn(`Theme ${themeName} not found`);
      return getTheme(themesByName[themes[0]] ?? themesByName["theme1"]);
    }

    const selected = getTheme(themesByName[themeName]);
    selected.name = themeName;
    return selected;
  }, [themeName, themes]);
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
