import camelCase from "lodash.camelcase";
import upperFirst from "lodash.upperfirst";
import * as React from "react";
import * as MuiIcons from "@mui/icons-material";
import { SvgIcon, type SvgIconProps } from "@mui/material";
import * as customSvgs from "./svg";

// Wrap raw SVG components so they accept SvgIconProps (color, fontSize, className, etc.)
// Cast preserves the exact key names from customSvgs so they remain in IconName
const wrappedCustomSvgs = Object.fromEntries(
  Object.entries(customSvgs).map(([name, SvgComponent]) => [
    name,
    (props: SvgIconProps) =>
      React.createElement(SvgIcon, props, React.createElement(SvgComponent)),
  ]),
) as {
  [K in keyof typeof customSvgs]: (props: SvgIconProps) => React.ReactElement;
};

// Merged map: MUI icons as base, custom SVGs override on name collision
export const iconRegistry = {
  ...MuiIcons,
  ...wrappedCustomSvgs,
} as const;

export type IconName = keyof typeof iconRegistry;

export const getSvgComponentName = (name: string) =>
  upperFirst(camelCase(name));

export const isValidIconName = (name: string): boolean =>
  Boolean(iconRegistry[getSvgComponentName(name) as IconName]);

export const customIconNames = Object.keys(customSvgs) as IconName[];
