import { forwardRef, type JSX } from "react";
import React from "react";
import {
  FormLabel as MuiFormLabel,
  type FormLabelProps as MuiFormLabelProps,
} from "@mui/material";

import makeStyles from "./FormLabel.styles";

const useStyles = makeStyles({ name: "FormLabel" });


function FormLabelImpl(
  { className, classes: overrideClasses, ...props }: FormLabelProps,
  ref: React.Ref<HTMLLabelElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiFormLabel
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system FormLabel.
 *
 * Currently passes through all MUI {@link MuiFormLabelProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type FormLabelProps = Omit<MuiFormLabelProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system FormLabel. A thin wrapper around MUI's `FormLabel` with style
 * override hooks for the active theme.
 *
 * A label for a group of form controls, commonly used above a
 * {@link RadioGroup} or group of {@link Checkbox} controls.
 *
 * ```tsx
 * <FormControl>
 *   <FormLabel>Gender</FormLabel>
 *   <RadioGroup>
 *     <FormControlLabel value="female" control={<Radio />} label="Female" />
 *     <FormControlLabel value="male" control={<Radio />} label="Male" />
 *   </RadioGroup>
 * </FormControl>
 * ```
 */
const FormLabel = forwardRef(FormLabelImpl) as (
  props: FormLabelProps & { ref?: React.Ref<HTMLLabelElement> },
) => JSX.Element;

export default FormLabel;