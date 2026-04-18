import {
  CircularProgress as MuiCircularProgress,
  type CircularProgressProps as MuiCircularProgressProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./CircularProgress.styles";

const useStyles = makeStyles({ name: "CircularProgress" });

function CircularProgressImpl(
  { className, classes: overrideClasses, ...props }: CircularProgressProps,
  ref: React.Ref<HTMLSpanElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiCircularProgress
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system CircularProgress.
 *
 * Currently passes through all MUI {@link MuiCircularProgressProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `color` to the design token set:
 * ```ts
 * export type CircularProgressProps = Omit<MuiCircularProgressProps, "color"> & {
 *   color?: "primary" | "success" | "warning" | "error";
 * };
 * ```
 */
export type CircularProgressProps = Omit<MuiCircularProgressProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system CircularProgress. A thin wrapper around MUI's
 * `CircularProgress` with style override hooks for the active theme.
 *
 * **Indeterminate (default — for unknown duration):**
 * ```tsx
 * <CircularProgress />
 * ```
 *
 * **Determinate (known progress value):**
 * ```tsx
 * <CircularProgress variant="determinate" value={75} />
 * ```
 *
 * **Custom size and color:**
 * ```tsx
 * <CircularProgress size={60} color="success" />
 * ```
 *
 * All MUI `CircularProgressProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-progress/
 */
const CircularProgress = forwardRef(CircularProgressImpl) as (
  props: CircularProgressProps & { ref?: React.Ref<HTMLSpanElement> },
) => JSX.Element;

export default CircularProgress;
