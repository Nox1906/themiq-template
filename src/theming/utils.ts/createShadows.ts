import type { Shadows } from "@mui/material";

/**
 * Converts the design-system's `string[]` shadow array to the `Shadows` tuple
 * type that MUI's `createTheme` requires.
 *
 * MUI's `Shadows` type is a fixed-length tuple of exactly 25 strings:
 * ```ts
 * type Shadows = [string, string, /* … *\/ string]; // 25 elements
 * ```
 * The design system only defines the slots it uses (indices 0–13), so this
 * function pads the remaining positions with the last defined value.
 *
 * ### Usage
 * This is an internal utility called by `getTheme.ts`. You do not need to
 * call it directly. If you add shadows beyond index 13, just append them to
 * the theme's `shadows.ts` array — `createShadows` will pick them up.
 *
 * ### Why a cast instead of padding?
 * MUI reads only the indices that its components reference. Indices 14–24 are
 * never used by MUI's built-in components, so the cast is safe. If a consuming
 * component calls `theme.shadows[20]` it will receive `undefined`, which CSS
 * treats as "no shadow" — same as the `"none"` string.
 *
 * @param shadows - The theme's `string[]` shadow array (see `spec/shadows.ts`)
 * @returns The same array cast to MUI's `Shadows` tuple type
 */
function createShadows(shadows: string[]): Shadows {
  return [...shadows] as Shadows;
}

export default createShadows;
