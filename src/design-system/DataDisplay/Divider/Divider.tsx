import {
  Divider as MuiDivider,
  type DividerProps as MuiDividerProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./Divider.styles";

const useStyles = makeStyles({ name: "Divider" });

function DividerImpl(
  { className, classes: overrideClasses, ...props }: DividerProps,
  ref: React.Ref<HTMLHRElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiDivider
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Divider.
 *
 * Currently passes through all MUI {@link MuiDividerProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `orientation` and inset behaviour:
 * ```ts
 * export type DividerProps = Omit<MuiDividerProps, "variant"> & {
 *   variant?: "fullWidth" | "inset"; // drop "middle"
 * };
 * ```
 */
export type DividerProps = Omit<MuiDividerProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Divider. A thin wrapper around MUI's `Divider` with style
 * override hooks for the active theme.
 *
 * **Horizontal (default):**
 * ```tsx
 * <Divider />
 * ```
 *
 * **Vertical (in flex container):**
 * ```tsx
 * <Box sx={{ display: "flex", height: 40 }}>
 *   <span>Left</span>
 *   <Divider orientation="vertical" flexItem />
 *   <span>Right</span>
 * </Box>
 * ```
 *
 * **With text label:**
 * ```tsx
 * <Divider>OR</Divider>
 * <Divider>Section title</Divider>
 * ```
 *
 * All MUI `DividerProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-divider/
 */
const Divider = forwardRef(DividerImpl) as (
  props: DividerProps & { ref?: React.Ref<HTMLHRElement> },
) => JSX.Element;

export default Divider;
