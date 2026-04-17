import { forwardRef, type JSX } from "react";
import React from "react";
import {
  TextField as MuiTextField,
  type OutlinedTextFieldProps,
  type TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

import makeStyles from "./TextField.styles";

const useStyles = makeStyles({ name: "TextField" });


function TextFieldImpl(
  { className, classes: overrideClasses, ...props }: TextFieldProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiTextField
      ref={ref}
      {...(props as MuiTextFieldProps)}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system TextField.
 *
 * Based on `OutlinedTextFieldProps` (MUI's default variant) with `variant`
 * widened to a plain string union — this avoids TypeScript's discriminated-union
 * resolution issues when Storybook or generic code passes `variant` as a string.
 *
 * **How to add a design-system override:**
 * 1. Add the prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Replace `size` with a design-token-aware union:
 * ```ts
 * export type TextFieldProps = Omit<OutlinedTextFieldProps, "variant" | "size"> & {
 *   variant?: "outlined" | "filled" | "standard";
 *   size?: "small" | "medium"; // keep only these two
 * };
 * ```
 */
export type TextFieldProps = Omit<OutlinedTextFieldProps, "variant"> & {
  variant?: "outlined" | "filled" | "standard";
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `Omit<OutlinedTextFieldProps, "variant">` with the full set of
  // props you want to remove, then declare replacements here.
};

/**
 * Design-system TextField. A thin wrapper around MUI's `TextField` with style
 * override hooks for the active theme.
 *
 * **Basic usage:**
 * ```tsx
 * <TextField label="Name" />
 * <TextField label="Email" type="email" required />
 * ```
 *
 * **With validation state:**
 * ```tsx
 * <TextField label="Password" error helperText="Too short" />
 * ```
 *
 * **Multiline:**
 * ```tsx
 * <TextField label="Notes" multiline rows={4} />
 * ```
 *
 * All MUI `TextFieldProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
const TextField = forwardRef(TextFieldImpl) as (
  props: TextFieldProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default TextField;