import type { ThemeSpecBreakpoints } from "../spec/breakpoints";

/**
 * Theme2 breakpoint values.
 *
 * Currently identical to Theme1. All values are in pixels (minimum width).
 * The `xxs` key is a custom extension registered in `types.d.ts`.
 *
 * ### Changing a value
 * ```ts
 * const breakpoints: ThemeSpecBreakpoints = {
 *   xxs: 320,  // ← targeting smaller phones
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
