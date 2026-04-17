/**
 * Design token primitives — the single source of truth for all raw color values.
 *
 * These are **not** meant to be used directly in components.
 * They exist solely to be consumed by theme palette files
 * (e.g. `theme1/palette.ts`) where they are mapped to semantic roles
 * (`primary`, `secondary`, `success`, etc.).
 *
 * ### Scale system
 * Each color family uses a numeric scale:
 *
 * | Step  | Intended use                                          |
 * |-------|-------------------------------------------------------|
 * | `0`   | Lightest tint — near-white backgrounds, subtle fills  |
 * | `25`  | Very light (blue only) — page default background      |
 * | `50`  | Very light — hover backgrounds, light chip fills      |
 * | `100` | Light — borders, dividers, tag backgrounds            |
 * | `300` | Medium-light — secondary icons, placeholder text      |
 * | `500` | Base / main color                                     |
 * | `600` | Slightly darker (stone only)                          |
 * | `700` | Dark — hover states, dark text on light backgrounds   |
 * | `900` | Darkest — near-black, high-contrast elements          |
 *
 * ### Adding a new primitive family
 * Follow the same scale pattern and reference the new family in a theme palette:
 * ```ts
 * cyan: {
 *   0:   "#E0F7FA",
 *   50:  "#B2EBF2",
 *   100: "#80DEEA",
 *   300: "#4DD0E1",
 *   500: "#00BCD4", // ← base
 *   700: "#0097A7",
 *   900: "#006064",
 * },
 * ```
 * Then map it in a theme's `palette.ts`:
 * ```ts
 * primary: {
 *   main: primitives.cyan[500],
 *   light: primitives.cyan[50],
 *   dark: primitives.cyan[700],
 *   contrastText: primitives.white,
 * },
 * ```
 */
export default {
  blue: {
    0: "#E7F2FF",
    25: "#F1F3FF",
    50: "#B5D9FF",
    100: "#7BACFF",
    300: "#3B86FF",
    500: "#0560FD",
    700: "#022CC3",
    900: "#000C55",
  },
  green: {
    0: "#F0FEF1",
    50: "#CBEDCD",
    100: "#ACD8AF",
    300: "#76CC7C",
    500: "#2F9D36",
    700: "#007626",
    900: "#004D1A",
  },
  orange: {
    0: "#FFF8F0",
    50: "#FBE5CB",
    100: "#EECCA3",
    300: "#EDAA58",
    500: "#D48018",
    700: "#975102",
    900: "#522504",
  },
  red: {
    0: "#FFF9F8",
    50: "#FFE4E1",
    100: "#FFC7C1",
    300: "#E9928A",
    500: "#EE4640",
    700: "#C00F0C",
    900: "#900B09",
  },
  stone: {
    0: "#ECECF3",
    50: "#D8D8E1",
    100: "#C7C7CF",
    300: "#AEAEB7",
    500: "#6C6C75",
    600: "#19191dff",
    700: "#3A3A3D",
    900: "#14131B",
  },
  purple: {
    0: "#F7F1FF",
    50: "#DEC9FF",
    100: "#C199FF",
    300: "#9766E2",
    500: "#7247B4",
    700: "#593099",
    900: "#2D0866",
  },
  teal: {
    0: "#E8F6F9",
    50: "#BAEFF0",
    100: "#70C9CE",
    300: "#43B1B7",
    500: "#338B8D",
    700: "#1A696B",
    900: "#174848",
  },
  plum: {
    0: "#FFF3FB",
    50: "#EDC4E1",
    100: "#DE91C7",
    300: "#D064B0",
    500: "#A53182",
    700: "#621E4E",
    900: "#3B0A2C",
  },
  black: "#000000",
  white: "#FFFFFF",
  blackOpacity: "#14131B1A",
} as const;
