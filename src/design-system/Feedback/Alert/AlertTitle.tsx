import {
  AlertTitle as MuiAlertTitle,
  type AlertTitleProps as MuiAlertTitleProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./AlertTitle.styles";

const useStyles = makeStyles({ name: "AlertTitle" });

function AlertTitleImpl(
  { className, classes: overrideClasses, ...props }: AlertTitleProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiAlertTitle
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system AlertTitle.
 *
 * Currently passes through all MUI {@link MuiAlertTitleProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type AlertTitleProps = Omit<MuiAlertTitleProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system AlertTitle. A thin wrapper around MUI's `AlertTitle` with style
 * override hooks for the active theme.
 *
 * Used as the first child of {@link Alert} to render a bold heading.
 *
 * ```tsx
 * <Alert severity="info">
 *   <AlertTitle>Note</AlertTitle>
 *   Additional context goes here.
 * </Alert>
 * ```
 * @see https://mui.com/material-ui/react-alert/
 */
const AlertTitle = forwardRef(AlertTitleImpl) as (
  props: AlertTitleProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default AlertTitle;
