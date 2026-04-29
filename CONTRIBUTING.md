# Contributing to Themiq Template

Thank you for your interest in Themiq! This document covers everything you need to get started.

---

## Table of Contents

- [Development setup](#development-setup)
- [Adding a new theme](#adding-a-new-theme)
- [Adding a new component](#adding-a-new-component)
- [Code style](#code-style)
- [Submitting a pull request](#submitting-a-pull-request)

---

## Development setup

```bash
# 1. Clone or fork the repository
git clone https://github.com/Nox1906/themiq-template.git
cd themiq-template

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:5173)
npm run dev

# 4. Open Storybook (http://localhost:6006)
npm run storybook
```

**Requirements:** Node ≥ 18, npm ≥ 9.

---

## Adding a new theme

1. **Create the theme folder** under `src/theming/themes/`:

   ```
   src/theming/themes/my-theme/
   ├── index.ts        ← assembles all parts + exports the theme object
   ├── palette.ts      ← semantic color mapping
   ├── typography.ts   ← font families, sizes, weights
   ├── shadows.ts      ← elevation shadow values
   ├── shape.ts        ← named border-radius scale
   ├── breakpoints.ts  ← responsive viewport thresholds
   ├── transitions.ts  ← animation durations and easing
   └── zIndex.ts       ← stacking order
   ```

   Use `src/theming/themes/theme1/` as the reference implementation.

2. **Export it** from `src/theming/themes/index.ts`:

   ```ts
   export { default as MyTheme } from "./my-theme";
   ```

3. **Register the name** in `src/theming/themes/spec/index.ts`:

   ```ts
   name: "theme1" | "theme2" | "my-theme";
   designSystem: "theme1" | "theme2" | "my-theme";
   ```

4. **Register it in the resolver** (`src/theming/resolvers/index.ts`):

   ```ts
   slugMapping: {
     "theme1-app": "theme1",
     "theme2-app": "theme2",
     "my-app":     "my-theme",
   }
   ```

5. **Verify** everything compiles:

   ```bash
   npm run typecheck
   ```

---

## Adding a new component

1. **Create the component folder** under the appropriate category in `src/design-system/`:

   ```
   src/design-system/Inputs/MyInput/
   ├── index.ts              ← re-exports component and types
   ├── MyInput.tsx           ← component implementation
   ├── MyInput.styles.ts     ← token-driven styles via createStyles
   └── MyInput.stories.tsx   ← Storybook story
   ```

2. **Write styles** using the `createStyles` pattern:

   ```ts
   // MyInput.styles.ts
   import { createStyles } from "../../utils/createStyles";

   export default createStyles((theme) => ({
     root: {
       borderRadius: theme.shape.sm,
       color: theme.palette.primary.main,
     },
   }));
   ```

3. **Export** from the category barrel and from `src/design-system/index.ts`.

4. **Add a Storybook story** with `meta.args` defaults so controls are pre-filled.

5. **Run Storybook** and verify the component renders correctly under both themes.

---

## Code style

- **TypeScript strict mode** — no `any`, no unchecked nulls
- **ESLint** — run `npm run lint:fix` before committing
- **No raw hex colors** in component styles — always use `theme.palette.*` tokens
- **No hard-coded px values** for spacing or radius — use `theme.spacing()` and `theme.shape.*`

---

## Submitting a pull request

1. Fork the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
2. Make focused commits using conventional prefixes: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`
3. Run the full check suite:
   ```bash
   npm run typecheck && npm run lint && npm test
   ```
4. Open a pull request against `main` with a clear description of what changed and why.
