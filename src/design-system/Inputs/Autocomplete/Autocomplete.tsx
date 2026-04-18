import {
  Autocomplete as MuiAutocomplete,
  type AutocompleteProps as MuiAutocompleteProps,
  type ChipTypeMap,
} from "@mui/material";
import React from "react";
import { type ElementType, forwardRef, type JSX } from "react";

import makeStyles from "./Autocomplete.styles";

const useStyles = makeStyles({ name: "Autocomplete" });

function AutocompleteImpl<
  Value = unknown,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends ElementType = ChipTypeMap["defaultComponent"],
>(
  {
    className,
    classes: overrideClasses,
    ...props
  }: AutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiAutocomplete
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Autocomplete.
 *
 * Uses MUI's five generic type parameters:
 * - `Value` — the type of each option/selected value.
 * - `Multiple` — whether multiple values can be selected.
 * - `DisableClearable` — whether the clear button is hidden.
 * - `FreeSolo` — whether the user can type arbitrary values.
 * - `ChipComponent` — element type of the delete-chip rendered for each tag
 *   in multiple-select mode (polymorphic, defaults to MUI's Chip).
 *
 * These are **value/behaviour generics**, not polymorphism generics — they
 * describe what the component *works with*, not what it *renders as*.
 *
 * Currently passes through all MUI {@link MuiAutocompleteProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Add a `loading` shorthand that sets both `loading` and
 * `loadingText`:
 * ```ts
 * // Override `loading` to gain finer control via the component:
 * export type AutocompleteProps<...> = Omit<MuiAutocompleteProps<...>, "loading"> & {
 *   loading?: boolean | string; // string becomes the loadingText
 * };
 * ```
 */
export type AutocompleteProps<
  Value = unknown,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends ElementType = ChipTypeMap["defaultComponent"],
> = Omit<
  MuiAutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  >,
  never
> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Autocomplete. A thin wrapper around MUI's `Autocomplete` with
 * style override hooks for the active theme.
 *
 * **Single selection:**
 * ```tsx
 * <Autocomplete
 *   options={["Option A", "Option B"]}
 *   renderInput={(params) => <TextField {...params} label="Pick one" />}
 * />
 * ```
 *
 * **Multiple selection:**
 * ```tsx
 * <Autocomplete
 *   multiple
 *   options={["React", "Vue", "Angular"]}
 *   renderInput={(params) => <TextField {...params} label="Frameworks" />}
 * />
 * ```
 *
 * **Free-form input (free solo):**
 * ```tsx
 * <Autocomplete
 *   freeSolo
 *   options={["Suggestion 1"]}
 *   renderInput={(params) => <TextField {...params} label="Search" />}
 * />
 * ```
 *
 * All MUI `AutocompleteProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-autocomplete/
 */
const Autocomplete = forwardRef(AutocompleteImpl) as <
  Value = unknown,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends ElementType = ChipTypeMap["defaultComponent"],
>(
  props: AutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  > & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default Autocomplete;
