import type { ThemeSpecTransitions } from "../spec/transitions";

/**
 * Theme1 transition timing.
 *
 * These values are passed to `createTheme({ transitions: … })` and available
 * at runtime via `theme.transitions.duration` and `theme.transitions.easing`.
 *
 * Values match MUI's defaults — adjust them here to give Theme1 a faster
 * or slower motion personality without changing individual components.
 *
 * ### Usage in a component
 * ```tsx
 * <Box
 *   sx={{
 *     transition: theme.transitions.create("opacity", {
 *       duration: theme.transitions.duration.short,
 *       easing:   theme.transitions.easing.easeOut,
 *     }),
 *   }}
 * />
 * ```
 *
 * ### Making the whole theme feel snappier
 * Reduce all durations proportionally:
 * ```ts
 * duration: {
 *   shortest:       100,
 *   shorter:        150,
 *   short:          200,
 *   standard:       250,
 *   complex:        300,
 *   enteringScreen: 175,
 *   leavingScreen:  150,
 * }
 * ```
 */
const transitions: ThemeSpecTransitions = {
  duration: {
    shortest: 150, // micro-interactions — toggles, checkboxes
    shorter: 200, // hover effects, icon swaps
    short: 250, // dropdown open/close
    standard: 300, // standard state changes (most common)
    complex: 375, // complex or chained animations
    enteringScreen: 225, // elements entering the viewport
    leavingScreen: 195, // elements leaving the viewport
  },
  easing: {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)", // standard — moving within screen
    easeOut: "cubic-bezier(0.0, 0, 0.2, 1)", // decelerate — entering screen
    easeIn: "cubic-bezier(0.4, 0, 1, 1)", // accelerate — exiting screen
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)", // elements that may return
  },
};

export default transitions;
