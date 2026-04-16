import { type ElementType, forwardRef, type JSX } from "react";
import React from "react";
import {
  Autocomplete as MuiAutocomplete,
  type AutocompleteProps as MuiAutocompleteProps,
  type ChipTypeMap,
} from "@mui/material";

import makeStyles from "./Autocomplete.styles";

const useStyles = makeStyles({ name: { Autocomplete } });

export type AutocompleteProps<
  Value = unknown,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends ElementType = ChipTypeMap["defaultComponent"],
> = MuiAutocompleteProps<
  Value,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
>;

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
 */
function Autocomplete<
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
  }: AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
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

export default forwardRef(Autocomplete) as <
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
