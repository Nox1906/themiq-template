import {
  Radio as MuiRadio,
  type RadioProps as MuiRadioProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./Radio.styles";

const useStyles = makeStyles({ name: "Radio" });

function RadioImpl(
  { className, classes: overrideClasses, ...props }: RadioProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiRadio
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Radio.
 *
 * Currently passes through all MUI {@link MuiRadioProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `color` to the design token set:
 * ```ts
 * export type RadioProps = Omit<MuiRadioProps, "color"> & {
 *   color?: "default" | "primary";
 * };
 * ```
 */
export type RadioProps = Omit<MuiRadioProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Radio button. A thin wrapper around MUI's `Radio` with style
 * override hooks for the active theme.
 *
 * **Standalone:**
 * ```tsx
 * <Radio value="a" checked />
 * ```
 *
 * **With a label (recommended for accessibility):**
 * ```tsx
 * <FormControlLabel value="a" control={<Radio />} label="Option A" />
 * ```
 *
 * **In a group (typical usage):**
 * ```tsx
 * <RadioGroup defaultValue="b">
 *   <FormControlLabel value="a" control={<Radio />} label="Option A" />
 *   <FormControlLabel value="b" control={<Radio />} label="Option B" />
 * </RadioGroup>
 * ```
 *
 * All MUI `RadioProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-radio-button/
 */
const Radio = forwardRef(RadioImpl) as (
  props: RadioProps & { ref?: React.Ref<HTMLButtonElement> },
) => JSX.Element;

export default Radio;
