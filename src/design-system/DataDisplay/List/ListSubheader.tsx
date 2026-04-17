import { forwardRef, type JSX } from "react";
import React from "react";
import {
  ListSubheader as MuiListSubheader,
  type ListSubheaderProps as MuiListSubheaderProps,
} from "@mui/material";

import makeStyles from "./ListSubheader.styles";

const useStyles = makeStyles({ name: "ListSubheader" });


function ListSubheaderImpl(
  { className, classes: overrideClasses, ...props }: ListSubheaderProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiListSubheader
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system ListSubheader.
 *
 * Currently passes through all MUI {@link MuiListSubheaderProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type ListSubheaderProps = Omit<MuiListSubheaderProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system ListSubheader. A thin wrapper around MUI's `ListSubheader`
 * with style override hooks for the active theme.
 *
 * Renders a sticky section label inside a {@link List}. Pass as `subheader`
 * prop on `List` or as a direct child.
 *
 * ```tsx
 * <List subheader={<ListSubheader>Recent</ListSubheader>}>
 *   <ListItem>...</ListItem>
 * </List>
 * ```
 */
const ListSubheader = forwardRef(ListSubheaderImpl) as (
  props: ListSubheaderProps & { ref?: React.Ref<HTMLLIElement> },
) => JSX.Element;

export default ListSubheader;