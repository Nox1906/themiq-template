import {
  Alert as MuiAlert,
  type AlertProps as MuiAlertProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./Alert.styles";

const useStyles = makeStyles({ name: "Alert" });

function AlertImpl(
  { className, classes: overrideClasses, ...props }: AlertProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiAlert
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Alert.
 *
 * Currently passes through all MUI {@link MuiAlertProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `severity` to a subset:
 * ```ts
 * export type AlertProps = Omit<MuiAlertProps, "variant"> & {
 *   variant?: "filled" | "outlined"; // drop "standard"
 * };
 * ```
 */
export type AlertProps = Omit<MuiAlertProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Alert. A thin wrapper around MUI's `Alert` with style
 * override hooks for the active theme.
 *
 * **Basic usage:**
 * ```tsx
 * <Alert severity="info">Something to note.</Alert>
 * <Alert severity="error">Upload failed.</Alert>
 * ```
 *
 * **With a title:**
 * ```tsx
 * <Alert severity="success">
 *   <AlertTitle>Done</AlertTitle>
 *   Your changes were saved.
 * </Alert>
 * ```
 *
 * **Dismissible:**
 * ```tsx
 * <Alert severity="warning" onClose={() => dismiss()}>
 *   Session expires in 5 minutes.
 * </Alert>
 * ```
 *
 * All MUI `AlertProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-alert/
 */
const Alert = forwardRef(AlertImpl) as (
  props: AlertProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default Alert;
