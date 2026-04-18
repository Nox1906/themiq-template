import {
  Dialog as MuiDialog,
  type DialogProps as MuiDialogProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./Dialog.styles";

const useStyles = makeStyles({ name: "Dialog" });

function DialogImpl(
  { className, classes: overrideClasses, ...props }: DialogProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiDialog
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Dialog.
 *
 * Currently passes through all MUI {@link MuiDialogProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `maxWidth` to the project's breakpoints:
 * ```ts
 * export type DialogProps = Omit<MuiDialogProps, "maxWidth"> & {
 *   maxWidth?: "xs" | "sm" | "md";
 * };
 * ```
 */
export type DialogProps = Omit<MuiDialogProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Dialog. A thin wrapper around MUI's `Dialog` with style
 * override hooks for the active theme.
 *
 * Dialog is a **controlled** component — you must manage `open` state.
 *
 * **Basic usage:**
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <Button onClick={() => setOpen(true)}>Open</Button>
 * <Dialog open={open} onClose={() => setOpen(false)}>
 *   <DialogTitle>Confirm deletion</DialogTitle>
 *   <DialogContent>
 *     <DialogContentText>This action cannot be undone.</DialogContentText>
 *   </DialogContent>
 *   <DialogActions>
 *     <Button onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button onClick={handleDelete} color="error">Delete</Button>
 *   </DialogActions>
 * </Dialog>
 * ```
 *
 * **Full-width:**
 * ```tsx
 * <Dialog open={open} onClose={close} fullWidth maxWidth="sm">...</Dialog>
 * ```
 *
 * All MUI `DialogProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-dialog/
 */
const Dialog = forwardRef(DialogImpl) as (
  props: DialogProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default Dialog;
