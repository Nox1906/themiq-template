import { forwardRef, type JSX } from "react";
import React from "react";
import {
  Drawer as MuiDrawer,
  type DrawerProps as MuiDrawerProps,
} from "@mui/material";

import makeStyles from "./Drawer.styles";

const useStyles = makeStyles({ name: "Drawer" });


function DrawerImpl(
  { className, classes: overrideClasses, ...props }: DrawerProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiDrawer
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Drawer.
 *
 * Currently passes through all MUI {@link MuiDrawerProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `anchor` to left/right only:
 * ```ts
 * export type DrawerProps = Omit<MuiDrawerProps, "anchor"> & {
 *   anchor?: "left" | "right";
 * };
 * ```
 */
export type DrawerProps = Omit<MuiDrawerProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Drawer. A thin wrapper around MUI's `Drawer` with style
 * override hooks for the active theme.
 *
 * Drawer is a **controlled component** — you must manage the `open` state.
 *
 * **Basic usage (left, temporary):**
 * ```tsx
 * const [open, setOpen] = React.useState(false);
 *
 * <>
 *   <button onClick={() => setOpen(true)}>Open drawer</button>
 *   <Drawer open={open} onClose={() => setOpen(false)}>
 *     <div style={{ width: 250 }}>Drawer content</div>
 *   </Drawer>
 * </>
 * ```
 *
 * **Anchored right:**
 * ```tsx
 * <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
 *   <div style={{ width: 300 }}>Right panel</div>
 * </Drawer>
 * ```
 *
 * **Permanent sidebar:**
 * ```tsx
 * <Drawer variant="permanent" anchor="left">
 *   <nav>...</nav>
 * </Drawer>
 * ```
 *
 * All MUI `DrawerProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
const Drawer = forwardRef(DrawerImpl) as (
  props: DrawerProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default Drawer;