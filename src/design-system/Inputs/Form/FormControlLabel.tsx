import { forwardRef, type JSX } from "react";
import React from "react";
import {
  FormControlLabel as MuiFormControlLabel,
  type FormControlLabelProps as MuiFormControlLabelProps,
} from "@mui/material";

import makeStyles from "./FormControlLabel.styles";

const useStyles = makeStyles({ name: "FormControlLabel" });


function FormControlLabelImpl(
  { className, classes: overrideClasses, ...props }: FormControlLabelProps,
  ref: React.Ref<HTMLLabelElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiFormControlLabel
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system FormControlLabel.
 *
 * Currently passes through all MUI {@link MuiFormControlLabelProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type FormControlLabelProps = Omit<MuiFormControlLabelProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system FormControlLabel. A thin wrapper around MUI's
 * `FormControlLabel` with style override hooks for the active theme.
 *
 * Pairs a control ({@link Checkbox}, {@link Radio}, {@link Switch}) with a
 * clickable text label.
 *
 * ```tsx
 * <FormControlLabel
 *   control={<Checkbox />}
 *   label="Accept terms and conditions"
 * />
 * ```
 */
const FormControlLabel = forwardRef(FormControlLabelImpl) as (
  props: FormControlLabelProps & { ref?: React.Ref<HTMLLabelElement> },
) => JSX.Element;

export default FormControlLabel;