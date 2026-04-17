/**
 * Public API for theming utilities.
 *
 * ### `getTheme(themeSpec)`
 * Converts a raw {@link ThemeSpec} object into a fully configured MUI `Theme`
 * ready for use with `<ThemeProvider>`. This is the only function you need
 * when consuming a theme:
 * ```ts
 * import { getTheme } from "src/theming/utils.ts";
 * import { Theme1 } from "src/theming/themes";
 * import { createTheme } from "@mui/material/styles";
 *
 * const muiTheme = createTheme(getTheme(Theme1));
 * ```
 *
 * Internal helpers (`createShadows`) are intentionally not re-exported because
 * they are implementation details of `getTheme`.
 */
export { default as getTheme } from "./getTheme";
