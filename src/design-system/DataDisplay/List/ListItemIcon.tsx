import { forwardRef, type JSX } from "react";
import React from "react";
import {
  ListItemIcon as MuiListItemIcon,
  type ListItemIconProps as MuiListItemIconProps,
} from "@mui/material";

import makeStyles from "./ListItemIcon.styles";

const useStyles = makeStyles({ name: "ListItemIcon" });


function ListItemIconImpl(
  { className, classes: overrideClasses, ...props }: ListItemIconProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiListItemIcon
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system ListItemIcon.
 *
 * Currently passes through all MUI {@link MuiListItemIconProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type ListItemIconProps = Omit<MuiListItemIconProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system ListItemIcon. A thin wrapper around MUI's `ListItemIcon` with
 * style override hooks for the active theme.
 *
 * Renders an icon at the leading edge of a list row with correct alignment.
 * Pass an {@link Icon} or any icon component as `children`.
 *
 * ```tsx
 * <ListItem>
 *   <ListItemIcon>
 *     <Icon name="Inbox" />
 *   </ListItemIcon>
 *   <ListItemText primary="Inbox" />
 * </ListItem>
 * ```
 */
const ListItemIcon = forwardRef(ListItemIconImpl) as (
  props: ListItemIconProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default ListItemIcon;