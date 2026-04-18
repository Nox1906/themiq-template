import { Menu as MuiMenu, type MenuProps as MuiMenuProps } from "@mui/material";
import React from "react";
import { forwardRef, type JSX } from "react";

import makeStyles from "./Menu.styles";

const useStyles = makeStyles({ name: "Menu" });

function MenuImpl(
  { className, classes: overrideClasses, ...props }: MenuProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { classes, cx } = useStyles(
    {},
    { props: { classes: overrideClasses } },
  );

  return (
    <MuiMenu
      ref={ref}
      {...props}
      classes={classes}
      className={cx(classes.root, className)}
    />
  );
}

/**
 * Props for the design-system Menu.
 *
 * Currently passes through all MUI {@link MuiMenuProps} unchanged.
 *
 * **How to add a design-system override:**
 * 1. Add the MUI prop name(s) to the `Omit<>` generic to remove them from the base.
 * 2. Declare your replacement type in the intersection object below.
 * 3. Consume the new prop in the component body.
 *
 * @example Replace `anchorOrigin` + `transformOrigin` with a simpler preset:
 * ```ts
 * export type MenuProps = Omit<MuiMenuProps, "anchorOrigin" | "transformOrigin"> & {
 *   placement?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
 * };
 * ```
 */
export type MenuProps = Omit<MuiMenuProps, never> & {
  // ─── Design-system overrides ────────────────────────────────────────────────
  // Replace `never` with the MUI prop name(s) to override, then declare
  // the custom version here. See JSDoc above for a worked example.
};

/**
 * Design-system Menu. A thin wrapper around MUI's `Menu` with style
 * override hooks for the active theme.
 *
 * Menu is a **controlled component** — you must manage `open` and `anchorEl`.
 * Pair with MUI's `MenuItem` for individual entries.
 *
 * **Basic usage:**
 * ```tsx
 * import { MenuItem } from "@mui/material";
 *
 * const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
 *
 * <>
 *   <button onClick={(e) => setAnchorEl(e.currentTarget)}>Open</button>
 *   <Menu
 *     anchorEl={anchorEl}
 *     open={Boolean(anchorEl)}
 *     onClose={() => setAnchorEl(null)}
 *   >
 *     <MenuItem onClick={() => setAnchorEl(null)}>Option 1</MenuItem>
 *     <MenuItem onClick={() => setAnchorEl(null)}>Option 2</MenuItem>
 *   </Menu>
 * </>
 * ```
 *
 * All MUI `MenuProps` are forwarded unchanged.
 * Style overrides can be applied via the active theme.
 * @see https://mui.com/material-ui/react-menu/
 */
const Menu = forwardRef(MenuImpl) as (
  props: MenuProps & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default Menu;
