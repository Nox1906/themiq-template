import { type ElementType, forwardRef, type JSX } from "react";
import {
  Typography as MuiTypography,
  type TypographyProps as MuiTypographyProps,
  type TypographyTypeMap,
} from "@mui/material";

import makeStyles from "./Typography.styles";
import { useCheckOverflowOnHover, useMergedRef } from "../../hooks";
import Tooltip from "../Tooltip";

const useStyles = makeStyles({ name: { Typography } });

export type TypographyProps<
  BaseComponent extends ElementType = TypographyTypeMap["defaultComponent"],
  AdditionalProps = object,
> = Omit<MuiTypographyProps<BaseComponent, AdditionalProps>, "noWrap"> & {
  /**
   * Whether to wrap the text or not. Deprecated in favor of maxLines. When present, we assume maxLines=1
   */
  noWrap?: boolean;
  /**
   * Maximum number of lines to show. If not present, the text will not be capped.
   */
  maxLines?: number;
  /**
   * Title to show on the overflow tooltip. If not present, the passed text will be used.
   */
  title?: string;
  /**
   * Properties passed to the Tooltip component when overflow is detected.
   */
  TooltipProps?: object;
  /**
   * The typographic variant to apply. Supports all built-in MUI variants plus any
   * custom ones registered via `TypographyPropsVariantOverrides` in your theme types.
   *
   * To add custom variants, augment MUI's interface in `src/theming/themes/types.d.ts`:
   * ```ts
   * declare module "@mui/material/Typography" {
   *   interface TypographyPropsVariantOverrides {
   *     label: true;   // adds "label" as a valid variant
   *     body3: true;   // adds "body3" as a valid variant
   *   }
   * }
   * ```
   * Then register the styles in the theme's `typography` overrides.
   */
  variant?: MuiTypographyProps["variant"];
};

/**
 * Design-system Typography. Wraps MUI's `Typography` with overflow management
 * and an automatic tooltip when text is capped.
 *
 * **Basic usage:**
 * ```tsx
 * <Typography variant="h1">Page title</Typography>
 * <Typography variant="body1">Regular paragraph text.</Typography>
 * ```
 *
 * **Cap text at N lines (shows tooltip on overflow):**
 * ```tsx
 * <Typography maxLines={2}>Very long text that gets capped at two lines…</Typography>
 * ```
 *
 * **Custom tooltip title on overflow:**
 * ```tsx
 * <Typography maxLines={1} title="Full label text">
 *   Full label text that is too long to fit
 * </Typography>
 * ```
 *
 * **Custom variants** — augment MUI's interface in `src/theming/themes/types.d.ts`:
 * ```ts
 * declare module "@mui/material/Typography" {
 *   interface TypographyPropsVariantOverrides {
 *     label: true;
 *   }
 * }
 * ```
 *
 * All MUI `TypographyProps` (e.g. `align`, `gutterBottom`, `component`) are forwarded.
 * The overflow tooltip is rendered by the design-system `Tooltip` and can be
 * customised via `TooltipProps`.
 */
function Typography<
  BaseComponent extends ElementType = TypographyTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  {
    children,
    className,
    classes: overrideClasses,
    noWrap,
    maxLines: maxLinesProp,
    title,
    TooltipProps,
    ...props
  }: TypographyProps<BaseComponent, AdditionalProps>,
  ref: React.Ref<HTMLElement>,
) {
  const maxLines = noWrap ? 1 : maxLinesProp;
  const { classes, cx } = useStyles(
    { maxLines },
    {
      props: { classes: overrideClasses },
    },
  );
  const [overflowRef, isOverflown] = useCheckOverflowOnHover({
    y: true,
  });
  const mergedRef = useMergedRef(
    ref,
    (maxLines || 0) > 0 ? overflowRef : undefined,
  );
  const content = (
    <MuiTypography
      ref={mergedRef}
      {...props}
      classes={classes}
      className={cx(
        classes.root,
        {
          [classes.maxLinesCapped]: (maxLines || 0) > 0,
          [classes.singleLineOverflow]: maxLines === 1,
        },
        className,
      )}
    >
      {children}
    </MuiTypography>
  );
  if (!maxLines || !isOverflown) {
    return content;
  }
  const overflowText = typeof children === "string" ? children : undefined;
  return (
    <Tooltip
      text={title ?? overflowText}
      arrow
      placement="top"
      disableInteractive
      {...TooltipProps}
    >
      {content}
    </Tooltip>
  );
}

export default forwardRef(Typography) as <
  BaseComponent extends ElementType = TypographyTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: TypographyProps<BaseComponent, AdditionalProps> & {
    ref?: React.Ref<HTMLElement>;
  },
) => JSX.Element;
