import {
  AccordionSummary as MuiAccordionSummary,
  type AccordionSummaryProps as MuiAccordionSummaryProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./AccordionSummary.styles";

const useStyles = makeStyles({ name: "AccordionSummary" });

function AccordionSummaryImpl(
  { className, classes: overrideClasses, ...props }: AccordionSummaryProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiAccordionSummary
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system AccordionSummary.
 *
 * Currently passes through all MUI {@link MuiAccordionSummaryProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type AccordionSummaryProps = Omit<MuiAccordionSummaryProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here.
};

/**
 * Design-system AccordionSummary. A thin wrapper around MUI's `AccordionSummary`
 * with style override hooks for the active theme.
 *
 * Always used as the first child of {@link Accordion}.
 * Use the `expandIcon` prop to pass an expand/collapse indicator.
 *
 * ```tsx
 * <Accordion>
 *   <AccordionSummary expandIcon={<Icon name="ExpandMore" />}>
 *     Panel title
 *   </AccordionSummary>
 *   <AccordionDetails>Panel content</AccordionDetails>
 * </Accordion>
 * ```
 * @see https://mui.com/material-ui/react-accordion/
 */
const AccordionSummary = forwardRef(AccordionSummaryImpl) as (
  props: AccordionSummaryProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default AccordionSummary;
