import { forwardRef, type JSX } from "react";
import { Box as MuiBox, type BoxProps as MuiBoxProps } from "@mui/material";

export type BoxProps = MuiBoxProps;


function BoxImpl(props: BoxProps, ref: React.Ref<HTMLElement>) {
  return <MuiBox ref={ref as React.Ref<never>} {...props} />;
}

/**
 * Design-system Box. A thin wrapper around MUI's `Box` — a polymorphic layout
 * primitive that accepts the full `sx` prop for one-off style overrides.
 *
 * Use it for layout composition where a named component would be premature.
 *
 * ```tsx
 * <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
 *   <CircularProgress />
 *   <Typography>Loading…</Typography>
 * </Box>
 * ```
 */
const Box = forwardRef(BoxImpl) as (
  props: BoxProps & { ref?: React.Ref<HTMLElement> },
) => JSX.Element;

export default Box;