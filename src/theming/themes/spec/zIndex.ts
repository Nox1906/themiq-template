/**
 * Z-index scale specification for the design system.
 *
 * Documents the stacking order of floating/overlay layers.
 * Using named constants prevents accidental collisions between
 * independently developed components.
 *
 * Values are passed to `createTheme({ zIndex: … })` and become
 * available on `theme.zIndex.<layer>`.
 *
 * ### Using z-index in a component
 * ```tsx
 * import { useTheme } from "@mui/material/styles";
 *
 * function FloatingButton() {
 *   const theme = useTheme();
 *   return <Box sx={{ zIndex: theme.zIndex.fab }} />;
 * }
 * ```
 *
 * ### Using z-index in makeStyles
 * ```ts
 * const useStyles = makeStyles(({ theme }) => ({
 *   overlay: { zIndex: theme.zIndex.modal },
 *   badge:   { zIndex: theme.zIndex.tooltip },
 * }));
 * ```
 *
 * ### Stacking order overview
 * ```
 * tooltip        1500  ← always on top
 * snackbar       1400
 * modal          1300
 * drawer         1200
 * appBar         1100
 * speedDial      1050
 * fab            1050
 * mobileStepper  1000
 * ```
 *
 * ### Changing a z-index value
 * Edit the value in the theme's `zIndex.ts`. Make sure all themes stay
 * consistent unless an intentional per-theme override is needed.
 *
 * ### Adding a new layer
 * 1. Add the key and its purpose to this type
 * 2. Choose a value that fits into the existing stacking order
 * 3. Add the value to every theme's `zIndex.ts`
 * ```ts
 * export type ThemeSpecZIndex = {
 *   // …existing keys…
 *   stickyHeader: number;  // e.g. 1080 — between appBar and drawer
 * };
 * ```
 */

export type ThemeSpecZIndex = {
  /** 1000 — bottom-of-stack floating layer (e.g. stepper progress bar) */
  mobileStepper: number;
  /** 1050 — floating action button */
  fab: number;
  /** 1050 — speed dial trigger and actions */
  speedDial: number;
  /** 1100 — top app bar / navigation header */
  appBar: number;
  /** 1200 — side navigation drawer */
  drawer: number;
  /** 1300 — modal dialogs and backdrops */
  modal: number;
  /** 1400 — snackbar / toast notifications */
  snackbar: number;
  /** 1500 — tooltips (always rendered on top) */
  tooltip: number;
};
