# Theming System

The theming system selects and applies an MUI `Theme` at the root of the React tree. It is built around three concepts:

1. **`ThemeSpec`** — a TypeScript contract that every theme must satisfy
2. **Theme implementations** — concrete objects (`theme1`, `theme2`) that satisfy the contract
3. **Resolvers** — React hook factories that decide _which_ theme is active at runtime

---

## Table of Contents

- [How it works](#how-it-works)
- [Changing the active strategy](#changing-the-active-strategy)
- [Adding a new theme](#adding-a-new-theme)
- [Folder structure](#folder-structure)
- [ThemeSpec contract](#themespec-contract)
- [MUI augmentations](#mui-augmentations)

---

## How it works

```
resolvers/index.ts          ← exports useThemeResolver (the active hook)
        │
        ▼
PlatformTheme.tsx           ← calls useThemeResolver() to get a ThemeSpec['name']
        │                      then calls getTheme(spec) to build the MUI Theme
        ▼
MUI ThemeProvider           ← provides the compiled Theme to the whole tree
```

`PlatformTheme` is strategy-agnostic — it only calls the hook and passes the result to MUI. All selection logic lives inside the resolver.

---

## Changing the active strategy

**Edit only one file:** `src/theming/resolvers/index.ts`

```ts
// Current: URL slug
import { createUrlSlugResolver } from './urlSlug';
export const useThemeResolver = createUrlSlugResolver({ ... });
```

No other file needs to change.

> **Themiq Pro:** Need a different selection strategy? More resolver types are available in **[Themiq Pro](https://themiq.io/pro)**.

---

## Adding a new theme

1. **Create the theme folder** — copy `themes/theme1/` to `themes/my-theme/` and edit the values:

   ```
   themes/my-theme/
   ├── index.ts         ← assembles all sub-files; export default must satisfy ThemeSpec
   ├── palette.ts
   ├── typography.ts
   ├── shadows.ts
   ├── shape.ts
   ├── breakpoints.ts
   ├── transitions.ts
   └── zIndex.ts
   ```

2. **Export from `themes/index.ts`:**

   ```ts
   export { default as MyTheme } from "./my-theme";
   ```

3. **Register the name in the `ThemeSpec` union** (`themes/spec/index.ts`):

   ```ts
   name: "theme1" | "theme2" | "my-theme";
   designSystem: "theme1" | "theme2" | "my-theme";
   ```

4. **Update `createStyles.ts` design-system guard** (`utils/createStyles.ts`, line ~93):

   ```ts
   const designSystems: Record<Uppercase<ThemeSpecDesignSystem>, true> = {
     THEME1: true,
     THEME2: true,
     MY_THEME: true, // ← add this
   };
   ```

   TypeScript will produce a compile error here if you forget this step.

5. **Wire it in the resolver** (`resolvers/index.ts`) — add the new name to the relevant mapping (`slugMapping`, `roleMapping`, `tenantMapping`, etc.).

---

## Folder structure

```
src/theming/
├── PlatformTheme.tsx          # Root MUI ThemeProvider; strategy-agnostic
├── config.ts                  # @deprecated — logic moved to resolvers/urlSlug.ts
│
├── resolvers/                 # Pluggable theme-selection strategies
│   ├── index.ts               # ← THE ONLY FILE YOU EDIT to switch strategy
│   ├── types.ts               # UseThemeResolver / UseOptionalThemeResolver
│   └── urlSlug.ts             # URL first-path-segment strategy (included)
│   # 11 additional strategies available in Themiq Pro — https://themiq.io/pro
│
├── themes/
│   ├── index.ts               # Re-exports all theme objects
│   ├── types.d.ts             # MUI module augmentation
│   ├── spec/                  # TypeScript contracts
│   │   ├── index.ts           # ThemeSpec (the main contract)
│   │   ├── palette.ts         # ThemeSpecPalette, ColorVariant
│   │   ├── typography.ts      # ThemeSpecTypography, VariantConfiguration
│   │   ├── shadows.ts         # ShadowIndex named constants
│   │   ├── shape.ts           # ThemeSpecShape (border-radius scale)
│   │   ├── breakpoints.ts     # ThemeSpecBreakpoints (xxs–xl)
│   │   ├── transitions.ts     # ThemeSpecTransitions (durations + easings)
│   │   ├── zIndex.ts          # ThemeSpecZIndex (overlay layers)
│   │   └── spacing.ts         # SpacingScale named multipliers (utility)
│   ├── theme1/                # Theme 1 implementation (8 files)
│   └── theme2/                # Theme 2 implementation (8 files)
│
└── utils.ts/
    ├── index.ts               # Re-exports getTheme
    ├── getTheme.ts            # Converts ThemeSpec → MUI Theme via createTheme
    └── createShadows.ts       # Internal: casts string[] to MUI Shadows tuple
```

---

## ThemeSpec contract

Every theme must export a default object typed as `ThemeSpec`. The contract is defined in `themes/spec/index.ts` and includes:

| Field          | Type                   | Purpose                                                    |
| -------------- | ---------------------- | ---------------------------------------------------------- |
| `name`         | `"theme1" \| "theme2"` | Unique identifier                                          |
| `designSystem` | `"theme1" \| "theme2"` | Design system key used by `createStyles` dispatch          |
| `palette`      | `ThemeSpecPalette`     | Semantic color roles                                       |
| `typography`   | `ThemeSpecTypography`  | Font families, sizes, weights                              |
| `shadows`      | `string[]`             | 14-element elevation shadow array                          |
| `shape`        | `ThemeSpecShape`       | Named border-radius scale                                  |
| `breakpoints`  | `ThemeSpecBreakpoints` | Viewport breakpoint values (`xxs`–`xl`)                    |
| `transitions`  | `ThemeSpecTransitions` | Animation durations and easing curves                      |
| `zIndex`       | `ThemeSpecZIndex`      | Layer stacking constants                                   |
| `spacing`      | `number`               | Base spacing unit in px (multiplied by `theme.spacing(n)`) |

---

## MUI augmentations

`themes/types.d.ts` extends MUI's type system:

- **`Theme`** — adds `name: ThemeSpec['name']` and `designSystem: ThemeSpec['designSystem']`
- **`Shape`** — adds named border-radius tokens: `none`, `xs`, `sm`, `md`, `lg`, `full`
- **`BreakpointOverrides`** — registers the `xxs` breakpoint (360 px)

These augmentations make custom theme properties available throughout the app without casting.
