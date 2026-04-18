import {
  Tab as MuiTab,
  type TabProps as MuiTabProps,
  type TabTypeMap,
} from "@mui/material";
import React from "react";
import { type ElementType, forwardRef, type JSX } from "react";

import makeStyles from "./Tab.styles";

const useStyles = makeStyles({ name: "Tab" });

function TabImpl<
  BaseComponent extends ElementType = TabTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  {
    className,
    classes: overrideClasses,
    ...props
  }: TabProps<BaseComponent, AdditionalProps>,
  ref: React.Ref<HTMLElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiTab
      ref={ref as React.Ref<HTMLDivElement>}
      {...(props as MuiTabProps)}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Tab.
 *
 * Uses `BaseComponent` and `AdditionalProps` generics because MUI's `Tab` is
 * **polymorphic** — it can render as any element via the `component` prop.
 * The most common use case is rendering each tab as a router link:
 *
 * ```tsx
 * import { NavLink } from "react-router-dom";
 * <Tab component={NavLink} to="/dashboard" label="Dashboard" />
 * ```
 *
 * TypeScript will automatically narrow the allowed props (e.g. adding `to`,
 * `href`, etc.) based on whatever you pass to `component`.
 *
 * Currently all MUI {@link MuiTabProps} pass through unchanged. The only
 * explicit addition is `component` to make the polymorphic intent clear.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `iconPosition` to a subset:
 * ```ts
 * export type TabProps<...> = Omit<MuiTabProps<...>, "iconPosition"> & {
 *   iconPosition?: "start" | "end"; // drop "top" and "bottom"
 * };
 * ```
 */
export type TabProps<
  BaseComponent extends ElementType = TabTypeMap["defaultComponent"],
  AdditionalProps = object,
> = Omit<MuiTabProps<BaseComponent, AdditionalProps>, never> & {
  /**
   * The root element to render. Useful for rendering each tab as a router link.
   * @example component={NavLink} to="/dashboard"
   * @example component="a" href="/settings"
   */
  component?: BaseComponent;
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Tab. A thin wrapper around MUI's `Tab` with style override
 * hooks for the active theme.
 *
 * Always used inside a {@link Tabs} container. Supports rendering as any
 * element — most commonly a router link for SPA navigation.
 *
 * **Basic usage:**
 * ```tsx
 * <Tabs value={value} onChange={(_, v) => setValue(v as number)}>
 *   <Tab label="Dashboard" />
 *   <Tab label="Analytics" />
 * </Tabs>
 * ```
 *
 * **Router integration (react-router-dom):**
 * ```tsx
 * import { NavLink } from "react-router-dom";
 *
 * <Tabs value={location.pathname}>
 *   <Tab component={NavLink} to="/dashboard" value="/dashboard" label="Dashboard" />
 *   <Tab component={NavLink} to="/analytics" value="/analytics" label="Analytics" />
 * </Tabs>
 * ```
 *
 * **With icon:**
 * ```tsx
 * <Tab icon={<HomeIcon />} iconPosition="start" label="Home" />
 * ```
 *
 * All MUI `TabProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-tabs/
 */
const Tab = forwardRef(TabImpl) as <
  BaseComponent extends ElementType = TabTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: TabProps<BaseComponent, AdditionalProps> & {
    ref?: React.Ref<HTMLElement>;
  },
) => JSX.Element;

export default Tab;
