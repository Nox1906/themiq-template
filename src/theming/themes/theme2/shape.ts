import type { ThemeSpecShape } from "../spec/shape";

/**
 * Theme2 shape scale.
 *
 * Currently identical to Theme1. Diverge values here as the Theme2
 * design evolves — for example a more rounded style would increase
 * all steps proportionally.
 *
 * ### Consuming the scale
 * ```ts
 * <Box sx={{ borderRadius: theme.shape.sm }} />
 * ```
 *
 * ### Changing a value
 * Edit the pixel number here; it automatically propagates to every component
 * that references `theme.shape.<key>`.
 */
const shape: ThemeSpecShape = {
  /** MUI's primary anchor — inherited by most MUI components automatically. */
  borderRadius: 12,

  none: 0, // sharp corners — data tables, code blocks
  xs: 6, // inline chips, badges, small tag pills
  sm: 12, // buttons, cards, standard inputs  (= borderRadius)
  md: 16, // popovers, menus, panel corners
  lg: 24, // dialogs, drawers, notification toasts
  full: 9999, // fully rounded — avatars, toggle switches
};

export default shape;
