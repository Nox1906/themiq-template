/**
 * Named spacing scale — a semantic overlay on top of MUI's `theme.spacing(n)`.
 *
 * MUI's `theme.spacing(n)` multiplies the base unit by `n`, returning a CSS
 * string (e.g. `spacing(2)` → `"8px"` when `unit = 4`). This scale gives
 * those multipliers human-readable names so component code reads clearly.
 *
 * ```ts
 * // Without named scale — magic number
 * sx={{ padding: theme.spacing(4) }}
 *
 * // With named scale — semantic intent is clear
 * import { SpacingScale } from "src/theming/themes/spec/spacing";
 * sx={{ padding: theme.spacing(SpacingScale.lg) }}
 * ```
 *
 * ### Using the scale
 * ```ts
 * import { useTheme } from "@mui/material/styles";
 * import { SpacingScale } from "src/theming/themes/spec/spacing";
 *
 * function Card() {
 *   const theme = useTheme();
 *   return (
 *     <Box sx={{
 *       padding:      theme.spacing(SpacingScale.md),   // 16px
 *       marginBottom: theme.spacing(SpacingScale.sm),   // 8px
 *       gap:          theme.spacing(SpacingScale.xs),   // 4px
 *     }} />
 *   );
 * }
 * ```
 *
 * ### Scale reference (base unit = 4 px)
 * | Name  | Multiplier | px value | Typical use                    |
 * |-------|-----------|----------|--------------------------------|
 * | `xs`  | 1         | 4 px     | Icon gap, tight list padding   |
 * | `sm`  | 2         | 8 px     | Inner padding, form row gap    |
 * | `md`  | 4         | 16 px    | Card padding, section gap      |
 * | `lg`  | 6         | 24 px    | Section margin, dialog padding |
 * | `xl`  | 8         | 32 px    | Page section spacing           |
 * | `xxl` | 10        | 40 px    | Hero/banner vertical rhythm    |
 *
 * ### Adding a new step
 * Add the multiplier constant below with a JSDoc comment:
 * ```ts
 * export const SpacingScale = {
 *   // …existing…
 *   xxxl: 12,  // 48 px — full-bleed section spacer
 * } as const;
 * ```
 */

/**
 * Named multipliers for `theme.spacing(n)`.
 *
 * Pass these to `theme.spacing()` instead of plain numbers to communicate
 * semantic intent at the call site.
 */
export const SpacingScale = {
  /** 1× unit — icon gap, tight inline spacing */
  xs: 1,
  /** 2× unit — inner padding, form row gap */
  sm: 2,
  /** 4× unit — card / component padding */
  md: 4,
  /** 6× unit — section gap, dialog content padding */
  lg: 6,
  /** 8× unit — page-level section spacing */
  xl: 8,
  /** 10× unit — hero / banner vertical rhythm */
  xxl: 10,
} as const;

/** Type of any {@link SpacingScale} value. */
export type SpacingScaleValue =
  (typeof SpacingScale)[keyof typeof SpacingScale];

/**
 * Optional typed scale object — use when a theme wants to document its
 * effective pixel values alongside the base unit.
 *
 * Not required in {@link ThemeSpec}; themes may export this for reference.
 *
 * @example
 * ```ts
 * // theme1/index.ts
 * export const spacingScale: ThemeSpecSpacingScale = {
 *   unit: 4,
 *   xs:   4,   // spacing(1)
 *   sm:   8,   // spacing(2)
 *   md:   16,  // spacing(4)
 *   lg:   24,  // spacing(6)
 *   xl:   32,  // spacing(8)
 *   xxl:  40,  // spacing(10)
 * };
 * ```
 */
export type ThemeSpecSpacingScale = {
  /** Base unit in pixels */
  unit: number;
  /** 4 px — icon gap, tight inline spacing */
  xs: number;
  /** 8 px — inner padding, form row gap */
  sm: number;
  /** 16 px — card / component padding */
  md: number;
  /** 24 px — section gap, dialog content padding */
  lg: number;
  /** 32 px — page-level section spacing */
  xl: number;
  /** 40 px — hero / banner vertical rhythm */
  xxl: number;
};
