import {
  CardActionArea as MuiCardActionArea,
  type CardActionAreaProps as MuiCardActionAreaProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./CardActionArea.styles";

const useStyles = makeStyles({ name: "CardActionArea" });

function CardActionAreaImpl(
  { className, classes: overrideClasses, ...props }: CardActionAreaProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiCardActionArea
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system CardActionArea.
 *
 * Currently passes through all MUI {@link MuiCardActionAreaProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type CardActionAreaProps = Omit<MuiCardActionAreaProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

/**
 * Design-system CardActionArea. A thin wrapper around MUI's `CardActionArea`
 * with style override hooks for the active theme.
 *
 * Makes the entire top section of a {@link Card} clickable with ripple feedback.
 *
 * ```tsx
 * <Card>
 *   <CardActionArea onClick={() => navigate('/detail')}>
 *     <CardMedia component="img" image="..." alt="..." />
 *     <CardContent>...</CardContent>
 *   </CardActionArea>
 * </Card>
 * ```
 * @see https://mui.com/material-ui/react-card/
 */
const CardActionArea = forwardRef(CardActionAreaImpl) as (
  props: CardActionAreaProps & { ref?: React.Ref<HTMLButtonElement> },
) => JSX.Element;

export default CardActionArea;
