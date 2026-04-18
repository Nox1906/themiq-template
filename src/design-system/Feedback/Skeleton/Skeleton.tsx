import {
  Skeleton as MuiSkeleton,
  type SkeletonProps as MuiSkeletonProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./Skeleton.styles";

const useStyles = makeStyles({ name: "Skeleton" });

function SkeletonImpl(
  { className, classes: overrideClasses, ...props }: SkeletonProps,
  ref: React.Ref<HTMLSpanElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiSkeleton
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Skeleton.
 *
 * Currently passes through all MUI {@link MuiSkeletonProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Add a convenience `shape` prop that maps to `variant`:
 * ```ts
 * export type SkeletonProps = Omit<MuiSkeletonProps, "variant"> & {
 *   variant?: "text" | "circular" | "rectangular";
 * };
 * ```
 */
export type SkeletonProps = Omit<MuiSkeletonProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Skeleton. A thin wrapper around MUI's `Skeleton` with style
 * override hooks for the active theme.
 *
 * **Text placeholder:**
 * ```tsx
 * <Skeleton variant="text" width={200} />
 * ```
 *
 * **Circular (e.g. avatar):**
 * ```tsx
 * <Skeleton variant="circular" width={40} height={40} />
 * ```
 *
 * **Rectangular (e.g. image/card):**
 * ```tsx
 * <Skeleton variant="rectangular" width={210} height={118} />
 * ```
 *
 * **Replacing real content (sizes inferred):**
 * ```tsx
 * <Typography variant="h3">
 *   <Skeleton />
 * </Typography>
 * ```
 *
 * All MUI `SkeletonProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-skeleton/
 */
const Skeleton = forwardRef(SkeletonImpl) as (
  props: SkeletonProps & { ref?: React.Ref<HTMLSpanElement> },
) => JSX.Element;

export default Skeleton;
