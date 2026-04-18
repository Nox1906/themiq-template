import {
  ListItemButton as MuiListItemButton,
  type ListItemButtonProps as MuiListItemButtonProps,
  type ListItemButtonTypeMap,
} from "@mui/material";
import React from "react";
import { type ElementType, forwardRef, type JSX } from "react";

import makeStyles from "./ListItemButton.styles";

const useStyles = makeStyles({ name: "ListItemButton" });

function ListItemButtonImpl<
  BaseComponent extends ElementType = ListItemButtonTypeMap["defaultComponent"],
>(
  {
    className,
    classes: overrideClasses,
    ...props
  }: ListItemButtonProps<BaseComponent>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiListItemButton
      ref={ref}
      {...(props as MuiListItemButtonProps)}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system ListItemButton.
 *
 * Uses `BaseComponent` and `AdditionalProps` generics because MUI's
 * `ListItemButton` is **polymorphic** — it can render as any element via the
 * `component` prop (e.g. `component={NavLink} to="/path"` for navigation).
 *
 * Currently all MUI {@link MuiListItemButtonProps} pass through unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type ListItemButtonProps<
  BaseComponent extends ElementType = ListItemButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
> = Omit<MuiListItemButtonProps<BaseComponent, AdditionalProps>, never> & {
  /**
   * The root element to render. Useful for navigation list items.
   * @example component={NavLink} to="/dashboard"
   * @example component="a" href="/profile"
   */
  component?: BaseComponent;
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system ListItemButton. A thin wrapper around MUI's `ListItemButton`
 * with style override hooks for the active theme.
 *
 * A clickable row inside a {@link List}. Supports hover, focus, and ripple
 * states. Use inside a {@link ListItem} with `disablePadding` for proper spacing.
 *
 * ```tsx
 * <ListItem disablePadding>
 *   <ListItemButton onClick={handleClick}>
 *     <ListItemIcon><Icon name="Inbox" /></ListItemIcon>
 *     <ListItemText primary="Inbox" />
 *   </ListItemButton>
 * </ListItem>
 * ```
 * @see https://mui.com/material-ui/react-list/
 */
const ListItemButton = forwardRef(ListItemButtonImpl) as <
  BaseComponent extends ElementType = ListItemButtonTypeMap["defaultComponent"],
>(
  props: ListItemButtonProps<BaseComponent> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => JSX.Element;

export default ListItemButton;
