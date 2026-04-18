import type { Theme } from "@mui/material/styles";
import { useMemo } from "react";
import type { CSSObject } from "tss-react";
import { makeStyles as tssMakeStyles } from "tss-react/mui";

import shallowEqual from "./shallowEqual";
import usePrevious from "./usePrevious";

/**
 * A CSS custom property descriptor.
 * - As a string it resolves to the variable name, e.g. `--Button-color`.
 * - `.value(fallback?)` resolves to `var(--Button-color, fallback)`.
 */
type CSSVariable = string & {
  value: (defaultValue?: string) => string;
};

type MakeStyleParams = Parameters<typeof tssMakeStyles>;

/**
 * Callable that maps a declared variable name to its `CSSVariable` descriptor.
 */
type CSSVariables<Var extends string | symbol> = (name: Var) => CSSVariable;

/**
 * Builds a proxy that resolves CSS variable names scoped to a component.
 *
 * For a component named `"Button"` and a variable `"color"`, the resolved
 * CSS property name will be `--Button-color`.
 *
 * The proxy also supports property access syntax for legacy callers:
 * `cssVars.color` is equivalent to `cssVars('color')`.
 *
 * @internal
 */
function createCssVariablesNameScopedProxy<Var extends string | symbol = never>(
  variables?: readonly Var[],
  name?: string,
): CSSVariables<Var> {
  const varsObject: Record<Var, string> = (variables || []).reduce(
    (acc, varName) => {
      acc[varName] = `--${name}-${String(varName)}`;

      return acc;
    },
    {} as Record<Var, string>,
  );

  function cssVars(varName: Var) {
    if (!(varName in varsObject)) {
      throw new Error(
        `Invalid css variable ${varName.toString()}. Declare it first on the makeStyles vars array`,
      );
    }

    return {
      toString: () => varsObject[varName],
      value: (defaultValue?: string) =>
        `var(${varsObject[varName]}${defaultValue ? `, ${defaultValue}` : ""})`,
    };
  }

  return new Proxy(cssVars, {
    // TODO: remove after all vars are read as cssVars('varName')
    get: (_, prop) => {
      return cssVars(prop as Var);
    },
  }) as CSSVariables<Var>;
}

/**
 * Accepts either a static CSS object or a function that receives `(theme, params, classes, cssVars)`
 * and returns a CSS object. Both forms must return a record keyed by rule names.
 *
 * @internal
 */
type CustomCssObjectOrGetCssObject<
  RuleName extends string,
  Params = void,
  Vars extends string | symbol = never,
  RuleNameSubsetReferenceableInNestedSelectors extends string = never,
> =
  | Record<RuleName | RuleNameSubsetReferenceableInNestedSelectors, CSSObject>
  | ((
      theme: Theme,
      params: Params,
      classes: Record<RuleNameSubsetReferenceableInNestedSelectors, string>,
      cssVars: CSSVariables<Vars>,
    ) => Record<
      RuleName | RuleNameSubsetReferenceableInNestedSelectors,
      CSSObject
    >);

/**
 * Normalises the `Params` generic: when `Params` is `never` (no dynamic params
 * needed) the hook accepts an empty/undefined object instead of failing the type
 * check.
 *
 * @internal
 */
type CleanParams<Params> = [Params] extends [never]
  ? Record<string, never> | undefined
  : Params;

/**
 * Design-system style hook factory. Wraps tss-react's `makeStyles` with:
 *
 * - **Scoped CSS variables** — declare variable names once and get type-safe
 *   descriptors that resolve to `--ComponentName-varName` in CSS.
 * - **Stable `ownerState`** — uses `shallowEqual` + `usePrevious` to avoid
 *   creating a new object reference every render when `ownerState` hasn't
 *   actually changed, preventing unnecessary class recalculation.
 * - **Per-design-system dispatch** — used indirectly via `createStyles`, which
 *   picks the right style function at runtime based on `theme.designSystem`.
 *
 * In practice you will almost never call `makeStyles` directly. Instead,
 * define styles in a `*.styles.ts` file via `createStyles`, export the result,
 * and import it as `makeStyles` in the component file:
 *
 * ```ts
 * // Component.styles.ts
 * export default createStyles({
 *   THEME1: (theme) => ({ root: { color: theme.palette.primary.main } }),
 *   THEME2: (theme) => ({ root: { color: theme.palette.secondary.main } }),
 * });
 *
 * // Component.tsx
 * import makeStyles from './Component.styles';
 * const useStyles = makeStyles({ name: { Component } });
 *
 * function Component({ className, classes: overrideClasses }) {
 *   const { classes, cx } = useStyles({}, { props: { classes: overrideClasses } });
 *   return <div className={cx(classes.root, className)} />;
 * }
 * ```
 *
 * **With dynamic params** (e.g. a prop that affects styles):
 * ```ts
 * // Component.styles.ts
 * export default createStyles<never, { size: number }>({
 *   THEME1: (_, { size }) => ({ root: { width: size } }),
 *   THEME2: (_, { size }) => ({ root: { width: size } }),
 * });
 *
 * // Component.tsx
 * const { classes } = useStyles({ size: props.size });
 * ```
 *
 * **With CSS variables** (for values that need to be overridable via CSS):
 * ```ts
 * // Component.styles.ts
 * export default createStyles(['color'], {
 *   THEME1: (theme, _, __, cssVars) => ({
 *     root: { color: cssVars('color').value(theme.palette.primary.main) },
 *   }),
 * });
 *
 * // Usage in a parent:
 * // <div style={{ '--Component-color': 'red' }}><Component /></div>
 * ```
 *
 * @param options - tss-react options, most importantly `name` for class name
 *   scoping and DevTools labelling. Pass `{ name: { ComponentName } }` to get
 *   predictable class names like `ComponentName-root`.
 * @param cssVars - Optional list of CSS variable names to declare for this
 *   component. Each name is scoped to the component: `'color'` on `Button`
 *   becomes `--Button-color`.
 *
 * @returns A function that accepts a style definition (static object or
 *   `(theme, params, classes, cssVars) => object`) and returns the `useStyles`
 *   hook. The hook returns `{ classes, cx, cssVars }`.
 */
export default function makeStyles<
  Vars extends string | symbol = never,
  Params extends object = never,
  RuleNameSubsetReferenceableInNestedSelectors extends string = never,
>(options: MakeStyleParams[0], cssVars?: readonly Vars[]) {
  const defaultMakeStyles = tssMakeStyles<
    CleanParams<Params>,
    RuleNameSubsetReferenceableInNestedSelectors
  >(options);
  const name =
    typeof options?.name !== "object"
      ? options?.name
      : Object.keys(options.name).join("-");

  const cssVarsProxy = createCssVariablesNameScopedProxy(cssVars, name);

  return <RuleName extends string>(
    getCssObjectOrCssObject: CustomCssObjectOrGetCssObject<
      RuleName,
      CleanParams<Params>,
      Vars,
      RuleNameSubsetReferenceableInNestedSelectors
    >,
  ) => {
    const wrappedGetCssObject =
      typeof getCssObjectOrCssObject === "function"
        ? (
            theme: Theme,
            ...args: [
              CleanParams<Params>,
              Record<RuleNameSubsetReferenceableInNestedSelectors, string>,
            ]
          ) => getCssObjectOrCssObject(theme, ...args, cssVarsProxy)
        : getCssObjectOrCssObject;

    const defaultUseStyles = defaultMakeStyles<
      RuleName | RuleNameSubsetReferenceableInNestedSelectors
    >(wrappedGetCssObject);

    function useStyles(
      // because of TS limitations, we need to use a tuple for the conditional assertion
      params?: CleanParams<Params>,
      muiStyleOverridesParams?: Parameters<typeof defaultUseStyles>[1],
    ) {
      const ownerState = muiStyleOverridesParams?.ownerState;
      const prevOwnerState = usePrevious(ownerState);

      const wrappedOwnerState = useMemo(
        () => ({
          ...muiStyleOverridesParams?.ownerState,
          cssVars,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [shallowEqual(prevOwnerState, ownerState)],
      );

      return {
        ...defaultUseStyles(params as CleanParams<Params>, {
          ...muiStyleOverridesParams,
          props: { ...muiStyleOverridesParams?.props },
          ownerState: wrappedOwnerState,
        }),
        cssVars: cssVarsProxy,
      };
    }

    useStyles.vars = cssVarsProxy;

    return useStyles;
  };
}
