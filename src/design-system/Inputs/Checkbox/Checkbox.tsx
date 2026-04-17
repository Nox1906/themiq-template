import { forwardRef, type JSX } from "react";
import React from "react";
import {
  Checkbox as MuiCheckbox,
  type CheckboxProps as MuiCheckboxProps,
} from "@mui/material";

import makeStyles from "./Checkbox.styles";

const useStyles = makeStyles({ name: "Checkbox" });


function CheckboxImpl(
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

/**
 * Props for the design-system Checkbox.
 *
 * Currently passes through all MUI {@link MuiCheckboxProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `color` to the design token set:
 * ```ts
 * export type CheckboxProps = Omit<MuiCheckboxProps, "color"> & {
 *   color?: "default" | "primary" | "danger";
 * };
 * ```
 */
export type CheckboxProps = Omit<MuiCheckboxProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

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
const Checkbox = forwardRef(CheckboxImpl) as (
  props: CheckboxProps & { ref?: React.Ref<HTMLButtonElement> },
) => JSX.Element;

export default Checkbox;