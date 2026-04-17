import { type ElementType, forwardRef, type JSX } from "react";
import React from "react";
import {
  Paper as MuiPaper,
  type PaperProps as MuiPaperProps,
  type PaperTypeMap,
} from "@mui/material";

import makeStyles from "./Paper.styles";

const useStyles = makeStyles({ name: "Paper" });

function PaperImpl<
  BaseComponent extends ElementType = PaperTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  {
    className,
    classes: overrideClasses,
    ...props
  }: PaperProps<BaseComponent, AdditionalProps>,
  ref: React.Ref<HTMLElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiPaper
      ref={ref as React.Ref<HTMLDivElement>}
      {...(props as MuiPaperProps)}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Paper.
 *
 * Uses `BaseComponent` and `AdditionalProps` generics because MUI's `Paper` is
 * **polymorphic** — it can render as any HTML element via the `component` prop,
 * letting you pick the correct semantic tag without losing elevation styles:
 *
 * ```tsx
 * <Paper component="section">...</Paper>
 * <Paper component="article">...</Paper>
 * ```
 *
 * TypeScript will automatically narrow the allowed props based on whatever you
 * pass to `component`.
 *
 * Currently all MUI {@link MuiPaperProps} pass through unchanged. The only
 * explicit addition is `component` to make the polymorphic intent clear.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `elevation` to the design-token scale:
 * ```ts
 * export type PaperProps<...> = Omit<MuiPaperProps<...>, "elevation"> & {
 *   elevation?: 0 | 1 | 2 | 4 | 8; // only the approved elevations
 * };
 * ```
 */
export type PaperProps<
  BaseComponent extends ElementType = PaperTypeMap["defaultComponent"],
  AdditionalProps = object,
> = Omit<MuiPaperProps<BaseComponent, AdditionalProps>, never> & {
  /**
   * The root element to render. Use for correct semantic HTML.
   * @example component="section"
   * @example component="article"
   */
  component?: BaseComponent;
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Paper. A thin wrapper around MUI's `Paper` with style
 * override hooks for the active theme.
 *
 * Paper provides the foundational elevated surface used throughout the UI.
 * It is polymorphic — use `component` to pick the correct semantic element.
 *
 * **Elevation:**
 * ```tsx
 * <Paper elevation={0}>Flat</Paper>
 * <Paper elevation={2}>Default</Paper>
 * <Paper elevation={8}>High</Paper>
 * ```
 *
 * **Outlined variant:**
 * ```tsx
 * <Paper variant="outlined">Border instead of shadow</Paper>
 * ```
 *
 * **Semantic element:**
 * ```tsx
 * <Paper component="section" elevation={1}>
 *   <h2>Section title</h2>
 * </Paper>
 * ```
 *
 * All MUI `PaperProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
const Paper = forwardRef(PaperImpl) as <
  BaseComponent extends ElementType = PaperTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: PaperProps<BaseComponent, AdditionalProps> & {
    ref?: React.Ref<HTMLElement>;
  },
) => JSX.Element;

export default Paper;
