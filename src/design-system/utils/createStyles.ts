import * as R from "ramda";

import type { ThemeSpec } from "../../theming/themes/spec";
import makeStyles from "./makeStyles";

type ThemeSpecDesignSystem = ThemeSpec["designSystem"];

/** @internal */
type MakeStylesReturn<
  Vars extends string | symbol,
  Params extends object,
  RuleNameSubsetReferenceableInNestedSelectors extends string,
> = Parameters<
  ReturnType<
    typeof makeStyles<
      Vars,
      Params,
      RuleNameSubsetReferenceableInNestedSelectors
    >
  >
>[0];

/**
 * A style definition accepted by `createStyles`. Can be either:
 * - A **per-design-system map** keyed by the uppercase design system names
 *   (`THEME1`, `THEME2`, …). Each value is a style function or object for
 *   that specific design system.
 * - A **single shared definition** (function or static object) applied to
 *   every design system.
 *
 * @internal
 */
type CreateStyles<
  Vars extends string | symbol,
  Params extends object,
  RuleNameSubsetReferenceableInNestedSelectors extends string,
> =
  | Record<
      Uppercase<ThemeSpecDesignSystem>,
      MakeStylesReturn<
        Vars,
        Params,
        RuleNameSubsetReferenceableInNestedSelectors
      >
    >
  | MakeStylesReturn<
      Vars,
      Params,
      RuleNameSubsetReferenceableInNestedSelectors
    >;

/** @internal */
type CreateStylesWithCssVars<
  Vars extends string | symbol,
  Params extends object,
  RuleNameSubsetReferenceableInNestedSelectors extends string,
> = [
  Parameters<
    typeof makeStyles<
      Vars,
      Params,
      RuleNameSubsetReferenceableInNestedSelectors
    >
  >[1],
  CreateStyles<Vars, Params, RuleNameSubsetReferenceableInNestedSelectors>,
];

/**
 * Type guard — returns `true` when `styles` is a per-design-system map
 * (i.e. has all required uppercase design-system keys).
 *
 * The `designSystems` object is intentionally typed as
 * `Record<Uppercase<ThemeSpecDesignSystem>, true>` so TypeScript will produce
 * a compile error here if a new design system is added to `ThemeSpec` but
 * this guard is not updated.
 *
 * @internal
 */
function isDesignSystemConfig<
  Vars extends string | symbol,
  Params extends object,
  RuleNameSubsetReferenceableInNestedSelectors extends string,
>(
  styles: CreateStyles<
    Vars,
    Params,
    RuleNameSubsetReferenceableInNestedSelectors
  >,
): styles is Record<
  Uppercase<ThemeSpecDesignSystem>,
  MakeStylesReturn<Vars, Params, RuleNameSubsetReferenceableInNestedSelectors>
> {
  // if a new design system is added, TS will signal that this needs to be updated
  const designSystems: Record<Uppercase<ThemeSpecDesignSystem>, true> = {
    THEME1: true,
    THEME2: true,
  };

  return R.keys(designSystems).every((key) =>
    Boolean(
      (
        styles as Record<
          Uppercase<ThemeSpecDesignSystem>,
          MakeStylesReturn<
            Vars,
            Params,
            RuleNameSubsetReferenceableInNestedSelectors
          >
        >
      )[key],
    ),
  );
}

/**
 * Defines styles for a design-system component with automatic per-theme dispatch.
 *
 * This is the **entry point for writing component styles**. It is always used
 * in a dedicated `*.styles.ts` file, and the result is imported as `makeStyles`
 * inside the corresponding component.
 *
 * ## How it works
 *
 * 1. You pass a style map keyed by `THEME1` / `THEME2` (uppercase design system
 *    names). Each value is either a static CSS object or a function
 *    `(theme, params, classes, cssVars) => CSSObject`.
 * 2. At runtime, `createStyles` reads `theme.designSystem` from the active MUI
 *    theme and picks the matching entry from your map.
 * 3. The result is a configured `makeStyles` factory. You call it in your
 *    component file with `{ name: { ComponentName } }` to get the final
 *    `useStyles` hook.
 *
 * ## Type parameters
 *
 * | Parameter | Purpose |
 * |---|---|
 * | `Vars` | CSS variable names to declare (string literals). Omit when not using CSS variables. |
 * | `Params` | Shape of the runtime param object your style function receives. Omit when styles are static. |
 * | `RuleNameSubsetReferenceableInNestedSelectors` | Rule names you want to reference inside nested selectors (e.g. `'root'` → `classes.root` inside another rule). Rarely needed. |
 *
 * ## Usage examples
 *
 * **Static styles (no dynamic params):**
 * ```ts
 * // Button.styles.ts
 * export default createStyles({
 *   THEME1: (theme) => ({
 *     root: { background: theme.palette.primary.main },
 *   }),
 *   THEME2: (theme) => ({
 *     root: { background: theme.palette.secondary.main },
 *   }),
 * });
 *
 * // Button.tsx
 * import makeStyles from './Button.styles';
 * const useStyles = makeStyles({ name: { Button } });
 *
 * function Button({ className, classes: overrideClasses }) {
 *   const { classes, cx } = useStyles({}, { props: { classes: overrideClasses } });
 *   return <button className={cx(classes.root, className)} />;
 * }
 * ```
 *
 * **Dynamic params** (styles depend on component props):
 * ```ts
 * // Typography.styles.ts
 * export default createStyles<never, { maxLines?: number }>({
 *   THEME1: (_, { maxLines }) => ({
 *     root: { WebkitLineClamp: maxLines },
 *   }),
 *   THEME2: (_, { maxLines }) => ({
 *     root: { WebkitLineClamp: maxLines },
 *   }),
 * });
 *
 * // Typography.tsx
 * const { classes } = useStyles({ maxLines: props.maxLines });
 * ```
 *
 * **Shared styles** (same for every design system):
 * ```ts
 * export default createStyles((theme) => ({
 *   root: { color: theme.palette.text.primary },
 * }));
 * ```
 *
 * **CSS variables** (values overridable from a parent via CSS):
 * ```ts
 * // Component.styles.ts — first arg is the variable name array
 * export default createStyles(['accentColor'], {
 *   THEME1: (theme, _, __, cssVars) => ({
 *     root: {
 *       color: cssVars('accentColor').value(theme.palette.primary.main),
 *     },
 *   }),
 * });
 *
 * // Override from a parent element:
 * // <div style={{ '--Component-accentColor': 'red' }}><Component /></div>
 * ```
 *
 * **Referencing another rule inside a nested selector:**
 * ```ts
 * export default createStyles<never, never, 'label'>({
 *   THEME1: (theme) => ({
 *     label: { color: theme.palette.text.secondary },
 *     root: {
 *       '&:hover $label': { color: theme.palette.text.primary },
 *     },
 *   }),
 * });
 * ```
 */
export default function createStyles<
  Vars extends string | symbol = never,
  Params extends object = never,
  RuleNameSubsetReferenceableInNestedSelectors extends string = never,
>(
  ...args:
    | [CreateStyles<Vars, Params, RuleNameSubsetReferenceableInNestedSelectors>]
    | CreateStylesWithCssVars<
        Vars,
        Params,
        RuleNameSubsetReferenceableInNestedSelectors
      >
) {
  const [cssVars, styles] =
    args.length === 1
      ? [
          undefined,
          args[0] as CreateStyles<
            Vars,
            Params,
            RuleNameSubsetReferenceableInNestedSelectors
          >,
        ]
      : (args as CreateStylesWithCssVars<
          Vars,
          Params,
          RuleNameSubsetReferenceableInNestedSelectors
        >);

  return (
    options: Parameters<
      typeof makeStyles<
        Vars,
        Params,
        RuleNameSubsetReferenceableInNestedSelectors
      >
    >[0],
  ) => {
    return makeStyles<
      Vars,
      Params,
      RuleNameSubsetReferenceableInNestedSelectors
    >(
      options,
      cssVars,
    )(
      isDesignSystemConfig(styles)
        ? (theme, ...args) => {
            const designSystemStyles =
              styles[
                theme.designSystem.toUpperCase() as Uppercase<ThemeSpecDesignSystem>
              ];

            if (typeof designSystemStyles === "function") {
              return designSystemStyles(theme, ...args);
            }

            return designSystemStyles;
          }
        : styles,
    );
  };
}
