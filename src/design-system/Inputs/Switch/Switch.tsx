import { forwardRef, type JSX } from "react";
import React from "react";
import {
  Switch as MuiSwitch,
  type SwitchProps as MuiSwitchProps,
} from "@mui/material";

import makeStyles from "./Switch.styles";

const useStyles = makeStyles({ name: "Switch" });


function SwitchImpl(
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

/**
 * Props for the design-system Switch.
 *
 * Currently passes through all MUI {@link MuiSwitchProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `color` to the design token set:
 * ```ts
 * export type SwitchProps = Omit<MuiSwitchProps, "color"> & {
 *   color?: "default" | "primary";
 * };
 * ```
 */
export type SwitchProps = Omit<MuiSwitchProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

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
const Switch = forwardRef(SwitchImpl) as (
  props: SwitchProps & { ref?: React.Ref<HTMLButtonElement> },
) => JSX.Element;

export default Switch;