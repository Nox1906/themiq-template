import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import React from "react";

import * as themes from "../src/theming/themes";
import { ThemeSpec } from "../src/theming/themes/spec";
import { getTheme } from "../src/theming/utils.ts";

const themesByName = Object.values(themes).reduce(
  (acc, theme) => {
    acc[theme.name] = theme;
    return acc;
  },
  {} as Record<ThemeSpec["name"], ThemeSpec>,
);

const muiCache = createCache({ key: "mui", prepend: true });

interface ThemeWrapperProps {
  themeName: ThemeSpec["name"];
  children: React.ReactNode;
}

export default function ThemeWrapper({
  themeName,
  children,
}: ThemeWrapperProps) {
  const selectedTheme = React.useMemo(() => {
    const themeSpec = themesByName[themeName] || themesByName["theme1"];
    const theme = getTheme(themeSpec);
    return theme;
  }, [themeName]);

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={selectedTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}
