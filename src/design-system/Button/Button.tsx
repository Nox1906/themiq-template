import { type ElementType, forwardRef, type JSX } from "react";

import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
  type ButtonTypeMap,
  capitalize,
} from "@mui/material";

import makeStyles from "./Button.styles";

const useStyles = makeStyles({ name: { Button } });

export type ButtonProps<
  BaseComponent extends ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
> = Omit<MuiButtonProps<BaseComponent, AdditionalProps>, "variant" | "size"> & {
  /**
   * Visual style of the button.
   * - `primary` — main call-to-action, high emphasis.
   * - `secondary` — supporting action, medium emphasis.
   * - `tertiary` — low-emphasis or ghost style.
   * - `destructive` — irreversible or dangerous actions (e.g. delete).
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
  /**
   * Size of the button.
   * @default "medium"
   */
  size?: "medium" | "large";
  /**
   * The root element to render. Useful for rendering the button as a link.
   * @example component="a" href="/path"
   */
  component?: BaseComponent;
  /** `target` attribute — only relevant when `component="a"`. */
  target?: string;
};

/**
 * Design-system Button. Wraps MUI's `Button` with a constrained set of variants
 * and sizes aligned to the design token system.
 *
 * **Basic usage:**
 * ```tsx
 * <Button>Save</Button>
 * <Button variant="destructive" size="large">Delete account</Button>
 * ```
 *
 * **As a link:**
 * ```tsx
 * <Button component="a" href="/dashboard">Go to dashboard</Button>
 * ```
 *
 * The MUI `color` prop is intentionally ignored — colour is derived from `variant`
 * via the theme's style overrides.
 * All other MUI `ButtonProps` (e.g. `disabled`, `onClick`, `startIcon`) are forwarded.
 */
function Button<
  BaseComponent extends ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  {
    className,
    classes: overrideClasses,
    variant = "primary",
    color: _color, // Avoid incoming color to have any effect
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

  const variantName = `variant${capitalize(variant)}` as `variant${Capitalize<
    NonNullable<ButtonProps["variant"]>
  >}`;

  const variantClassName = classes[variantName];

  return (
    <MuiButton
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, variantClassName, className)}
      disableElevation
    />
  );
}

export default forwardRef(Button) as <
  BaseComponent extends ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: ButtonProps<BaseComponent, AdditionalProps> & {
    ref?: React.Ref<HTMLButtonElement>;
  },
) => JSX.Element;
