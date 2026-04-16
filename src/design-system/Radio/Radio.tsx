import { forwardRef, type JSX } from "react";
import React from "react";
import {
  Radio as MuiRadio,
  type RadioProps as MuiRadioProps,
} from "@mui/material";

import makeStyles from "./Radio.styles";

const useStyles = makeStyles({ name: { Radio } });

export type RadioProps = MuiRadioProps;

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
 */
function Radio(
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

export default forwardRef(Radio) as (
  props: RadioProps & { ref?: React.Ref<HTMLButtonElement> },
) => JSX.Element;
