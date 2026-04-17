import primitives from "../primitives";
import { ShadowIndex } from "../spec/shadows";

/**
 * Theme1 shadow array.
 *
 * Each entry is a CSS `box-shadow` string, accessed by numeric index.
 * Use the {@link ShadowIndex} constants to avoid magic numbers:
 * ```ts
 * import { ShadowIndex } from "src/theming/themes/spec/shadows";
 * theme.shadows[ShadowIndex.Md]     // medium elevation
 * theme.shadows[ShadowIndex.Focus]  // focus ring
 * ```
 *
 * ### Elevation scale (indices 1–5)
 * Layer two shadow values — a tight, dark one for depth and a softer spread
 * for ambient light — increasing both spread and blur as elevation grows:
 * ```ts
 * "0px 2px 8px -2px rgba(21,21,21,0.08), 0px 6px 12px -2px rgba(21,21,21,0.08)"
 * ```
 *
 * ### Focus rings (indices 6–8)
 * Use zero-spread, zero-blur `box-shadow` with a visible ring color:
 * ```ts
 * "0px 0px 0px 3px #0560FD"  // solid 3 px outline ring
 * ```
 *
 * ### Directional / press shadows (indices 9–13)
 * Some shadows intentionally have no color; the consuming component applies
 * color at runtime via `currentColor` or a CSS variable:
 * ```ts
 * "0px 3px 0px 0px"   // ← color set by the component
 * ```
 *
 * ### Adding a new shadow
 * 1. Append the CSS value to this array
 * 2. Add a matching constant to `ShadowIndex` in `spec/shadows.ts`
 */

// Satisfy the TS rule that requires all ShadowIndex keys to be used.
void ShadowIndex;

const shadows: string[] = [
  "none", // 0  - None
  "0px 1px 2px 0px rgba(21, 21, 21, 0.08)", // 1  - Xs
  "0px 1px 2px 0px rgba(21, 21, 21, 0.08), 0px 2px 4px 0px rgba(21, 21, 21, 0.08)", // 2  - Sm
  "0px 2px 8px -2px rgba(21, 21, 21, 0.08), 0px 6px 12px -2px rgba(21, 21, 21, 0.08)", // 3  - Md
  "0px 2px 8px -2px rgba(21, 21, 21, 0.08), 0px 12px 16px -4px rgba(21, 21, 21, 0.08)", // 4  - Lg
  "0px 2px 8px -2px rgba(21, 21, 21, 0.08), 0px 20px 24px -4px rgba(21, 21, 21, 0.08)", // 5  - Xl
  "0px 0px 4px 0px #0343B1", // 6  - Focus
  `0px 0px 8px 0px ${primitives.blue[100]}`, // 7  - AiFocus
  `0px 0px 8px 0px ${primitives.stone[300]}`, // 8  - AiRevertFocus
  `0px 4px 8px -1px ${primitives.blackOpacity} inset`, // 9  - Inset
  "0px 3px 0px 0px", // 10 - PrimaryPress
  "0px -4px 0px 0px", // 11 - SelectedTab
  "0px 3px 0px 0px", // 12 - PrimaryGhostPress
  "0px -4px 0px 0px", // 13 - SelectedSecondaryTab
];

export default shadows;
