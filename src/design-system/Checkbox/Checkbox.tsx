import { forwardRef, type JSX } from "react";
import React from "react";
import {
  Checkbox as MuiCheckbox,
  type CheckboxProps as MuiCheckboxProps,
} from "@mui/material";

import makeStyles from "./Checkbox.styles";

const useStyles = makeStyles({ name: { Checkbox } });

export type CheckboxProps = MuiCheckboxProps;

/**
 * Design-system Checkbox. A thin wrapper around MUI's `Checkbox` with style
 * override hooks for the active theme.
 *
 * **Standalone:**
 * ```tsx
 * <Checkbox defaultChecked />
 * <Checkbox indeterminate />
 * ```
 *
 * **With a label (recommended for accessibility):**
 * ```tsx
 * <FormControlLabel control={<Checkbox />} label="Accept terms" />
 * ```
 *
 * **Controlled:**
 * ```tsx
 * <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
 * ```
 *
 * All MUI `CheckboxProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
function Checkbox(
  { className, classes: overrideClasses, ...props }: CheckboxProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiCheckbox
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

export default forwardRef(Checkbox) as (
  props: CheckboxProps & { ref?: React.Ref<HTMLButtonElement> },
) => JSX.Element;
