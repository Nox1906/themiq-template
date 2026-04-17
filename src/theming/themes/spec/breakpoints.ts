/**
 * Breakpoint values specification for the design system.
 *
 * Defines the pixel width at which each responsive breakpoint activates.
 * These values are passed to `createTheme({ breakpoints: { values: … } })`,
 * making them available via `theme.breakpoints.up("md")` etc.
 *
 * This config also includes the custom `xxs` breakpoint, which extends MUI's
 * default set (`xs`–`xl`). The `xxs` key is registered in `types.d.ts` via
 * `BreakpointOverrides` so MUI's media-query helpers accept it.
 *
 * ### Using breakpoints in a component
 * ```tsx
 * import { useTheme } from "@mui/material/styles";
 *
 * function Banner() {
 *   const theme = useTheme();
 *   // true when viewport width >= 600 px
 *   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
 * }
 * ```
 *
 * ### Using breakpoints in sx / makeStyles
 * ```ts
 * // sx prop
 * <Box sx={{ display: { xxs: "none", md: "flex" } }} />
 *
 * // makeStyles
 * const useStyles = makeStyles(({ theme }) => ({
 *   root: {
 *     [theme.breakpoints.down("sm")]: { padding: theme.spacing(1) },
 *     [theme.breakpoints.up("md")]:   { padding: theme.spacing(3) },
 *   },
 * }));
 * ```
 *
 * ### Changing a breakpoint value
 * Edit the pixel value in the theme's `breakpoints.ts` file:
 * ```ts
 * const breakpoints: ThemeSpecBreakpoints = {
 *   xxs: 320,  // ← was 360, now targeting smaller phones
 *   xs:  480,
 *   …
 * };
 * ```
 *
 * ### Adding a new breakpoint
 * 1. Add the key here with a JSDoc comment
 * 2. Register it in `types.d.ts` via `BreakpointOverrides`:
 *    ```ts
 *    declare module "@mui/material/styles" {
 *      interface BreakpointOverrides { "2xl": true; }
 *    }
 *    ```
 * 3. Add the value to every theme's `breakpoints.ts`
 */

export type ThemeSpecBreakpoints = {
  /** Extra extra small — small phones (360 px) */
  xxs: number;
  /** Extra small — portrait phones (480 px) */
  xs: number;
  /** Small — landscape phones / small tablets (600 px) */
  sm: number;
  /** Medium — tablets / small laptops (900 px) */
  md: number;
  /** Large — desktops (1200 px) */
  lg: number;
  /** Extra large — wide desktops (1536 px) */
  xl: number;
};
