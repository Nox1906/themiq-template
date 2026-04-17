# Theming System

The theming system selects and applies an MUI `Theme` at the root of the React tree. It is built around three concepts:

1. **`ThemeSpec`** — a TypeScript contract that every theme must satisfy
2. **Theme implementations** — concrete objects (`theme1`, `theme2`) that satisfy the contract
3. **Resolvers** — React hook factories that decide _which_ theme is active at runtime

---

## Table of Contents

- [How it works](#how-it-works)
- [Changing the active strategy](#changing-the-active-strategy)
- [Available resolver strategies](#available-resolver-strategies)
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

// Switch to: OS dark mode
import { createOsPreferenceResolver } from './osPreference';
export const useThemeResolver = createOsPreferenceResolver({
  light: 'theme1',
  dark:  'theme2',
});
```

No other file needs to change.

> **Exception:** the `uiToggle` strategy requires a `<ThemeControlProvider>` rendered above `<PlatformTheme>` in `main.tsx`. See [`resolvers/uiToggle.tsx`](resolvers/uiToggle.tsx) for setup instructions.

---

## Available resolver strategies

| File                                             | Strategy                             | Reactive?            | Best for                   |
| ------------------------------------------------ | ------------------------------------ | -------------------- | -------------------------- |
| [`urlSlug.ts`](resolvers/urlSlug.ts)             | First URL path segment (`/:appSlug`) | No (module load)     | Multi-app platform         |
| [`queryParam.ts`](resolvers/queryParam.ts)       | `?theme=` URL query parameter        | Yes                  | QA / staging preview       |
| [`userRole.ts`](resolvers/userRole.ts)           | Authenticated user role              | On re-login          | RBAC skins                 |
| [`tenant.ts`](resolvers/tenant.ts)               | Organisation / tenant ID             | On re-login          | White-labelling            |
| [`localStorage.ts`](resolvers/localStorage.ts)   | Saved browser preference             | On mount             | Restore user choice        |
| [`uiToggle.tsx`](resolvers/uiToggle.tsx)         | In-app toggle button                 | Yes (instant)        | Theme-picker UI            |
| [`osPreference.ts`](resolvers/osPreference.ts)   | OS `prefers-color-scheme`            | Yes (OS change)      | Auto dark mode             |
| [`hostname.ts`](resolvers/hostname.ts)           | `window.location.hostname`           | No (module load)     | Custom-domain tenants      |
| [`remoteConfig.ts`](resolvers/remoteConfig.ts)   | Fetch from internal endpoint         | On mount (async)     | Ops-controlled rollout     |
| [`abExperiment.ts`](resolvers/abExperiment.ts)   | Any async SDK function               | On mount (async)     | A/B experimentation        |
| [`propInjection.ts`](resolvers/propInjection.ts) | `ThemeNameContext` from host         | Yes (context change) | Micro-frontend / Storybook |
| [`composed.ts`](resolvers/composed.ts)           | Priority chain of optional resolvers | Depends on steps     | Mixed strategies           |

### Composed (priority chain) example

```ts
import { createComposedResolver } from "./composed";
import { createOptionalPropInjectionResolver } from "./propInjection";
import { createOptionalQueryParamResolver } from "./queryParam";
import { createOptionalTenantResolver } from "./tenant";
import { useOrgId } from "../auth/useOrgId";

export const useThemeResolver = createComposedResolver(
  [
    createOptionalPropInjectionResolver(), // highest priority
    createOptionalQueryParamResolver({ paramName: "theme" }),
    createOptionalTenantResolver({
      useTenant: useOrgId,
      tenantMapping: { "org-abc": "theme1", "org-xyz": "theme2" },
    }),
  ],
  { fallback: "theme1" },
);
```

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
│   ├── urlSlug.ts
│   ├── queryParam.ts
│   ├── userRole.ts
│   ├── tenant.ts
│   ├── localStorage.ts
│   ├── uiToggle.tsx           # .tsx because it contains JSX (ThemeControlProvider)
│   ├── osPreference.ts
│   ├── hostname.ts
│   ├── remoteConfig.ts
│   ├── abExperiment.ts
│   ├── propInjection.ts
│   └── composed.ts
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
