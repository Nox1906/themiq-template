import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import React from "react";

import * as themes from "../src/theming/themes";
import { ThemeSpec } from "../src/theming/themes/spec";
import ThemeWrapper from "./ThemeWrapper";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color:
          /(?:color|background|border|fill|stroke|theme|palette|primary|secondary|error|warning|info|success)/i,
        date: /(?:date|time|dateTime|timestamp)/i,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        theme1: themes.Theme1,
        theme2: themes.Theme2,
      },
      defaultTheme: "theme1",
      Provider: ({
        theme,
        children,
      }: {
        theme: ThemeSpec["name"];
        children: React.ReactNode;
      }) => React.createElement(ThemeWrapper, { themeName: theme, children }),
    }),
  ],
};

export default preview;
