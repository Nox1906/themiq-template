import { forwardRef, type JSX } from "react";
import React from "react";
import {
  CardActions as MuiCardActions,
  type CardActionsProps as MuiCardActionsProps,
} from "@mui/material";

import makeStyles from "./CardActions.styles";

const useStyles = makeStyles({ name: "CardActions" });


function CardActionsImpl(
  { className, classes: overrideClasses, ...props }: CardActionsProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiCardActions
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system CardActions.
 *
 * Currently passes through all MUI {@link MuiCardActionsProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type CardActionsProps = Omit<MuiCardActionsProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system CardActions. A thin wrapper around MUI's `CardActions` with
 * style override hooks for the active theme.
 *
 * Renders a row of action buttons at the bottom of a {@link Card}.
 * Typically contains {@link Button} or {@link IconButton} components.
 *
 * ```tsx
 * <Card>
 *   <CardContent>...</CardContent>
 *   <CardActions>
 *     <Button size="small">Share</Button>
 *     <Button size="small">Learn More</Button>
 *   </CardActions>
 * </Card>
 * ```
 */
const CardActions = forwardRef(CardActionsImpl) as (
  props: CardActionsProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default CardActions;