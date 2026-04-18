import {
  DialogActions as MuiDialogActions,
  type DialogActionsProps as MuiDialogActionsProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./DialogActions.styles";

const useStyles = makeStyles({ name: "DialogActions" });

function DialogActionsImpl(
  { className, classes: overrideClasses, ...props }: DialogActionsProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiDialogActions
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system DialogActions.
 *
 * Currently passes through all MUI {@link MuiDialogActionsProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type DialogActionsProps = Omit<MuiDialogActionsProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system DialogActions. A thin wrapper around MUI's `DialogActions` with
 * style override hooks for the active theme.
 *
 * Renders the action button row at the bottom of a {@link Dialog}.
 *
 * ```tsx
 * <Dialog open={open}>
 *   <DialogContent>...</DialogContent>
 *   <DialogActions>
 *     <Button onClick={handleClose}>Cancel</Button>
 *     <Button onClick={handleConfirm} variant="contained">Confirm</Button>
 *   </DialogActions>
 * </Dialog>
 * ```
 * @see https://mui.com/material-ui/react-dialog/
 */
const DialogActions = forwardRef(DialogActionsImpl) as (
  props: DialogActionsProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default DialogActions;
