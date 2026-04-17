import { forwardRef, type JSX, type ReactNode } from "react";
import {
  IconButton,
  Tooltip as MuiTooltip,
  type TooltipProps as MuiTooltipProps,
} from "@mui/material";

import Icon from "../Icon";
import makeStyles from "./Tooltip.styles";

const useStyles = makeStyles({ name: "Tooltip" });


function TooltipImpl(
  {
    text,
    children = (
      <IconButton data-testid="InfoIcon">
        <Icon name="CircleInfo" />
      </IconButton>
    ),
    color = "neutral",
    placement = "top",
    classes: overrideClasses,
    ...rest
  }: TooltipProps,
  ref: React.Ref<unknown>,
) {
  const { classes } = useStyles({}, { props: { classes: overrideClasses } });

  return (
    <MuiTooltip
      ref={ref}
      arrow
      title={text}
      enterTouchDelay={0}
      leaveTouchDelay={0}
      color={color}
      placement={placement}
      classes={classes}
      {...rest}
    >
      {children}
    </MuiTooltip>
  );
}

/**
 * Props for the design-system Tooltip.
 *
 * Two MUI props are already overridden here:
 * - `title` → replaced by `text` (more semantically clear, accepts `ReactNode`)
 * - `color` → replaced by a constrained design-token union
 *
 * **How to add further design-system overrides:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `placement` to the most common positions:
 * ```ts
 * export type TooltipProps = Omit<MuiTooltipProps, "title" | "color" | "placement"> & {
 *   text: ReactNode;
 *   color?: "neutral" | "neutral-dark" | "danger" | "warning" | "success";
 *   placement?: "top" | "bottom" | "left" | "right";
 * };
 * ```
 */
export type TooltipProps = Omit<MuiTooltipProps, "title" | "color"> & {
  /**
   * Content displayed inside the tooltip.
   */
  text: ReactNode;
  /**
   * Colour intent of the tooltip. Mapped to theme tokens via style overrides.
   * @default "neutral"
   */
  color?: "neutral" | "neutral-dark" | "danger" | "warning" | "success";
};

/**
 * Design-system Tooltip. Wraps MUI's `Tooltip` with a constrained colour
 * system and sensible defaults.
 *
 * **Basic usage — wraps any element:**
 * ```tsx
 * <Tooltip text="Helpful description">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 *
 * **Standalone info icon (default children):**
 * ```tsx
 * <Tooltip text="This field is required" />
 * ```
 *
 * **Colour intents:**
 * ```tsx
 * <Tooltip text="Something went wrong" color="danger" />
 * <Tooltip text="Watch out" color="warning" />
 * <Tooltip text="All good" color="success" />
 * ```
 *
 * All MUI `TooltipProps` (e.g. `placement`, `disableInteractive`, `PopperProps`)
 * are forwarded. `title` is replaced by `text` to avoid collision with the HTML
 * `title` attribute. `color` is intercepted and forwarded as a theme class.
 */
const Tooltip = forwardRef(TooltipImpl) as (
  props: TooltipProps & { ref?: React.Ref<unknown> },
) => JSX.Element;

export default Tooltip;