import type { ThemeSpecZIndex } from "../spec/zIndex";

/**
 * Theme1 z-index scale.
 *
 * Passed to `createTheme({ zIndex: … })` and available at runtime via
 * `theme.zIndex.<layer>`. Components should always read from the theme instead
 * of using hard-coded `z-index` values.
 *
 * ### Usage
 * ```tsx
 * <Box sx={{ zIndex: theme.zIndex.modal }} />
 * ```
 *
 * ### Stacking order
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
 * ### Inserting a new layer between existing ones
 * Leave a gap of at least 10 between layers when changing values to allow
 * future insertiont without reshuffling everything:
 * ```ts
 * appBar:       1100,
 * stickyHeader: 1080,  // ← new layer between appBar and drawer
 * drawer:       1200,
 * ```
 */
const zIndex: ThemeSpecZIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

export default zIndex;
