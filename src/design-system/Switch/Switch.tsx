import { forwardRef, type JSX } from "react";
import React from "react";
import {
  Switch as MuiSwitch,
  type SwitchProps as MuiSwitchProps,
} from "@mui/material";

import makeStyles from "./Switch.styles";

const useStyles = makeStyles({ name: { Switch } });

export type SwitchProps = MuiSwitchProps;

/**
 * Design-system Switch. A thin wrapper around MUI's `Switch` with style
 * override hooks for the active theme.
 *
 * **Standalone:**
 * ```tsx
 * <Switch defaultChecked />
 * ```
 *
 * **With a label (recommended for accessibility):**
 * ```tsx
 * <FormControlLabel control={<Switch />} label="Enable notifications" />
 * ```
 *
 * **Controlled:**
 * ```tsx
 * <Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
 * ```
 *
 * All MUI `SwitchProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
function Switch(
  { className, classes: overrideClasses, ...props }: SwitchProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiSwitch
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

export default forwardRef(Switch) as (
  props: SwitchProps & { ref?: React.Ref<HTMLButtonElement> },
) => JSX.Element;
