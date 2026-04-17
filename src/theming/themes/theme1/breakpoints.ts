import type { ThemeSpecBreakpoints } from "../spec/breakpoints";

/**
 * Theme1 breakpoint values.
 *
 * All values are in pixels and represent the **minimum** viewport width at
 * which the corresponding breakpoint activates.
 *
 * These values are passed to `createTheme({ breakpoints: { values: … } })`
 * so they become available via `theme.breakpoints.up("md")` etc.
 *
 * The `xxs` key is a custom extension registered in `types.d.ts`.
 *
 * ### Changing a value
 * Edit the pixel number here:
 * ```ts
 * const breakpoints: ThemeSpecBreakpoints = {
 *   xxs: 320,   // ← targeting smaller phones
 *   xs: 480,
 *   …
 * };
 * ```
 */
const breakpoints: ThemeSpecBreakpoints = {
  xxs: 360, // small phones
  xs: 480, // portrait phones
  sm: 600, // landscape phones / small tablets
  md: 900, // tablets / small laptops
  lg: 1200, // desktops
  xl: 1536, // wide desktops
};

export default breakpoints;
