import {
  CardMedia as MuiCardMedia,
  type CardMediaProps as MuiCardMediaProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./CardMedia.styles";

const useStyles = makeStyles({ name: "CardMedia" });

function CardMediaImpl(
  { className, classes: overrideClasses, ...props }: CardMediaProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiCardMedia
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system CardMedia.
 *
 * Currently passes through all MUI {@link MuiCardMediaProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 */
export type CardMediaProps = Omit<MuiCardMediaProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  /** Accessible alt text — forwarded to the underlying element when used as an image. */
  alt?: string;
};

/**
 * Design-system CardMedia. A thin wrapper around MUI's `CardMedia` with style
 * override hooks for the active theme.
 *
 * Renders media (image, video, iframe) inside a {@link Card}.
 * Use `component="img"` + `sx={{ height: 140 }}` for images (preferred MUI v5 style).
 *
 * ```tsx
 * <CardMedia
 *   component="img"
 *   sx={{ height: 140 }}
 *   image="/photo.jpg"
 *   alt="Landscape"
 * />
 * ```
 * @see https://mui.com/material-ui/react-card/
 */
const CardMedia = forwardRef(CardMediaImpl) as (
  props: CardMediaProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default CardMedia;
