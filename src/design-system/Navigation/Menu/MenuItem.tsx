import { type ElementType, forwardRef, type JSX } from "react";
import React from "react";
import {
  MenuItem as MuiMenuItem,
  type MenuItemProps as MuiMenuItemProps,
  type MenuItemTypeMap,
} from "@mui/material";

import makeStyles from "./MenuItem.styles";

const useStyles = makeStyles({ name: "MenuItem" });

function MenuItemImpl<
  BaseComponent extends ElementType = MenuItemTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  {
    className,
    classes: overrideClasses,
    ...props
  }: MenuItemProps<BaseComponent, AdditionalProps>,
  ref: React.Ref<HTMLElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiMenuItem
      ref={ref as React.Ref<HTMLLIElement>}
      {...(props as MuiMenuItemProps)}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system MenuItem.
 *
 * Uses `BaseComponent` and `AdditionalProps` generics because MUI's `MenuItem`
 * is **polymorphic** — it can render as any element via the `component` prop.
 * The most common use case is rendering each item as a router link:
 *
 * ```tsx
 * import { NavLink } from "react-router-dom";
 * <MenuItem component={NavLink} to="/profile">Profile</MenuItem>
 * ```
 *
 * TypeScript will automatically narrow the allowed props (e.g. adding `to`,
 * `href`, etc.) based on whatever you pass to `component`.
 *
 * Currently all MUI {@link MuiMenuItemProps} pass through unchanged. The only
 * explicit addition is `component` to make the polymorphic intent clear.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `dense` as an always-on design token:
 * ```ts
 * export type MenuItemProps<...> = Omit<MuiMenuItemProps<...>, "dense"> & {
 *   // dense is always true in our design system — remove it from the API
 * };
 * ```
 */
export type MenuItemProps<
  BaseComponent extends ElementType = MenuItemTypeMap["defaultComponent"],
  AdditionalProps = object,
> = Omit<MuiMenuItemProps<BaseComponent, AdditionalProps>, never> & {
  /**
   * The root element to render. Useful for rendering each item as a router link.
   * @example component={NavLink} to="/profile"
   * @example component="a" href="/settings"
   */
  component?: BaseComponent;
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system MenuItem. A thin wrapper around MUI's `MenuItem` with style
 * override hooks for the active theme.
 *
 * Always used inside a {@link Menu} or MUI `MenuList`. Supports rendering as
 * any element — most commonly a router link for SPA navigation.
 *
 * **Basic usage:**
 * ```tsx
 * <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
 *   <MenuItem onClick={handleClose}>Profile</MenuItem>
 *   <MenuItem onClick={handleClose}>Settings</MenuItem>
 * </Menu>
 * ```
 *
 * **Router integration (react-router-dom):**
 * ```tsx
 * import { NavLink } from "react-router-dom";
 *
 * <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
 *   <MenuItem component={NavLink} to="/profile" onClick={handleClose}>Profile</MenuItem>
 *   <MenuItem component={NavLink} to="/settings" onClick={handleClose}>Settings</MenuItem>
 * </Menu>
 * ```
 *
 * All MUI `MenuItemProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
const MenuItem = forwardRef(MenuItemImpl) as <
  BaseComponent extends ElementType = MenuItemTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: MenuItemProps<BaseComponent, AdditionalProps> & {
    ref?: React.Ref<HTMLElement>;
  },
) => JSX.Element;

export default MenuItem;
