import { forwardRef, type JSX } from "react";
import React from "react";
import {
  AccordionDetails as MuiAccordionDetails,
  type AccordionDetailsProps as MuiAccordionDetailsProps,
} from "@mui/material";

import makeStyles from "./AccordionDetails.styles";

const useStyles = makeStyles({ name: "AccordionDetails" });


function AccordionDetailsImpl(
  { className, classes: overrideClasses, ...props }: AccordionDetailsProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiAccordionDetails
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system AccordionDetails.
 *
 * Currently passes through all MUI {@link MuiAccordionDetailsProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type AccordionDetailsProps = Omit<MuiAccordionDetailsProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system AccordionDetails. A thin wrapper around MUI's `AccordionDetails`
 * with style override hooks for the active theme.
 *
 * Always used as the second child of {@link Accordion}, placed after
 * {@link AccordionSummary}.
 *
 * ```tsx
 * <Accordion>
 *   <AccordionSummary expandIcon={<Icon name="ExpandMore" />}>
 *     Panel title
 *   </AccordionSummary>
 *   <AccordionDetails>
 *     Panel content goes here.
 *   </AccordionDetails>
 * </Accordion>
 * ```
 */
const AccordionDetails = forwardRef(AccordionDetailsImpl) as (
  props: AccordionDetailsProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default AccordionDetails;