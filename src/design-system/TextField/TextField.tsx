import { forwardRef, type JSX } from "react";
import React from "react";
import {
  TextField as MuiTextField,
  type OutlinedTextFieldProps,
  type TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

import makeStyles from "./TextField.styles";

const useStyles = makeStyles({ name: { TextField } });

/**
 * Flattened TextField props — based on `OutlinedTextFieldProps` (the default
 * MUI variant) with `variant` widened to a plain string union so that Storybook
 * and TypeScript can work with it without discriminated-union resolution issues.
 */
export type TextFieldProps = Omit<OutlinedTextFieldProps, "variant"> & {
  variant?: "outlined" | "filled" | "standard";
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
function TextField(
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

export default forwardRef(TextField) as (
  props: TextFieldProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;
