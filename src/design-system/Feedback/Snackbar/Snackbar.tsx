import {
  Snackbar as MuiSnackbar,
  type SnackbarProps as MuiSnackbarProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./Snackbar.styles";

const useStyles = makeStyles({ name: "Snackbar" });

function SnackbarImpl(
  { className, classes: overrideClasses, ...props }: SnackbarProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiSnackbar
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Snackbar.
 *
 * Currently passes through all MUI {@link MuiSnackbarProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Add a semantic `intent` prop:
 * ```ts
 * export type SnackbarProps = Omit<MuiSnackbarProps, never> & {
 *   intent?: "info" | "success" | "warning" | "error";
 * };
 * ```
 */
export type SnackbarProps = Omit<MuiSnackbarProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Snackbar. A thin wrapper around MUI's `Snackbar` with style
 * override hooks for the active theme.
 *
 * Snackbar is a **controlled** component — you must manage `open` state.
 *
 * **Simple message:**
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <Button onClick={() => setOpen(true)}>Show</Button>
 * <Snackbar
 *   open={open}
 *   message="File saved"
 *   autoHideDuration={3000}
 *   onClose={() => setOpen(false)}
 * />
 * ```
 *
 * **With an Alert inside:**
 * ```tsx
 * <Snackbar open={open} onClose={() => setOpen(false)}>
 *   <Alert severity="success" onClose={() => setOpen(false)}>
 *     Saved!
 *   </Alert>
 * </Snackbar>
 * ```
 *
 * All MUI `SnackbarProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-snackbar/
 */
const Snackbar = forwardRef(SnackbarImpl) as (
  props: SnackbarProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default Snackbar;
