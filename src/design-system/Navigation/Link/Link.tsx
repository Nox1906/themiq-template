import { Link as MuiLink, type LinkProps as MuiLinkProps } from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./Link.styles";

const useStyles = makeStyles({ name: "Link" });

function LinkImpl(
  { className, classes: overrideClasses, ...props }: LinkProps,
  ref: React.Ref<HTMLAnchorElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiLink
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Link.
 *
 * Currently passes through all MUI {@link MuiLinkProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Disable `underline` variants:
 * ```ts
 * export type LinkProps = Omit<MuiLinkProps, "underline"> & {
 *   underline?: "always" | "hover"; // drop "none"
 * };
 * ```
 */
export type LinkProps = Omit<MuiLinkProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system Link. A thin wrapper around MUI's `Link` with style override
 * hooks for the active theme.
 *
 * Renders a styled anchor tag. Use as a standalone inline link in text, or
 * inside {@link Breadcrumbs} for navigation.
 *
 * ```tsx
 * <Link href="/home" underline="hover">Home</Link>
 * ```
 *
 * For router-aware links, pass the router link component:
 * ```tsx
 * <Link component={NavLink} to="/dashboard">Dashboard</Link>
 * ```
 * @see https://mui.com/material-ui/react-link/
 */
const Link = forwardRef(LinkImpl) as (
  props: LinkProps & { ref?: React.Ref<HTMLAnchorElement> },
) => JSX.Element;

export default Link;
