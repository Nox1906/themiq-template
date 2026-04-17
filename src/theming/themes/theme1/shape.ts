import type { ThemeSpecShape } from "../spec/shape";

/**
 * Theme1 shape scale.
 *
 * Provides a named border-radius scale for components. Use these values
 * instead of hard-coded pixels so radius choices are consistent and
 * refactorable in one place.
 *
 * ### Consuming the scale
 * ```ts
 * // sx prop
 * <Box sx={{ borderRadius: theme.shape.sm }} />
 *
 * // makeStyles
 * const useStyles = makeStyles(({ theme }) => ({
 *   card:   { borderRadius: theme.shape.sm },
 *   avatar: { borderRadius: theme.shape.full },
 * }));
 * ```
 *
 * ### Changing a value
 * Edit the pixel number here; it automatically propagates to every component
 * that references `theme.shape.<key>`.
 */
const shape: ThemeSpecShape = {
  /** MUI's primary anchor — inherited by most MUI components automatically. */
  borderRadius: 8,

  none: 0, // sharp corners — data tables, code blocks
  xs: 4, // inline chips, badges, small tag pills
  sm: 8, // buttons, cards, standard inputs  (= borderRadius)
  md: 12, // popovers, menus, panel corners
  lg: 16, // dialogs, drawers, notification toasts
  full: 9999, // fully rounded — avatars, toggle switches
};

export default shape;
