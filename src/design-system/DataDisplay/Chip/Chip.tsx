import { type ElementType, forwardRef, type JSX } from "react";
import React from "react";
import {
  Chip as MuiChip,
  type ChipProps as MuiChipProps,
  type ChipTypeMap,
} from "@mui/material";

import makeStyles from "./Chip.styles";

const useStyles = makeStyles({ name: "Chip" });

function ChipImpl<
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

/**
 * Props for the design-system Chip.
 *
 * Uses `BaseComponent` and `AdditionalProps` generics because MUI's `Chip` is
 * **polymorphic** — it can render as any HTML element via the `component` prop
 * (e.g. `<Chip component="a" href="...">`) and TypeScript narrows the allowed
 * props and ref type accordingly.
 *
 * Currently passes through all MUI {@link MuiChipProps} unchanged, plus the
 * explicit `component` prop for convenience.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `color` to the design token set:
 * ```ts
 * export type ChipProps<...> = Omit<MuiChipProps<...>, "color"> & {
 *   color?: "default" | "primary" | "success" | "warning" | "danger";
 * };
 * ```
 */
export type ChipProps<
  BaseComponent extends ElementType = ChipTypeMap["defaultComponent"],
  AdditionalProps = object,
> = Omit<MuiChipProps<BaseComponent, AdditionalProps>, never> & {
  /**
   * The root element to render. Allows rendering the chip as a link or
   * any other element while preserving full type-safety.
   * @example component="a" href="/tag/react"
   */
  component?: BaseComponent;
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
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
const Chip = forwardRef(ChipImpl) as <
  BaseComponent extends ElementType = ChipTypeMap["defaultComponent"],
  AdditionalProps = object,
>(
  props: ChipProps<BaseComponent, AdditionalProps> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => JSX.Element;

export default Chip;
