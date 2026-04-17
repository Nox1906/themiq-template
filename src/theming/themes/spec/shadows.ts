/**
 * Named shadow index constants for the design-system shadow array.
 *
 * Every theme stores its shadows as a positional `string[]` on `theme.shadows`.
 * Use {@link ShadowIndex} to reference them by semantic name instead of a
 * hard-coded number, so intent is clear and refactoring is safe.
 *
 * ### Accessing shadows in a component
 * ```tsx
 * import { useTheme } from "@mui/material/styles";
 * import { ShadowIndex } from "src/theming/themes/spec/shadows";
 *
 * function Card() {
 *   const theme = useTheme();
 *   return <Box sx={{ boxShadow: theme.shadows[ShadowIndex.Sm] }} />;
 * }
 * ```
 *
 * ### Using shadows in makeStyles
 * ```tsx
 * const useStyles = makeStyles(({ theme }) => ({
 *   card:    { boxShadow: theme.shadows[ShadowIndex.Sm] },
 *   focused: { boxShadow: theme.shadows[ShadowIndex.Focus] },
 * }));
 * ```
 *
 * ### Adding a new shadow
 * 1. Append the new CSS `box-shadow` string to **every** theme's `shadows.ts`
 * 2. Add a new entry below with the next available numeric index
 * 3. Reference it via `theme.shadows[ShadowIndex.MyNewShadow]`
 *
 * ```ts
 * // spec/shadows.ts — add the constant
 * export const ShadowIndex = {
 *   ...existingEntries,
 *   MyNewShadow: 14,
 * } as const;
 *
 * // theme1/shadows.ts — add the value at the matching position
 * const shadows = [
 *   ...existingValues,
 *   "0px 0px 12px 0px rgba(0, 0, 0, 0.3)", // 14 - MyNewShadow
 * ];
 * ```
 */

/** Named index map for the design-system shadow array. */
export const ShadowIndex = {
  /** No shadow — flat surfaces, borderless containers */
  None: 0,

  // ── Elevation ──────────────────────────────────────────────────────────────
  /** Extra small — subtle resting card lift */
  Xs: 1,
  /** Small — dropdowns, tooltips, menu items */
  Sm: 2,
  /** Medium — side drawers, sticky headers, floating panels */
  Md: 3,
  /** Large — modal dialogs, full-page overlays */
  Lg: 4,
  /** Extra large — content stacked above other elevated surfaces */
  Xl: 5,

  // ── Focus rings ────────────────────────────────────────────────────────────
  /** Keyboard / mouse focus indicator */
  Focus: 6,
  /** AI focus ring — highlights AI-generated or AI-assisted content */
  AiFocus: 7,
  /** AI revert ring — used while undoing / reverting AI changes */
  AiRevertFocus: 8,

  // ── Interactive state shadows ──────────────────────────────────────────────
  /** Inset shadow — pressed or active surface state */
  Inset: 9,
  /** Primary button active-press depth shadow */
  PrimaryPress: 10,
  /** Selected tab underline indicator */
  SelectedTab: 11,
  /** Ghost button active-press depth shadow */
  PrimaryGhostPress: 12,
  /** Selected secondary tab underline indicator */
  SelectedSecondaryTab: 13,
} as const;

/** Numeric value of any {@link ShadowIndex} key. */
export type ShadowIndexValue = (typeof ShadowIndex)[keyof typeof ShadowIndex];
