import { type ElementType, forwardRef, type JSX } from "react";
import React from "react";
import {
  Chip as MuiChip,
  type ChipProps as MuiChipProps,
  type ChipTypeMap,
} from "@mui/material";

import makeStyles from "./Chip.styles";

const useStyles = makeStyles({ name: { Chip } });

export type ChipProps<
  BaseComponent extends ElementType = ChipTypeMap["defaultComponent"],
  AdditionalProps = object,
> = MuiChipProps<BaseComponent, AdditionalProps> & {
  /**
   * The root element to render. Allows rendering the chip as a link or
   * any other element while preserving full type-safety.
   * @example component="a" href="/tag/react"
   */
  component?: BaseComponent;
};

/**
 * Design-system Chip. A thin wrapper around MUI's `Chip` with style override
 * hooks for the active theme.
 *
 * **Basic usage:**
 * ```tsx
 * <Chip label="React" />
 * <Chip label="Approved" color="success" />
 * <Chip label="Filled" variant="filled" />
 * ```
 *
 * **Clickable chip:**
 * ```tsx
 * <Chip label="Filter" onClick={() => applyFilter()} />
 * ```
 *
 * **Deletable chip:**
 * ```tsx
 * <Chip label="Tag" onDelete={() => removeTag()} />
 * ```
 *
 * **With a leading icon:**
 * ```tsx
 * <Chip label="Home" icon={<HomeIcon />} />
 * ```
 *
 * **As a link:**
 * ```tsx
 * <Chip component="a" href="/tag/react" label="React" />
 * ```
 *
 * All MUI `ChipProps` (e.g. `color`, `size`, `variant`, `avatar`, `disabled`,
 * `onDelete`, `deleteIcon`) are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 */
function Chip<
  BaseComponent extends ElementType = ChipTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  {
    className,
    classes: overrideClasses,
    ...props
  }: ChipProps<BaseComponent, AdditionalProps>,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    {
      props: { classes: overrideClasses },
    },
  );

  return (
    <MuiChip
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

export default forwardRef(Chip) as <
  BaseComponent extends ElementType = ChipTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: ChipProps<BaseComponent, AdditionalProps> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => JSX.Element;
