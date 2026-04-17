import type { ThemeSpecTransitions } from "../spec/transitions";

/**
 * Theme2 transition timing.
 *
 * Currently mirrors Theme1 (MUI defaults). Adjust here to give Theme2
 * a different motion personality — e.g. longer durations for a more
 * expressive consumer product feel.
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
