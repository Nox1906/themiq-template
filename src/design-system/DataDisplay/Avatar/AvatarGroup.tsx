import {
  AvatarGroup as MuiAvatarGroup,
  type AvatarGroupProps as MuiAvatarGroupProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./AvatarGroup.styles";

const useStyles = makeStyles({ name: "AvatarGroup" });

function AvatarGroupImpl(
  { className, classes: overrideClasses, ...props }: AvatarGroupProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiAvatarGroup
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system AvatarGroup.
 *
 * Currently passes through all MUI {@link MuiAvatarGroupProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain max:
 * ```ts
 * export type AvatarGroupProps = Omit<MuiAvatarGroupProps, "max"> & {
 *   max?: 3 | 4 | 5;
 * };
 * ```
 */
export type AvatarGroupProps = Omit<MuiAvatarGroupProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system AvatarGroup. A thin wrapper around MUI's `AvatarGroup` with
 * style override hooks for the active theme.
 *
 * Stacks multiple {@link Avatar} components horizontally with configurable
 * overlap and a "+N" overflow indicator.
 *
 * ```tsx
 * <AvatarGroup max={4}>
 *   <Avatar src="..." alt="Alice" />
 *   <Avatar src="..." alt="Bob" />
 *   <Avatar>CB</Avatar>
 * </AvatarGroup>
 * ```
 * @see https://mui.com/material-ui/react-avatar/
 */
const AvatarGroup = forwardRef(AvatarGroupImpl) as (
  props: AvatarGroupProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default AvatarGroup;
