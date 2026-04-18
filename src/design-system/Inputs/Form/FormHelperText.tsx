import {
  FormHelperText as MuiFormHelperText,
  type FormHelperTextProps as MuiFormHelperTextProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./FormHelperText.styles";

const useStyles = makeStyles({ name: "FormHelperText" });

function FormHelperTextImpl(
  { className, classes: overrideClasses, ...props }: FormHelperTextProps,
  ref: React.Ref<HTMLParagraphElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiFormHelperText
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system FormHelperText.
 *
 * Currently passes through all MUI {@link MuiFormHelperTextProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type FormHelperTextProps = Omit<MuiFormHelperTextProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system FormHelperText. A thin wrapper around MUI's `FormHelperText`
 * with style override hooks for the active theme.
 *
 * Renders hint or error text below a form field. Inherits `error` state from
 * a parent {@link FormControl}.
 *
 * ```tsx
 * <FormControl error>
 *   <InputLabel>Email</InputLabel>
 *   <Select ... />
 *   <FormHelperText>This field is required</FormHelperText>
 * </FormControl>
 * ```
 * @see https://mui.com/material-ui/react-text-field/#form-props
 */
const FormHelperText = forwardRef(FormHelperTextImpl) as (
  props: FormHelperTextProps & { ref?: React.Ref<HTMLParagraphElement> },
) => JSX.Element;

export default FormHelperText;
