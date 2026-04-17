import type { ThemeSpecPalette } from "./palette";
import type { ThemeSpecTypography } from "./typography";
import type { ThemeSpecShape } from "./shape";
import type { ThemeSpecBreakpoints } from "./breakpoints";
import type { ThemeSpecTransitions } from "./transitions";
import type { ThemeSpecZIndex } from "./zIndex";

/**
 * The contract every theme implementation must satisfy.
 *
 * ### Creating a new theme
 * 1. Create a folder under `src/theming/themes/` (e.g. `my-theme/`)
 * 2. Add these files, following the same structure as `theme1/`:
 *    - `palette.ts`     — semantic color mapping
 *    - `typography.ts`  — font family, sizes, and weights
 *    - `shadows.ts`     — elevation and focus ring shadows
 *    - `shape.ts`       — border-radius named scale
 *    - `breakpoints.ts` — responsive viewport thresholds
 *    - `transitions.ts` — animation durations and easing curves
 *    - `zIndex.ts`      — layer stacking order
 *    - `index.ts`       — assembles all of the above + scalar values
 * 3. Type the exported object as `ThemeSpec & { name: "my-theme"; designSystem: "my-theme" }`
 * 4. Export it from `themes/index.ts`:
 *    ```ts
 *    export { default as MyTheme } from "./my-theme";
 *    ```
 * 5. Add `"my-theme"` to the `name` and `designSystem` unions below so the
 *    TypeScript compiler enforces the contract everywhere
 *
 * ### Adding theme-specific extra fields
 * Intersect with the base type in your theme's `index.ts`:
 * ```ts
 * export type MyThemeSpec = ThemeSpec & {
 *   name: "my-theme";
 *   designSystem: "my-theme";
 *   customField: string;
 * };
 * ```
 */
export type ThemeSpec = {
  /**
   * Unique theme identifier string.
   * Add new theme names to this union when registering a new theme.
   */
  name: "theme1" | "theme2";

  /**
   * The design system this theme implements.
   * Typically the same as `name`. Use a shared value when multiple themes
   * (e.g. light/dark variants) implement the same design system.
   */
  designSystem: "theme1" | "theme2";

  /** Semantic color palette — maps primitive tokens to semantic roles. */
  palette: ThemeSpecPalette;

  /** Typography scale — font families, sizes, and weights per variant. */
  typography: ThemeSpecTypography;

  /**
   * Array of CSS `box-shadow` strings, indexed positionally.
   * Shadow semantics are documented in `spec/shadows.ts` (`ShadowIndex`).
   * Must contain at least 14 entries to cover all built-in named slots.
   */
  shadows: string[];

  /**
   * Named border-radius scale.
   * Replaces the single scalar `borderRadius` with semantic steps.
   * `shape.borderRadius` is forwarded to MUI's `theme.shape.borderRadius`.
   * See `spec/shape.ts` for the full scale reference.
   */
  shape: ThemeSpecShape;

  /**
   * Responsive breakpoint values in pixels (minimum widths).
   * Passed to `createTheme({ breakpoints: { values: … } })`.
   * The custom `xxs` key is registered via `BreakpointOverrides` in `types.d.ts`.
   * See `spec/breakpoints.ts` for usage and customisation.
   */
  breakpoints: ThemeSpecBreakpoints;

  /**
   * Animation duration and easing curve configuration.
   * Passed to `createTheme({ transitions: … })`.
   * Available at runtime via `theme.transitions.duration` and
   * `theme.transitions.easing`. See `spec/transitions.ts` for the full reference.
   */
  transitions: ThemeSpecTransitions;

  /**
   * Z-index stacking order for overlay layers.
   * Passed to `createTheme({ zIndex: … })`.
   * Available at runtime via `theme.zIndex.<layer>`.
   * See `spec/zIndex.ts` for the layer reference and adding new layers.
   */
  zIndex: ThemeSpecZIndex;

  /**
   * Base spacing unit in pixels used by `theme.spacing(n)`.
   * `theme.spacing(n)` returns `n × spacing` px.
   *
   * Use named multipliers from `spec/spacing.ts` (`SpacingScale`) to give
   * call sites semantic meaning:
   * ```ts
   * import { SpacingScale } from "src/theming/themes/spec/spacing";
   * theme.spacing(SpacingScale.md) // 16px when unit = 4
   * ```
   *
   * Common values:
   * - `4` — compact / dense UIs
   * - `8` — standard MUI default
   */
  spacing: number;
};
