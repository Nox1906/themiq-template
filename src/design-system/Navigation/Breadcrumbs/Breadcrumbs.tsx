import { forwardRef, type JSX } from "react";
import React from "react";
import {
  Breadcrumbs as MuiBreadcrumbs,
  type BreadcrumbsProps as MuiBreadcrumbsProps,
} from "@mui/material";

import makeStyles from "./Breadcrumbs.styles";

const useStyles = makeStyles({ name: "Breadcrumbs" });


function BreadcrumbsImpl(
  { className, classes: overrideClasses, ...props }: BreadcrumbsProps,
  ref: React.Ref<HTMLElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiBreadcrumbs
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Breadcrumbs.
 *
 * Currently passes through all MUI {@link MuiBreadcrumbsProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Replace `separator` with a constrained icon set:
 * ```ts
 * export type BreadcrumbsProps = Omit<MuiBreadcrumbsProps, "separator"> & {
 *   separator?: "slash" | "arrow" | "chevron";
 * };
 * ```
 */
export type BreadcrumbsProps = Omit<MuiBreadcrumbsProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Breadcrumbs. A thin wrapper around MUI's `Breadcrumbs` with
 * style override hooks for the active theme.
 *
 * **Basic usage:**
 * ```tsx
 * import { Link, Typography } from "@mui/material";
 *
 * <Breadcrumbs>
 *   <Link href="/">Home</Link>
 *   <Link href="/products">Products</Link>
 *   <Typography color="text.primary">Detail</Typography>
 * </Breadcrumbs>
 * ```
 *
 * **Custom separator:**
 * ```tsx
 * <Breadcrumbs separator="›">
 *   <Link href="/">Home</Link>
 *   <Typography color="text.primary">Settings</Typography>
 * </Breadcrumbs>
 * ```
 *
 * **With max items collapsed:**
 * ```tsx
 * <Breadcrumbs maxItems={2}>
 *   <Link href="/">Home</Link>
 *   <Link href="/a">Level A</Link>
 *   <Link href="/a/b">Level B</Link>
 *   <Typography color="text.primary">Current</Typography>
 * </Breadcrumbs>
 * ```
 *
 * All MUI `BreadcrumbsProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
const Breadcrumbs = forwardRef(BreadcrumbsImpl) as (
  props: BreadcrumbsProps & { ref?: React.Ref<HTMLElement> },
) => JSX.Element;

export default Breadcrumbs;