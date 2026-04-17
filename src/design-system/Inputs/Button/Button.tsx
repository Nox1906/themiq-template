import { type ElementType, forwardRef, type JSX } from "react";

import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
  type ButtonTypeMap,
} from "@mui/material";

import makeStyles from "./Button.styles";

const useStyles = makeStyles({ name: "Button" });

/**
 * Props for the design-system Button.
 *
 * Uses `BaseComponent` and `AdditionalProps` generics because MUI's `Button` is
 * **polymorphic** — it can render as any HTML element via the `component` prop
 * (e.g. `<Button component="a" href="...">`) and TypeScript narrows the
 * allowed props and ref type accordingly.
 *
 * Currently all MUI {@link MuiButtonProps} pass through unchanged. The only
 * addition is the explicit `component` and `target` convenience props.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `variant` to the design token set:
 * ```ts
 * export type ButtonProps<...> = Omit<MuiButtonProps<...>, "variant"> & {
 *   variant?: "primary" | "secondary" | "tertiary" | "destructive";
 * };
 * ```
 *
 * @example Also constrain `size`:
 * ```ts
 * export type ButtonProps<...> = Omit<MuiButtonProps<...>, "variant" | "size"> & {
 *   variant?: "primary" | "secondary" | "tertiary" | "destructive";
 *   size?: "medium" | "large";
 * };
 * ```
 */
export type ButtonProps<
  BaseComponent extends ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
> = Omit<MuiButtonProps<BaseComponent, AdditionalProps>, never> & {
  /**
   * The root element to render. Useful for rendering the button as a link.
   * @example component="a" href="/path"
   */
  component?: BaseComponent;
  /** `target` attribute — only relevant when `component="a"`. */
  target?: string;
  // ─── Design-system overrides ──────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for worked examples.
};

/**
 * Design-system Button. A thin wrapper around MUI's `Button` with style
 * override hooks for the active theme.
 *
 * **Basic usage:**
 * ```tsx
 * <Button>Save</Button>
 * <Button variant="contained" color="primary">Submit</Button>
 * ```
 *
 * **As a link:**
 * ```tsx
 * <Button component="a" href="/dashboard">Go to dashboard</Button>
 * ```
 *
 * All MUI `ButtonProps` (e.g. `variant`, `size`, `color`, `disabled`,
 * `onClick`, `startIcon`) are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
function ButtonImpl<
  BaseComponent extends ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  {
    className,
    classes: overrideClasses,
    ...props
  }: ButtonProps<BaseComponent, AdditionalProps>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const { classes, cx } = useStyles(
    {},
    {
      props: { classes: overrideClasses },
    },
  );

  return (
    <MuiButton
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
      disableElevation
    />
  );
}

const Button = forwardRef(ButtonImpl) as <
  BaseComponent extends ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: ButtonProps<BaseComponent, AdditionalProps> & {
    ref?: React.Ref<HTMLButtonElement>;
  },
) => JSX.Element;

export default Button;
