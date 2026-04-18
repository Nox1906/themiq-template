import {
  ListItemText as MuiListItemText,
  type ListItemTextProps as MuiListItemTextProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./ListItemText.styles";

const useStyles = makeStyles({ name: "ListItemText" });

function ListItemTextImpl(
  { className, classes: overrideClasses, ...props }: ListItemTextProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiListItemText
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system ListItemText.
 *
 * Currently passes through all MUI {@link MuiListItemTextProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type ListItemTextProps = Omit<MuiListItemTextProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system ListItemText. A thin wrapper around MUI's `ListItemText` with
 * style override hooks for the active theme.
 *
 * Renders primary and optional secondary text inside a list row.
 *
 * ```tsx
 * <ListItem>
 *   <ListItemText primary="Inbox" secondary="3 unread" />
 * </ListItem>
 * ```
 * @see https://mui.com/material-ui/react-list/
 */
const ListItemText = forwardRef(ListItemTextImpl) as (
  props: ListItemTextProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default ListItemText;
