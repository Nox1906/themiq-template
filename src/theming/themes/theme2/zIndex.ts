import type { ThemeSpecZIndex } from "../spec/zIndex";

/**
 * Theme2 z-index scale.
 *
 * Currently identical to Theme1 and MUI defaults. Components should always
 * read from `theme.zIndex` instead of using hard-coded values.
 *
 * ### Usage
 * ```tsx
 * <Box sx={{ zIndex: theme.zIndex.modal }} />
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
