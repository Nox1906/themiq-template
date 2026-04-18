import {
  Card as MuiCard,
  type CardProps as MuiCardProps,
  type CardTypeMap,
} from "@mui/material";
import React from "react";
import { type ElementType, forwardRef, type JSX } from "react";

import makeStyles from "./Card.styles";

const useStyles = makeStyles({ name: "Card" });

function CardImpl<
  BaseComponent extends ElementType = CardTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  {
    className,
    classes: overrideClasses,
    ...props
  }: CardProps<BaseComponent, AdditionalProps>,
  ref: React.Ref<HTMLElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiCard
      ref={ref as React.Ref<HTMLDivElement>}
      {...(props as MuiCardProps)}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Card.
 *
 * Uses `BaseComponent` and `AdditionalProps` generics because MUI's `Card`
 * (which extends `Paper`) is **polymorphic** — it can render as any HTML element
 * via the `component` prop:
 *
 * ```tsx
 * <Card component="article">...</Card>
 * ```
 *
 * TypeScript will automatically narrow the allowed props based on whatever you
 * pass to `component`.
 *
 * Currently all MUI {@link MuiCardProps} pass through unchanged. The only
 * explicit addition is `component` to make the polymorphic intent clear.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Remove `raised` and enforce elevation via theme tokens instead:
 * ```ts
 * export type CardProps<...> = Omit<MuiCardProps<...>, "raised"> & {
 *   // raised removed — use elevation prop or theme overrides
 * };
 * ```
 */
export type CardProps<
  BaseComponent extends ElementType = CardTypeMap["defaultComponent"],
  AdditionalProps = object,
> = Omit<MuiCardProps<BaseComponent, AdditionalProps>, never> & {
  /**
   * The root element to render. Use for correct semantic HTML.
   * @example component="article"
   * @example component="section"
   */
  component?: BaseComponent;
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Card. A thin wrapper around MUI's `Card` with style
 * override hooks for the active theme.
 *
 * Use MUI's sub-components for card anatomy:
 * `CardContent`, `CardHeader`, `CardMedia`, `CardActions`, `CardActionArea`.
 *
 * **Basic card:**
 * ```tsx
 * import { CardContent, Typography } from "@mui/material";
 *
 * <Card>
 *   <CardContent>
 *     <Typography variant="h5">Title</Typography>
 *     <Typography variant="body2">Description goes here.</Typography>
 *   </CardContent>
 * </Card>
 * ```
 *
 * **With header and actions:**
 * ```tsx
 * import { CardHeader, CardContent, CardActions, Button } from "@mui/material";
 *
 * <Card>
 *   <CardHeader title="Card Title" subheader="Subheader text" />
 *   <CardContent>
 *     <Typography variant="body2">Content.</Typography>
 *   </CardContent>
 *   <CardActions>
 *     <Button size="small">Learn More</Button>
 *   </CardActions>
 * </Card>
 * ```
 *
 * **Clickable card (CardActionArea):**
 * ```tsx
 * import { CardActionArea, CardContent } from "@mui/material";
 *
 * <Card>
 *   <CardActionArea onClick={handleClick}>
 *     <CardContent>
 *       <Typography variant="h6">Click me</Typography>
 *     </CardContent>
 *   </CardActionArea>
 * </Card>
 * ```
 *
 * All MUI `CardProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-card/
 */
const Card = forwardRef(CardImpl) as <
  BaseComponent extends ElementType = CardTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: CardProps<BaseComponent, AdditionalProps> & {
    ref?: React.Ref<HTMLElement>;
  },
) => JSX.Element;

export default Card;
