import { forwardRef, type JSX } from "react";
import React from "react";
import {
  Select as MuiSelect,
  type SelectProps as MuiSelectProps,
} from "@mui/material";

import makeStyles from "./Select.styles";

const useStyles = makeStyles({ name: { Select } });

export type SelectProps<Value = string> = MuiSelectProps<Value>;

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
 */
function Select<Value = string>(
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

export default forwardRef(Select) as <Value = string>(
  props: SelectProps<Value> & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;
