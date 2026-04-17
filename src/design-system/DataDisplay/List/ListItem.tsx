import { type ElementType, forwardRef, type JSX } from "react";
import React from "react";
import {
  ListItem as MuiListItem,
  type ListItemProps as MuiListItemProps,
} from "@mui/material";

import makeStyles from "./ListItem.styles";

const useStyles = makeStyles({ name: "ListItem" });

function ListItemImpl<
  BaseComponent extends ElementType = "li",
  AdditionalProps = object,
>(
  {
    className,
    classes: overrideClasses,
    ...props
  }: ListItemProps<BaseComponent, AdditionalProps>,
  ref: React.Ref<HTMLElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiListItem
      ref={ref as React.Ref<HTMLLIElement>}
      {...(props as MuiListItemProps)}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system ListItem.
 *
 * Uses `BaseComponent` and `AdditionalProps` generics because MUI's `ListItem`
 * is **polymorphic** — it can render as any element via the `component` prop.
 *
 * For **clickable** list items that navigate, prefer `ListItemButton` (from MUI)
 * which is also polymorphic and accepts `component={NavLink} to="..."`:
 *
 * ```tsx
 * import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
 * import { NavLink } from "react-router-dom";
 *
 * <ListItem disablePadding>
 *   <ListItemButton component={NavLink} to="/dashboard">
 *     <ListItemText primary="Dashboard" />
 *   </ListItemButton>
 * </ListItem>
 * ```
 *
 * Use `ListItem` directly (with `component`) when you need the whole row to be
 * a link without the button affordance (no ripple/hover state):
 *
 * ```tsx
 * <ListItem component="a" href="/profile">Profile</ListItem>
 * ```
 *
 * Currently all MUI {@link MuiListItemProps} pass through unchanged. The only
 * explicit addition is `component` to make the polymorphic intent clear.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type ListItemProps<
  BaseComponent extends ElementType = "li",
  AdditionalProps = object,
> = Omit<MuiListItemProps<BaseComponent, AdditionalProps>, never> & {
  /**
   * The root element to render. Useful for rendering the item as a link.
   * @example component="a" href="/profile"
   * @example component={NavLink} to="/dashboard"
   */
  component?: BaseComponent;
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system ListItem. A thin wrapper around MUI's `ListItem` with style
 * override hooks for the active theme.
 *
 * Always used inside a {@link List} container.
 *
 * **Basic row:**
 * ```tsx
 * import { ListItemText } from "@mui/material";
 *
 * <ListItem>
 *   <ListItemText primary="Label" secondary="Description" />
 * </ListItem>
 * ```
 *
 * **With icon:**
 * ```tsx
 * import { ListItemIcon, ListItemText } from "@mui/material";
 * import InboxIcon from "@mui/icons-material/Inbox";
 *
 * <ListItem>
 *   <ListItemIcon><InboxIcon /></ListItemIcon>
 *   <ListItemText primary="Inbox" />
 * </ListItem>
 * ```
 *
 * **Clickable (with ListItemButton):**
 * ```tsx
 * import { ListItemButton, ListItemText } from "@mui/material";
 *
 * <ListItem disablePadding>
 *   <ListItemButton onClick={handleClick}>
 *     <ListItemText primary="Click me" />
 *   </ListItemButton>
 * </ListItem>
 * ```
 *
 * All MUI `ListItemProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
const ListItem = forwardRef(ListItemImpl) as <
  BaseComponent extends ElementType = "li",
  AdditionalProps = object,
>(
  props: ListItemProps<BaseComponent, AdditionalProps> & {
    ref?: React.Ref<HTMLElement>;
  },
) => JSX.Element;

export default ListItem;
