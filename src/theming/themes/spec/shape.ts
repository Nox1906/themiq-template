/**
 * Shape scale specification for the design system.
 *
 * Replaces the single `borderRadius` scalar with a named scale so components
 * can reference semantic sizes (`shape.sm`, `shape.lg`) rather than hard-coded
 * pixel values. Every key is a `border-radius` value in pixels.
 *
 * ### Using the scale in a component
 * ```tsx
 * import { useTheme } from "@mui/material/styles";
 *
 * function Tag() {
 *   const theme = useTheme();
 *   return <Box sx={{ borderRadius: theme.shape.full }} />;
 * }
 * ```
 *
 * ### Using the scale in makeStyles
 * ```ts
 * const useStyles = makeStyles(({ theme }) => ({
 *   card:   { borderRadius: theme.shape.sm },
 *   avatar: { borderRadius: theme.shape.full },
 * }));
 * ```
 *
 * ### Mapping to MUI's `theme.shape.borderRadius`
 * MUI uses `theme.shape.borderRadius` as the default radius for most components.
 * By convention, set `borderRadius` equal to `sm` in your theme implementation:
 * ```ts
 * const shape: ThemeSpecShape = {
 *   borderRadius: 8,  // ← same value as sm; used by MUI internally
 *   none: 0,
 *   xs:   4,
 *   sm:   8,   // matches borderRadius
 *   md:   12,
 *   lg:   16,
 *   full: 9999,
 * };
 * ```
 *
 * ### Adding a new step
 * 1. Add the key and its purpose to this type
 * 2. Add the pixel value to every theme's `shape.ts`
 * ```ts
 * export type ThemeSpecShape = {
 *   // …existing keys…
 *   xl: number;  // ← new step — e.g. bottom sheets, toasts
 * };
 * ```
 */

export type ThemeSpecShape = {
  /**
   * MUI's primary border-radius anchor.
   * Most MUI components read this value; set it equal to `sm` by convention.
   */
  borderRadius: number;

  /** No rounding — sharp corners for data tables, code blocks */
  none: 0;
  /** Extra small — inline chips, badges, small inputs */
  xs: number;
  /** Small — buttons, cards, standard inputs (matches `borderRadius`) */
  sm: number;
  /** Medium — popovers, menus, side panels */
  md: number;
  /** Large — dialogs, drawers, notification toasts */
  lg: number;
  /** Full pill — avatars, toggle switches, tags */
  full: number;
};
