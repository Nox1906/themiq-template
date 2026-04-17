import { forwardRef, type JSX } from "react";
import React from "react";
import {
  Avatar as MuiAvatar,
  type AvatarProps as MuiAvatarProps,
} from "@mui/material";

import makeStyles from "./Avatar.styles";

const useStyles = makeStyles({ name: "Avatar" });


function AvatarImpl(
  { className, classes: overrideClasses, ...props }: AvatarProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiAvatar
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Avatar.
 *
 * Currently passes through all MUI {@link MuiAvatarProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `variant` to a subset:
 * ```ts
 * export type AvatarProps = Omit<MuiAvatarProps, "variant"> & {
 *   variant?: "circular" | "rounded"; // drop "square"
 * };
 * ```
 */
export type AvatarProps = Omit<MuiAvatarProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Avatar. A thin wrapper around MUI's `Avatar` with style
 * override hooks for the active theme.
 *
 * **Image avatar:**
 * ```tsx
 * <Avatar src="/path/to/photo.jpg" alt="Jane Doe" />
 * ```
 *
 * **Letter avatar:**
 * ```tsx
 * <Avatar>JD</Avatar>
 * ```
 *
 * **Icon avatar:**
 * ```tsx
 * import PersonIcon from "@mui/icons-material/Person";
 * <Avatar><PersonIcon /></Avatar>
 * ```
 *
 * **Variants:**
 * ```tsx
 * <Avatar variant="rounded" src="..." />
 * <Avatar variant="square" src="..." />
 * ```
 *
 * All MUI `AvatarProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
const Avatar = forwardRef(AvatarImpl) as (
  props: AvatarProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default Avatar;