# Storybook

Component explorer and visual test runner for the Chameleon design system. Every design-system component has a `*.stories.tsx` file alongside it; Storybook discovers them automatically.

---

## Table of Contents

- [Running Storybook](#running-storybook)
- [Running visual tests](#running-visual-tests)
- [File overview](#file-overview)
- [How theming works in Storybook](#how-theming-works-in-storybook)
- [Switching theme in the UI](#switching-theme-in-the-ui)
- [Using the prop-injection resolver in stories](#using-the-prop-injection-resolver-in-stories)
- [Writing a story](#writing-a-story)
- [Installed addons](#installed-addons)
- [Adding a story for a new component](#adding-a-story-for-a-new-component)

---

## Running Storybook

```bash
# Start the dev server (http://localhost:6006)
npm run storybook

# Run Storybook + Vitest together (recommended during active development)
npm run storybook:dev
```

---

## Running visual tests

Stories double as Vitest browser tests via `@storybook/addon-vitest`. Each exported story is rendered in a headless Chromium browser and checked for runtime errors.

```bash
# Run all story tests once
npm test

# Run Storybook and Vitest in watch mode together
npm run storybook:dev
```

Tests are configured in `vitest.config.ts` at the project root. The setup file (`.storybook/vitest.setup.ts`) is intentionally minimal — project annotations are injected automatically by `@storybook/addon-vitest` since Storybook 10.3.

---

## File overview

```
.storybook/
├── main.ts           # Storybook build config: story glob, addons, Vite overrides
├── preview.ts        # Global decorators, controls matchers, default theme
├── ThemeWrapper.tsx  # MUI ThemeProvider used by the theme switcher decorator
├── vitest.setup.ts   # Vitest setup (currently a no-op; kept as an extension point)
└── README.md         # This file
```

### `main.ts`

- **Story glob:** `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)` — picks up every story file under `src/`
- **SVGR:** `vite-plugin-svgr` is injected in `viteFinal` so `*.svg?react` imports work in stories the same way they do in the app
- **Docs:** `react-docgen-typescript` generates prop tables automatically from TypeScript types; props from `node_modules` are filtered out to keep the tables clean

### `preview.ts`

Registers the global theme-switcher decorator using `withThemeFromJSXProvider` from `@storybook/addon-themes`. The decorator wraps every story with `ThemeWrapper`, passing the currently selected theme name as a prop.

### `ThemeWrapper.tsx`

A standalone MUI provider used only inside Storybook. It mirrors the structure of `PlatformTheme.tsx` but accepts a `themeName` prop directly instead of calling a resolver hook. This keeps stories independent of the resolver system — a story always renders in a known, explicit theme.

---

## How theming works in Storybook

The Storybook theme setup is intentionally **decoupled from the resolver system** (`src/theming/resolvers/`). The resolver reads URLs, roles, OS preferences, etc. — none of which make sense in a story context.

Instead, `preview.ts` uses `withThemeFromJSXProvider` to present a theme dropdown toolbar. When you pick a theme in the toolbar, `ThemeWrapper` receives the new theme name as a prop, looks it up in `themesByName`, and calls `getTheme(spec)` to rebuild the MUI Theme.

```
Toolbar dropdown
    │  theme name (e.g. "theme2")
    ▼
ThemeWrapper.tsx
    │  getTheme(themesByName["theme2"])
    ▼
MUI ThemeProvider  →  story renders with theme2 tokens
```

### Registering a new theme in Storybook

When you add a new theme to the platform (see `src/theming/README.md`), add it to the `themes` map in `preview.ts`:

```ts
// preview.ts
import * as themes from '../src/theming/themes';

withThemeFromJSXProvider({
  themes: {
    theme1: themes.Theme1,
    theme2: themes.Theme2,
    myTheme: themes.MyTheme,  // ← new entry
  },
  defaultTheme: 'theme1',
  ...
})
```

---

## Switching theme in the UI

Use the **Themes** toolbar button (paintbrush icon) at the top of the Storybook UI. Every story re-renders with the selected theme's full MUI token set applied.

---

## Using the prop-injection resolver in stories

If your app uses the `propInjection` resolver strategy (`src/theming/resolvers/propInjection.ts`), you can control the theme from a Storybook decorator:

```tsx
// .storybook/preview.ts
import { ThemeNameContext } from '../src/theming/resolvers/propInjection';

decorators: [
  (Story, { globals }) => (
    <ThemeNameContext.Provider value={globals.theme ?? 'theme1'}>
      <Story />
    </ThemeNameContext.Provider>
  ),
],
```

This lets the Storybook toolbar drive the resolver context, making in-app theme switching previewing possible within stories.

---

## Writing a story

Stories live alongside their component in a `ComponentName.stories.tsx` file. Follow this template:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import MyComponent from "./MyComponent";

const meta: Meta<typeof MyComponent> = {
  title: "Design System/Category/MyComponent", // mirrors the folder path
  component: MyComponent,
  parameters: {
    layout: "centered", // 'fullscreen' for page-level components
  },
  tags: ["autodocs"], // generates a prop-table docs page automatically
  argTypes: {
    // override control types for specific props if the inferred type is wrong
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Each named export is one story (one rendered state)
export const Default: Story = {
  args: {
    children: "Hello",
  },
};

export const Disabled: Story = {
  args: {
    children: "Hello",
    disabled: true,
  },
};
```

**`title` convention:** `Design System/<Category>/<ComponentName>` — mirrors the folder structure (`Inputs/Button` → `Design System/Inputs/Button`).

**`tags: ['autodocs']`** — always include this; it generates the Props documentation page from TypeScript types via `react-docgen-typescript`.

---

## Installed addons

| Addon                      | Purpose                                                       |
| -------------------------- | ------------------------------------------------------------- |
| `@storybook/addon-docs`    | Auto-generated prop tables and MDX documentation              |
| `@storybook/addon-themes`  | Theme switcher toolbar + `withThemeFromJSXProvider` decorator |
| `@storybook/addon-vitest`  | Runs each story as a Vitest browser test                      |
| `@storybook/addon-a11y`    | Accessibility audit panel (axe-core) per story                |
| `@chromatic-com/storybook` | Chromatic visual regression testing integration               |

---

## Adding a story for a new component

1. Create `ComponentName.stories.tsx` in the component's folder
2. Set `title` to `'Design System/<Category>/<ComponentName>'`
3. Add `tags: ['autodocs']` to generate the prop table
4. Export at least one story per significant visual state (default, disabled, loading, error, etc.)
5. Run `npm run storybook` and verify the component appears in the sidebar under the correct category
