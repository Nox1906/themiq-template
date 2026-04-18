import {
  RadioGroup as MuiRadioGroup,
  type RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

export type RadioGroupProps = Omit<MuiRadioGroupProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
};

function RadioGroupImpl(
  { ...props }: RadioGroupProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return <MuiRadioGroup ref={ref} {...props} />;
}

/**
 * Design-system RadioGroup. A thin wrapper around MUI's `RadioGroup` with
 * style override hooks for the active theme.
 *
 * Groups multiple {@link Radio} controls so only one can be selected at a time.
 * Manages the `value` and `onChange` for the group.
 *
 * ```tsx
 * <FormControl>
 *   <FormLabel>Gender</FormLabel>
 *   <RadioGroup defaultValue="female" name="gender-group">
 *     <FormControlLabel value="female" control={<Radio />} label="Female" />
 *     <FormControlLabel value="male" control={<Radio />} label="Male" />
 *     <FormControlLabel value="other" control={<Radio />} label="Other" />
 *   </RadioGroup>
 * </FormControl>
 * ```
 * @see https://mui.com/material-ui/react-radio-button/
 */
const RadioGroup = forwardRef(RadioGroupImpl) as (
  props: RadioGroupProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default RadioGroup;
