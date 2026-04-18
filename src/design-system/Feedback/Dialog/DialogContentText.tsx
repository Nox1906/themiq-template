import {
  DialogContentText as MuiDialogContentText,
  type DialogContentTextProps as MuiDialogContentTextProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./DialogContentText.styles";

const useStyles = makeStyles({ name: "DialogContentText" });

function DialogContentTextImpl(
  { className, classes: overrideClasses, ...props }: DialogContentTextProps,
  ref: React.Ref<HTMLParagraphElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiDialogContentText
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system DialogContentText.
 *
 * Currently passes through all MUI {@link MuiDialogContentTextProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type DialogContentTextProps = Omit<MuiDialogContentTextProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system DialogContentText. A thin wrapper around MUI's
 * `DialogContentText` with style override hooks for the active theme.
 *
 * Renders descriptive body text inside {@link DialogContent}, styled as muted
 * secondary text.
 *
 * ```tsx
 * <DialogContent>
 *   <DialogContentText>
 *     Deleting this item is permanent and cannot be undone.
 *   </DialogContentText>
 * </DialogContent>
 * ```
 * @see https://mui.com/material-ui/react-dialog/
 */
const DialogContentText = forwardRef(DialogContentTextImpl) as (
  props: DialogContentTextProps & { ref?: React.Ref<HTMLParagraphElement> },
) => JSX.Element;

export default DialogContentText;
