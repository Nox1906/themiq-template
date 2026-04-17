import { type ElementType, forwardRef, type JSX } from "react";
import React from "react";
import {
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps,
  type IconButtonTypeMap,
} from "@mui/material";

import Icon, { type IconProps } from "../../DataDisplay/Icon/Icon";
import makeStyles from "./IconButton.styles";

const useStyles = makeStyles({ name: "IconButton" });

function IconButtonImpl<
  BaseComponent extends ElementType = IconButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  {
    className,
    classes: overrideClasses,
    children,
    name,
    iconComponent,
    iconSize = "md",
    ...props
  }: IconButtonProps<BaseComponent, AdditionalProps>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiIconButton
      ref={ref}
      {...(props as MuiIconButtonProps)}
      classes={classes}
      className={cx(classes.root, className)}
    >
      {children ?? (
        <Icon name={name} component={iconComponent} size={iconSize} />
      )}
    </MuiIconButton>
  );
}

/**
 * Props for the design-system IconButton.
 *
 * Uses `BaseComponent` and `AdditionalProps` generics because MUI's
 * `IconButton` is **polymorphic** — it can render as any element via the
 * `component` prop (e.g. `component="a" href="..."` for link icon buttons).
 *
 * Integrates directly with the design-system {@link Icon} component. You can
 * pass `name`, `iconComponent`, and `iconSize` to render an icon inline
 * instead of writing `<MuiIconButton><Icon name="Delete" /></MuiIconButton>`
 * every time. If you pass `children` they take precedence over the icon props.
 *
 * Currently all MUI {@link MuiIconButtonProps} pass through unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `size` to the design token set:
 * ```ts
 * export type IconButtonProps<...> = Omit<MuiIconButtonProps<...>, "size"> & {
 *   name?: IconName;
 *   iconComponent?: React.ElementType;
 *   iconSize?: IconProps["size"];
 *   size?: "small" | "medium"; // drop "large"
 * };
 * ```
 */
export type IconButtonProps<
  BaseComponent extends ElementType = IconButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
> = Omit<MuiIconButtonProps<BaseComponent, AdditionalProps>, never> & {
  /**
   * The root element to render. Useful for rendering as a link.
   * @example component="a" href="/path"
   * @example component={NavLink} to="/dashboard"
   */
  component?: BaseComponent;
  /** `target` attribute — only relevant when `component="a"`. */
  target?: string;
  /**
   * Name of the icon to render (from the design-system icon registry).
   * Shorthand for `<IconButton><Icon name="..." /></IconButton>`.
   * Ignored when `children` is provided.
   * @example name="Delete"
   */
  name?: IconProps["name"];
  /**
   * Pass a raw SVG or React component as the icon directly.
   * Takes precedence over `name`. Ignored when `children` is provided.
   * @example iconComponent={MyCustomSvg}
   */
  iconComponent?: IconProps["component"];
  /**
   * Size of the rendered icon. Maps to the design-system icon size scale.
   * Ignored when `children` is provided.
   * @default "md"
   */
  iconSize?: IconProps["size"];
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system IconButton. A thin wrapper around MUI's `IconButton` with
 * style override hooks for the active theme and built-in integration with
 * the design-system {@link Icon} component.
 *
 * The `name`, `iconComponent`, and `iconSize` props let you pass the icon
 * inline without wrapping `<Icon>` manually. Passing `children` bypasses
 * these props entirely and renders as normal.
 *
 * **With icon name (recommended):**
 * ```tsx
 * <IconButton name="Delete" aria-label="Delete item" />
 * <IconButton name="Edit" size="small" aria-label="Edit" />
 * ```
 *
 * **With a raw component:**
 * ```tsx
 * import StarIcon from "@mui/icons-material/Star";
 * <IconButton iconComponent={StarIcon} aria-label="Favourite" />
 * ```
 *
 * **With explicit children (bypasses icon props):**
 * ```tsx
 * <IconButton aria-label="Custom">
 *   <Icon name="Settings" size="lg" />
 * </IconButton>
 * ```
 *
 * **As a link:**
 * ```tsx
 * <IconButton component="a" href="/settings" name="Settings" aria-label="Settings" />
 * ```
 *
 * All MUI `IconButtonProps` (e.g. `color`, `size`, `disabled`, `onClick`,
 * `edge`) are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
const IconButton = forwardRef(IconButtonImpl) as <
  BaseComponent extends ElementType = IconButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: IconButtonProps<BaseComponent, AdditionalProps> & {
    ref?: React.Ref<HTMLButtonElement>;
  },
) => JSX.Element;

export default IconButton;
