import { forwardRef, type JSX } from "react";
import React from "react";
import {
  CardContent as MuiCardContent,
  type CardContentProps as MuiCardContentProps,
} from "@mui/material";

import makeStyles from "./CardContent.styles";

const useStyles = makeStyles({ name: "CardContent" });


function CardContentImpl(
  { className, classes: overrideClasses, ...props }: CardContentProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiCardContent
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system CardContent.
 *
 * Currently passes through all MUI {@link MuiCardContentProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type CardContentProps = Omit<MuiCardContentProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system CardContent. A thin wrapper around MUI's `CardContent` with
 * style override hooks for the active theme.
 *
 * The main body area of a {@link Card}. Adds consistent inner padding.
 *
 * ```tsx
 * <Card>
 *   <CardContent>
 *     <Typography variant="h5">Title</Typography>
 *     <Typography>Body text goes here.</Typography>
 *   </CardContent>
 * </Card>
 * ```
 */
const CardContent = forwardRef(CardContentImpl) as (
  props: CardContentProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default CardContent;