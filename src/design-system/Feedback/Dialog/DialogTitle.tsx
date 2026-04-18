import {
  DialogTitle as MuiDialogTitle,
  type DialogTitleProps as MuiDialogTitleProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./DialogTitle.styles";

const useStyles = makeStyles({ name: "DialogTitle" });

function DialogTitleImpl(
  { className, classes: overrideClasses, ...props }: DialogTitleProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiDialogTitle
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system DialogTitle.
 *
 * Currently passes through all MUI {@link MuiDialogTitleProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type DialogTitleProps = Omit<MuiDialogTitleProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system DialogTitle. A thin wrapper around MUI's `DialogTitle` with
 * style override hooks for the active theme.
 *
 * Renders the heading area of a {@link Dialog}.
 *
 * ```tsx
 * <Dialog open={open}>
 *   <DialogTitle>Confirm deletion</DialogTitle>
 *   <DialogContent>...</DialogContent>
 * </Dialog>
 * ```
 * @see https://mui.com/material-ui/react-dialog/
 */
const DialogTitle = forwardRef(DialogTitleImpl) as (
  props: DialogTitleProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default DialogTitle;
