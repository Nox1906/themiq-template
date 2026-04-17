import { forwardRef, type JSX } from "react";
import React from "react";
import {
  Badge as MuiBadge,
  type BadgeProps as MuiBadgeProps,
} from "@mui/material";

import makeStyles from "./Badge.styles";

const useStyles = makeStyles({ name: "Badge" });


function BadgeImpl(
  { className, classes: overrideClasses, ...props }: BadgeProps,
  ref: React.Ref<HTMLSpanElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiBadge
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Badge.
 *
 * Currently passes through all MUI {@link MuiBadgeProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `color` to the design token set:
 * ```ts
 * export type BadgeProps = Omit<MuiBadgeProps, "color"> & {
 *   color?: "primary" | "error" | "warning"; // drop unused colours
 * };
 * ```
 */
export type BadgeProps = Omit<MuiBadgeProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Badge. A thin wrapper around MUI's `Badge` with style
 * override hooks for the active theme.
 *
 * Wraps any element and overlays a numeric indicator or dot.
 *
 * **Numeric badge:**
 * ```tsx
 * import MailIcon from "@mui/icons-material/Mail";
 * <Badge badgeContent={4} color="primary">
 *   <MailIcon />
 * </Badge>
 * ```
 *
 * **Dot badge (no count):**
 * ```tsx
 * <Badge variant="dot" color="error">
 *   <MailIcon />
 * </Badge>
 * ```
 *
 * **Max value:**
 * ```tsx
 * <Badge badgeContent={1000} max={999} color="primary">
 *   <MailIcon />
 * </Badge>
 * ```
 *
 * All MUI `BadgeProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
const Badge = forwardRef(BadgeImpl) as (
  props: BadgeProps & { ref?: React.Ref<HTMLSpanElement> },
) => JSX.Element;

export default Badge;