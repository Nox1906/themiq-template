import { forwardRef, type JSX } from "react";
import React from "react";
import {
  InputLabel as MuiInputLabel,
  type InputLabelProps as MuiInputLabelProps,
} from "@mui/material";

import makeStyles from "./InputLabel.styles";

const useStyles = makeStyles({ name: "InputLabel" });


function InputLabelImpl(
  { className, classes: overrideClasses, ...props }: InputLabelProps,
  ref: React.Ref<HTMLLabelElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiInputLabel
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system InputLabel.
 *
 * Currently passes through all MUI {@link MuiInputLabelProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type InputLabelProps = Omit<MuiInputLabelProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system InputLabel. A thin wrapper around MUI's `InputLabel` with
 * style override hooks for the active theme.
 *
 * A floating label for outlined/filled/standard inputs. Used inside
 * {@link FormControl} paired with a {@link Select} or MUI input.
 *
 * ```tsx
 * <FormControl sx={{ minWidth: 220 }}>
 *   <InputLabel>Fruit</InputLabel>
 *   <Select label="Fruit" defaultValue="apple">
 *     {options.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
 *   </Select>
 * </FormControl>
 * ```
 */
const InputLabel = forwardRef(InputLabelImpl) as (
  props: InputLabelProps & { ref?: React.Ref<HTMLLabelElement> },
) => JSX.Element;

export default InputLabel;