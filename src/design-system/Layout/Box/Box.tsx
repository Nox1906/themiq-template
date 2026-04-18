import { Box as MuiBox, type BoxProps as MuiBoxProps } from "@mui/material";
import { forwardRef, type JSX } from "react";

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
 * @see https://mui.com/material-ui/react-box/
 */
const Box = forwardRef(BoxImpl) as (
  props: BoxProps & { ref?: React.Ref<HTMLElement> },
) => JSX.Element;

export default Box;
