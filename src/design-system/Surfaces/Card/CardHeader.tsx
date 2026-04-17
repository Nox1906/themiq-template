import { forwardRef, type JSX } from "react";
import React from "react";
import {
  CardHeader as MuiCardHeader,
  type CardHeaderProps as MuiCardHeaderProps,
} from "@mui/material";

import makeStyles from "./CardHeader.styles";

const useStyles = makeStyles({ name: "CardHeader" });


function CardHeaderImpl(
  { className, classes: overrideClasses, ...props }: CardHeaderProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiCardHeader
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system CardHeader.
 *
 * Currently passes through all MUI {@link MuiCardHeaderProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type CardHeaderProps = Omit<MuiCardHeaderProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system CardHeader. A thin wrapper around MUI's `CardHeader` with style
 * override hooks for the active theme.
 *
 * Renders a structured header row in a {@link Card}: avatar, title, subheader,
 * and optional action slot.
 *
 * ```tsx
 * <Card>
 *   <CardHeader
 *     avatar={<Avatar>R</Avatar>}
 *     title="Recipe title"
 *     subheader="September 14, 2016"
 *   />
 *   <CardContent>...</CardContent>
 * </Card>
 * ```
 */
const CardHeader = forwardRef(CardHeaderImpl) as (
  props: CardHeaderProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default CardHeader;