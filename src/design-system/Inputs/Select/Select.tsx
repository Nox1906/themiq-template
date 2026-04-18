import {
  Select as MuiSelect,
  type SelectProps as MuiSelectProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./Select.styles";

const useStyles = makeStyles({ name: "Select" });

function SelectImpl<Value = string>(
  { className, classes: overrideClasses, ...props }: SelectProps<Value>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiSelect
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Select.
 *
 * Currently passes through all MUI {@link MuiSelectProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `variant` to two options:
 * ```ts
 * export type SelectProps<Value = string> = Omit<MuiSelectProps<Value>, "variant"> & {
 *   variant?: "outlined" | "filled";
 * };
 * ```
 */
export type SelectProps<Value = string> = Omit<MuiSelectProps<Value>, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Select. A thin wrapper around MUI's `Select` with style
 * override hooks for the active theme.
 *
 * **Typical usage (with FormControl for label support):**
 * ```tsx
 * <FormControl>
 *   <InputLabel>Age</InputLabel>
 *   <Select label="Age" defaultValue={10}>
 *     <MenuItem value={10}>Ten</MenuItem>
 *     <MenuItem value={20}>Twenty</MenuItem>
 *   </Select>
 * </FormControl>
 * ```
 *
 * **Multiple selection:**
 * ```tsx
 * <Select multiple defaultValue={["a", "b"]}>
 *   <MenuItem value="a">A</MenuItem>
 *   <MenuItem value="b">B</MenuItem>
 * </Select>
 * ```
 *
 * All MUI `SelectProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-select/
 */
const Select = forwardRef(SelectImpl) as <Value = string>(
  props: SelectProps<Value> & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default Select;
