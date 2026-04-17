import { type ElementType, forwardRef, type JSX } from "react";
import React from "react";
import {
  List as MuiList,
  type ListProps as MuiListProps,
  type ListTypeMap,
} from "@mui/material";

import makeStyles from "./List.styles";

const useStyles = makeStyles({ name: "List" });

function ListImpl<
  BaseComponent extends ElementType = ListTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  {
    className,
    classes: overrideClasses,
    ...props
  }: ListProps<BaseComponent, AdditionalProps>,
  ref: React.Ref<HTMLElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiList
      ref={ref as React.Ref<HTMLUListElement>}
      {...(props as MuiListProps)}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system List.
 *
 * Uses `BaseComponent` and `AdditionalProps` generics because MUI's `List` is
 * **polymorphic** — it can render as any HTML element via the `component` prop.
 * The most common use case is rendering the list as a semantic nav element:
 *
 * ```tsx
 * <List component="nav">...</List>
 * <List component="ol">...</List>
 * ```
 *
 * TypeScript will automatically narrow the allowed props based on whatever you
 * pass to `component`.
 *
 * Currently all MUI {@link MuiListProps} pass through unchanged. The only
 * explicit addition is `component` to make the polymorphic intent clear.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Remove `disablePadding` and enforce it always on:
 * ```ts
 * export type ListProps<...> = Omit<MuiListProps<...>, "disablePadding"> & {
 *   // disablePadding always true — padding controlled via theme
 * };
 * ```
 */
export type ListProps<
  BaseComponent extends ElementType = ListTypeMap["defaultComponent"],
  AdditionalProps = object,
> = Omit<MuiListProps<BaseComponent, AdditionalProps>, never> & {
  /**
   * The root element to render. Use for correct semantic HTML.
   * @example component="nav"
   * @example component="ol"
   */
  component?: BaseComponent;
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system List. A thin wrapper around MUI's `List` with style
 * override hooks for the active theme.
 *
 * List is a polymorphic container — use `component` for the correct semantic
 * element. Pair with {@link ListItem} for individual rows.
 *
 * **Basic list:**
 * ```tsx
 * import { ListItemText } from "@mui/material";
 *
 * <List>
 *   <ListItem><ListItemText primary="Item 1" /></ListItem>
 *   <ListItem><ListItemText primary="Item 2" /></ListItem>
 * </List>
 * ```
 *
 * **Navigation list:**
 * ```tsx
 * import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
 * import HomeIcon from "@mui/icons-material/Home";
 *
 * <List component="nav">
 *   <ListItem disablePadding>
 *     <ListItemButton>
 *       <ListItemIcon><HomeIcon /></ListItemIcon>
 *       <ListItemText primary="Home" />
 *     </ListItemButton>
 *   </ListItem>
 * </List>
 * ```
 *
 * All MUI `ListProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
const List = forwardRef(ListImpl) as <
  BaseComponent extends ElementType = ListTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: ListProps<BaseComponent, AdditionalProps> & {
    ref?: React.Ref<HTMLElement>;
  },
) => JSX.Element;

export default List;
