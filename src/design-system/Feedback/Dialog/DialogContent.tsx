import {
  DialogContent as MuiDialogContent,
  type DialogContentProps as MuiDialogContentProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./DialogContent.styles";

const useStyles = makeStyles({ name: "DialogContent" });

function DialogContentImpl(
  { className, classes: overrideClasses, ...props }: DialogContentProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiDialogContent
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system DialogContent.
 *
 * Currently passes through all MUI {@link MuiDialogContentProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type DialogContentProps = Omit<MuiDialogContentProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system DialogContent. A thin wrapper around MUI's `DialogContent`
 * with style override hooks for the active theme.
 *
 * The scrollable body area of a {@link Dialog}. Typically contains
 * {@link DialogContentText} and form fields.
 *
 * ```tsx
 * <Dialog open={open}>
 *   <DialogTitle>Confirm action</DialogTitle>
 *   <DialogContent>
 *     <DialogContentText>Are you sure you want to proceed?</DialogContentText>
 *   </DialogContent>
 *   <DialogActions>...</DialogActions>
 * </Dialog>
 * ```
 * @see https://mui.com/material-ui/react-dialog/
 */
const DialogContent = forwardRef(DialogContentImpl) as (
  props: DialogContentProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default DialogContent;
