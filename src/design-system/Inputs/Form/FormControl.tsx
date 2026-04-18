import {
  FormControl as MuiFormControl,
  type FormControlProps as MuiFormControlProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./FormControl.styles";

const useStyles = makeStyles({ name: "FormControl" });

function FormControlImpl(
  { className, classes: overrideClasses, ...props }: FormControlProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiFormControl
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system FormControl.
 *
 * Currently passes through all MUI {@link MuiFormControlProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type FormControlProps = Omit<MuiFormControlProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system FormControl. A thin wrapper around MUI's `FormControl` with
 * style override hooks for the active theme.
 *
 * Groups a form field with its label and helper text, and propagates shared
 * state (`error`, `disabled`, `required`, `focused`) to children.
 *
 * ```tsx
 * <FormControl error sx={{ minWidth: 220 }}>
 *   <InputLabel>Fruit</InputLabel>
 *   <Select label="Fruit" defaultValue="">
 *     {options.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
 *   </Select>
 *   <FormHelperText>Required field</FormHelperText>
 * </FormControl>
 * ```
 * @see https://mui.com/material-ui/react-text-field/#form-props
 */
const FormControl = forwardRef(FormControlImpl) as (
  props: FormControlProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default FormControl;
