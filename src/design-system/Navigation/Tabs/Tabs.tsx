import { Tabs as MuiTabs, type TabsProps as MuiTabsProps } from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./Tabs.styles";

const useStyles = makeStyles({ name: "Tabs" });

function TabsImpl(
  { className, classes: overrideClasses, ...props }: TabsProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiTabs
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Tabs.
 *
 * Currently passes through all MUI {@link MuiTabsProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Constrain `variant` to the most common options:
 * ```ts
 * export type TabsProps = Omit<MuiTabsProps, "variant"> & {
 *   variant?: "standard" | "scrollable"; // drop "fullWidth"
 * };
 * ```
 */
export type TabsProps = Omit<MuiTabsProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Tabs. A thin wrapper around MUI's `Tabs` with style
 * override hooks for the active theme.
 *
 * Pair with MUI's `Tab` for individual tab items.
 *
 * **Basic usage:**
 * ```tsx
 * import { Tab } from "@mui/material";
 *
 * const [value, setValue] = React.useState(0);
 *
 * <Tabs value={value} onChange={(_, v) => setValue(v as number)}>
 *   <Tab label="Dashboard" />
 *   <Tab label="Analytics" />
 *   <Tab label="Settings" />
 * </Tabs>
 * ```
 *
 * **Vertical:**
 * ```tsx
 * <Tabs orientation="vertical" value={value} onChange={(_, v) => setValue(v as number)}>
 *   <Tab label="Profile" />
 *   <Tab label="Security" />
 * </Tabs>
 * ```
 *
 * **Scrollable:**
 * ```tsx
 * <Tabs variant="scrollable" scrollButtons="auto" value={value} onChange={(_, v) => setValue(v as number)}>
 *   {Array.from({ length: 8 }, (_, i) => <Tab key={i} label={`Tab ${i + 1}`} />)}
 * </Tabs>
 * ```
 *
 * All MUI `TabsProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-tabs/
 */
const Tabs = forwardRef(TabsImpl) as (
  props: TabsProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default Tabs;
