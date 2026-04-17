/**
 * Transition timing specification for the design system.
 *
 * Defines the animation duration and easing curves used across the UI.
 * Different themes can adopt different motion "personalities" — a compact
 * productivity tool may use shorter durations than a consumer-facing app.
 *
 * Values are passed to `createTheme({ transitions: … })` and become
 * available on `theme.transitions.duration` and `theme.transitions.easing`.
 *
 * ### Using transitions in a component
 * ```tsx
 * import { useTheme } from "@mui/material/styles";
 *
 * function Panel({ open }: { open: boolean }) {
 *   const theme = useTheme();
 *   return (
 *     <Box
 *       sx={{
 *         transition: theme.transitions.create("transform", {
 *           duration: theme.transitions.duration.standard,
 *           easing:   theme.transitions.easing.easeInOut,
 *         }),
 *       }}
 *     />
 *   );
 * }
 * ```
 *
 * ### Choosing the right duration
 * | Slot             | When to use                                          |
 * |------------------|------------------------------------------------------|
 * | `shortest`       | Instant micro-interactions — checkbox tick, toggle   |
 * | `shorter`        | Hover effects, icon swaps                            |
 * | `short`          | Dropdown open/close, tooltip appear                  |
 * | `standard`       | Modal transitions, drawer open                       |
 * | `complex`        | Multi-step or full-page transitions                  |
 * | `enteringScreen` | Elements entering the viewport                       |
 * | `leavingScreen`  | Elements leaving the viewport                        |
 *
 * ### Choosing the right easing
 * | Curve       | Description                                          |
 * |-------------|------------------------------------------------------|
 * | `easeInOut` | Standard — elements moving within the screen plane   |
 * | `easeOut`   | Decelerate — elements entering the screen            |
 * | `easeIn`    | Accelerate — elements leaving the screen             |
 * | `sharp`     | Quick start and end — elements that may return       |
 */

export type ThemeSpecTransitions = {
  /** Duration values in milliseconds for each animation slot. */
  duration: {
    /** 150 ms — micro-interactions, toggles, checkboxes */
    shortest: number;
    /** 200 ms — hover effects, icon swaps */
    shorter: number;
    /** 250 ms — dropdown open/close */
    short: number;
    /** 300 ms — standard state changes (most common default) */
    standard: number;
    /** 375 ms — complex or chained animations */
    complex: number;
    /** 225 ms — elements entering the viewport */
    enteringScreen: number;
    /** 195 ms — elements leaving the viewport */
    leavingScreen: number;
  };
  /** CSS cubic-bezier easing strings for each motion curve. */
  easing: {
    /** Standard curve — moving within the screen */
    easeInOut: string;
    /** Decelerate — elements entering the screen */
    easeOut: string;
    /** Accelerate — elements exiting the screen */
    easeIn: string;
    /** Sharp — elements that may return */
    sharp: string;
  };
};
