import { forwardRef, type JSX } from "react";
import React from "react";
import {
  Accordion as MuiAccordion,
  type AccordionProps as MuiAccordionProps,
} from "@mui/material";

import makeStyles from "./Accordion.styles";

const useStyles = makeStyles({ name: "Accordion" });


function AccordionImpl(
  { className, classes: overrideClasses, ...props }: AccordionProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiAccordion
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Accordion.
 *
 * Currently passes through all MUI {@link MuiAccordionProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Remove `disableGutters` and enforce it always on:
 * ```ts
 * export type AccordionProps = Omit<MuiAccordionProps, "disableGutters"> & {
 *   // disableGutters always true in our design system
 * };
 * ```
 */
export type AccordionProps = Omit<MuiAccordionProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Accordion. A thin wrapper around MUI's `Accordion` with style
 * override hooks for the active theme.
 *
 * Use MUI's `AccordionSummary` and `AccordionDetails` for the panel anatomy.
 * Accordion can be used both **uncontrolled** (manages its own open state) and
 * **controlled** (you manage `expanded` externally).
 *
 * **Uncontrolled (default):**
 * ```tsx
 * import { AccordionSummary, AccordionDetails, Typography } from "@mui/material";
 * import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
 *
 * <Accordion>
 *   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 *     <Typography>Panel title</Typography>
 *   </AccordionSummary>
 *   <AccordionDetails>
 *     <Typography>Panel content.</Typography>
 *   </AccordionDetails>
 * </Accordion>
 * ```
 *
 * **Controlled (only one open at a time):**
 * ```tsx
 * const [expanded, setExpanded] = React.useState<string | false>(false);
 * const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) =>
 *   setExpanded(isExpanded ? panel : false);
 *
 * <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
 *   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 *     <Typography>Panel 1</Typography>
 *   </AccordionSummary>
 *   <AccordionDetails>Content 1</AccordionDetails>
 * </Accordion>
 * ```
 *
 * All MUI `AccordionProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
const Accordion = forwardRef(AccordionImpl) as (
  props: AccordionProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default Accordion;