# Design System

A collection of themed UI components built on top of [MUI v7](https://mui.com/). Every component adapts its styles to the active theme via the `createStyles` / `makeStyles` pattern.

---

## Table of Contents

- [Importing components](#importing-components)
- [Component catalogue](#component-catalogue)
- [Writing styles for a component](#writing-styles-for-a-component)
- [Style authoring recommendations](#style-authoring-recommendations)
- [Adding a new component](#adding-a-new-component)
- [Folder structure](#folder-structure)

---

## Importing components

All components and utilities are exported from a single barrel:

```ts
import { Button, Typography, Alert, createStyles } from "@/design-system";
import type { IconName } from "@/design-system";
```

The `@/design-system` alias is configured in `tsconfig.app.json` and `vite.config.ts` and resolves to `src/design-system`.

You can also import directly from a category barrel if you prefer narrower imports:

```ts
import { Button, IconButton } from "@/design-system/Inputs";
import { Alert, Dialog } from "@/design-system/Feedback";
```

---

## Component catalogue

### DataDisplay

| Export                                                                                | Description                       |
| ------------------------------------------------------------------------------------- | --------------------------------- |
| `Avatar`, `AvatarGroup`                                                               | User and group avatars            |
| `Badge`                                                                               | Notification badge overlay        |
| `Chip`                                                                                | Compact label / tag               |
| `DataGrid`                                                                            | MUI X data table                  |
| `Divider`                                                                             | Horizontal / vertical separator   |
| `Icon`                                                                                | SVG icon renderer                 |
| `IconName`, `isValidIconName`                                                         | Named icon type + runtime guard   |
| `List`, `ListItem`, `ListItemButton`, `ListItemIcon`, `ListItemText`, `ListSubheader` | List and sub-components           |
| `Tooltip`                                                                             | Hover tooltip                     |
| `Typography`                                                                          | Text with variant / theme support |

### Feedback

| Export                                                                         | Description                     |
| ------------------------------------------------------------------------------ | ------------------------------- |
| `Alert`, `AlertTitle`                                                          | Inline status messages          |
| `CircularProgress`                                                             | Spinner                         |
| `Dialog`, `DialogActions`, `DialogContent`, `DialogContentText`, `DialogTitle` | Modal dialog and sub-components |
| `Skeleton`                                                                     | Loading placeholder             |
| `Snackbar`                                                                     | Toast notification              |

### Inputs

| Export                                                                                       | Description                          |
| -------------------------------------------------------------------------------------------- | ------------------------------------ |
| `Autocomplete`                                                                               | Combobox with filtering              |
| `Button`, `IconButton`                                                                       | Primary action and icon-only buttons |
| `Checkbox`                                                                                   | Boolean checkbox                     |
| `FormControl`, `FormControlLabel`, `FormHelperText`, `FormLabel`, `InputLabel`, `RadioGroup` | Form layout and labelling            |
| `Radio`                                                                                      | Radio button                         |
| `Select`                                                                                     | Dropdown selector                    |
| `Switch`                                                                                     | Toggle switch                        |
| `TextField`                                                                                  | Text input with label                |

### Layout

| Export | Description                        |
| ------ | ---------------------------------- |
| `Box`  | Generic layout container (MUI Box) |

### Navigation

| Export             | Description                 |
| ------------------ | --------------------------- |
| `Breadcrumbs`      | Breadcrumb trail            |
| `Drawer`           | Slide-in navigation panel   |
| `Link`             | Styled anchor / router link |
| `Menu`, `MenuItem` | Dropdown context menu       |
| `Tabs`, `Tab`      | Tabbed navigation           |

### Surfaces

| Export                                                                            | Description                     |
| --------------------------------------------------------------------------------- | ------------------------------- |
| `Accordion`, `AccordionSummary`, `AccordionDetails`                               | Collapsible section             |
| `Card`, `CardActionArea`, `CardActions`, `CardContent`, `CardHeader`, `CardMedia` | Content card and sub-components |
| `Paper`                                                                           | Elevated surface                |

### Utilities

| Export         | Description                                                |
| -------------- | ---------------------------------------------------------- |
| `createStyles` | Define per-design-system styles for a component            |
| `makeStyles`   | Low-level hook factory (used internally by `createStyles`) |

---

## Writing styles for a component

Styles live in a dedicated `ComponentName.styles.ts` file alongside the component. Use `createStyles` to define per-design-system styles.

### Static styles

```ts
// Button.styles.ts
import { createStyles } from "@/design-system/utils";

export default createStyles({
  THEME1: (theme) => ({
    root: {
      background: theme.palette.primary.main,
      borderRadius: theme.shape.sm,
    },
  }),
  THEME2: (theme) => ({
    root: {
      background: theme.palette.secondary.main,
      borderRadius: theme.shape.md,
    },
  }),
});
```

```ts
// Button.tsx
import makeStyles from './Button.styles';
const useStyles = makeStyles({ name: { Button } });

function Button({ className }) {
  const { classes, cx } = useStyles({});
  return <button className={cx(classes.root, className)} />;
}
```

### Dynamic styles (props-driven)

```ts
// Typography.styles.ts
export default createStyles<never, { maxLines?: number }>({
  THEME1: (_, { maxLines }) => ({
    root: { WebkitLineClamp: maxLines },
  }),
  THEME2: (_, { maxLines }) => ({
    root: { WebkitLineClamp: maxLines },
  }),
});

// Typography.tsx
const { classes } = useStyles({ maxLines: props.maxLines });
```

### Shared styles (same across all design systems)

```ts
export default createStyles((theme) => ({
  root: { color: theme.palette.text.primary },
}));
```

### CSS variables (allow parent override)

```ts
// Component.styles.ts
export default createStyles(["accentColor"], {
  THEME1: (theme, _, __, cssVars) => ({
    root: {
      color: cssVars("accentColor").value(theme.palette.primary.main),
    },
  }),
  THEME2: (theme, _, __, cssVars) => ({
    root: {
      color: cssVars("accentColor").value(theme.palette.secondary.main),
    },
  }),
});

// Override from a parent element:
// <div style={{ '--Component-accentColor': 'red' }}><Component /></div>
```

---

## Style authoring recommendations

`createStyles` supports three authoring modes. Choosing the right one per component eliminates the repetition that comes from duplicating shared structure across theme keys.

### Decision rule

```
Do both themes share the same CSS structure?
├── YES → Do the only differences come from theme tokens (palette, shape, spacing)?
│         ├── YES → Use Mode 3: single shared definition  ← default for new components
│         └── NO  → Use Mode 2: shared base + theme-specific overrides
└── NO  → Use Mode 1: full per-theme definitions  ← only when layouts genuinely differ
```

---

### Mode 1 — Full per-theme definitions (current default)

Use when the two themes require **structurally different CSS** — different layout model, different pseudo-selectors, different rule names.

```ts
export default createStyles({
  THEME1: (theme) => ({
    root: {
      display: "flex", // flex layout in theme1
      gap: theme.spacing(1),
      background: theme.palette.primary.main,
    },
  }),
  THEME2: (theme) => ({
    root: {
      display: "grid", // grid layout in theme2
      gridTemplateColumns: "1fr 1fr",
      background: theme.palette.secondary.main,
    },
  }),
});
```

**Pros:** Full per-theme control, easy to audit each theme independently.

**Cons:** Structural changes (spacing, layout) must be applied to both keys. TypeScript enforces completeness but cannot prevent drift between the two definitions.

---

### Mode 2 — Shared base + per-theme overrides

Use when both themes share most styles but **diverge on a few token values**. Extract shared structure into a `base` function and spread it into each theme key, then override only what differs.

```ts
import type { Theme } from "@mui/material";

const base = (theme: Theme) => ({
  root: {
    display: "flex",
    gap: theme.spacing(1),
    borderRadius: theme.shape.sm,
    // all layout, spacing, and structural rules live here
  },
});

export default createStyles({
  THEME1: (theme) => ({
    ...base(theme),
    root: {
      ...base(theme).root,
      background: theme.palette.primary.main, // only the difference
    },
  }),
  THEME2: (theme) => ({
    ...base(theme),
    root: {
      ...base(theme).root,
      background: theme.palette.secondary.main, // only the difference
    },
  }),
});
```

**Pros:** Structural changes are a one-line fix in `base`. Theme-specific intent is clear from the overrides.

**Cons:** Requires the spread discipline — forgetting `...base(theme).root` silently discards shared rules. Best used when the shared portion is significant (>50% of the rules).

---

### Mode 3 — Single shared definition ← recommended default

Use when **all styling differences between themes are expressed through theme tokens** (palette colors, shape scale, spacing, typography). This is the case for the vast majority of components.

`createStyles` already accepts a single function as its only argument — no per-theme keys at all:

```ts
export default createStyles((theme) => ({
  root: {
    display: "flex",
    gap: theme.spacing(1),
    background: theme.palette.primary.main, // theme1 → blue, theme2 → purple
    borderRadius: theme.shape.sm, // theme1 → 4px,  theme2 → 8px
  },
}));
```

Because each theme provides its own token values, the rendered CSS differs per theme with zero code duplication.

**Pros:** Zero repetition. Layout/structural changes touch exactly one place. Scales to any number of themes automatically.

**Cons:** Only works when both themes use the same CSS structure. If THEME2 ever needs a genuinely different layout, you must migrate to Mode 1 or Mode 2 at that point.

**Dynamic props work the same way:**

```ts
export default createStyles<never, { maxLines?: number }>(
  (theme, { maxLines }) => ({
    root: {
      color: theme.palette.text.primary,
      WebkitLineClamp: maxLines,
    },
  }),
);
```

---

### Summary

| Mode                        | Use when                                       | Repetition | Recommended for                                              |
| --------------------------- | ---------------------------------------------- | ---------- | ------------------------------------------------------------ |
| 1 — Per-theme               | Themes need different layouts or structure     | High       | Components with genuinely different per-theme structures     |
| 2 — Shared base + overrides | Themes share structure, differ on a few values | Low        | Refactoring existing per-theme files with shared boilerplate |
| **3 — Single shared**       | All differences are token values               | **None**   | **All new components (default)**                             |

---

## Adding a new component

1. **Create the component folder** under the appropriate category:

   ```
   src/design-system/Inputs/MyInput/
   ├── MyInput.tsx          # Component implementation
   ├── MyInput.styles.ts    # Styles via createStyles
   ├── MyInput.stories.tsx  # Storybook stories
   └── index.ts             # Re-export
   ```

2. **`index.ts`** — re-export the component (and any named exports):

   ```ts
   export { default } from "./MyInput";
   export type { MyInputProps } from "./MyInput";
   ```

3. **Category barrel** — add the export to the category's `index.ts`:

   ```ts
   // src/design-system/Inputs/index.ts
   export { default as MyInput } from "./MyInput";
   export type { MyInputProps } from "./MyInput";
   ```

   The top-level `src/design-system/index.ts` uses `export *` from every category, so it picks up the new export automatically.

4. **Styles** — use `createStyles` with keys matching every registered design system (`THEME1`, `THEME2`, …). TypeScript will error if a design system is missing.

   > When a new design system is added to the platform, you must also add its uppercase key to the `designSystems` guard in `src/design-system/utils/createStyles.ts` — TypeScript will signal this with a compile error.

---

## Folder structure

```
src/design-system/
├── index.ts              # Top-level barrel — exports everything
│
├── DataDisplay/
│   ├── index.ts          # Category barrel
│   ├── Avatar/
│   ├── Badge/
│   ├── Chip/
│   ├── DataGrid/
│   ├── Divider/
│   ├── Icon/
│   ├── List/
│   ├── Tooltip/
│   └── Typography/
│
├── Feedback/
│   ├── index.ts
│   ├── Alert/
│   ├── CircularProgress/
│   ├── Dialog/
│   ├── Skeleton/
│   └── Snackbar/
│
├── Inputs/
│   ├── index.ts
│   ├── Autocomplete/
│   ├── Button/
│   ├── Checkbox/
│   ├── Form/             # FormControl, FormControlLabel, FormHelperText, …
│   ├── Radio/
│   ├── Select/
│   ├── Switch/
│   └── TextField/
│
├── Layout/
│   ├── index.ts
│   └── Box/
│
├── Navigation/
│   ├── index.ts
│   ├── Breadcrumbs/
│   ├── Drawer/
│   ├── Link/
│   ├── Menu/
│   └── Tabs/
│
├── Surfaces/
│   ├── index.ts
│   ├── Accordion/
│   ├── Card/
│   └── Paper/
│
├── svgs/                 # Raw SVG wrapper and shared utilities
│   └── shared/
│       └── Svg/
│
└── utils/
    ├── index.ts          # Exports createStyles and makeStyles
    ├── createStyles.ts   # Per-design-system style factory
    ├── makeStyles.ts     # Low-level tss-react hook factory
    ├── shallowEqual.ts
    └── usePrevious.tsx
```
