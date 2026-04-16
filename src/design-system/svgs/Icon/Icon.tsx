import { forwardRef } from "react";
import * as React from "react";
import { type SvgIconProps } from "@mui/material";

import { makeStyles } from "../../utils";
import { type IconName, getSvgComponentName, iconRegistry } from "./iconUtils";

export type IconProps = {
  /**
   * Name of the icon to render. Accepts any MUI icon name (e.g. `"Home"`, `"Delete"`) or a
   * custom icon name defined in `src/design-system/svgs/Icon/svg/`.
   * Custom icons take precedence over MUI icons when names conflict.
   * See the full list in the **AllIcons** and **CustomIcons** Storybook stories.
   */
  name?: IconName;
  /**
   * Pass a raw SVG or React component directly instead of using `name`.
   * Takes precedence over `name` when both are provided.
   */
  component?: React.ElementType;
  /**
   * Controls the rendered font-size of the icon.
   * Maps to: `xs` → 1.08rem · `sm` → 1.15rem · `md` → 1.5rem · `lg` → 2rem · `xl` → 3.75rem · `2xl` → 4.5rem.
   * @default "sm"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /** Additional CSS class applied to the root SVG element. */
  className?: string;
  /** Inline styles applied to the root SVG element. */
  style?: React.CSSProperties;
} & Omit<SvgIconProps, "component">;

const useStyles = makeStyles({ name: "Icon" })({
  sizeXs: { fontSize: "1.0833rem" },
  sizeSm: { fontSize: "1.15rem" },
  sizeMd: { fontSize: "1.5rem" },
  sizeLg: { fontSize: "2rem" },
  sizeXL: { fontSize: "3.75rem" },
  size2XL: { fontSize: "4.5rem" },
});

/**
 * Renders an icon from the unified icon registry, which merges MUI's icon library with
 * any custom SVGs placed in `src/design-system/svgs/Icon/svg/`.
 *
 * **Usage by name (recommended):**
 * ```tsx
 * <Icon name="Home" />
 * <Icon name="CircleInfo" size="lg" />
 * ```
 *
 * **Usage with a raw component:**
 * ```tsx
 * import { Star } from '@mui/icons-material';
 * <Icon component={Star} size="md" />
 * ```
 *
 * **Static shorthand (all icon names attached as properties):**
 * ```tsx
 * <Icon.Home />
 * <Icon.CircleInfo size="lg" />
 * ```
 *
 * Custom icons in `svg/` override MUI icons of the same name.
 * All MUI `SvgIconProps` (e.g. `color`, `fontSize`, `sx`) are forwarded to the underlying element.
 */
const Icon = forwardRef(function Icon(
  { size = "sm", name, component, className, ...props }: IconProps,
  ref: React.Ref<SVGSVGElement>,
) {
  const { classes, cx } = useStyles();
  const sizeClass =
    classes[
      `size${getSvgComponentName(size).replace(/^./, (char) =>
        char.toUpperCase(),
      )}` as keyof typeof classes
    ];

  const IconComponent = (component ??
    (name ? iconRegistry[name] : undefined)) as
    | React.ComponentType<SvgIconProps>
    | undefined;

  if (!IconComponent) {
    console.warn(`Icon: no component or valid name provided (name="${name}")`);
    return null;
  }

  return (
    <IconComponent {...props} className={cx(sizeClass, className)} ref={ref} />
  );
}) as React.ForwardRefExoticComponent<IconProps> & {
  [key in IconName]: React.ElementType;
};

Object.entries(iconRegistry).forEach(([iconName, iconComponent]) => {
  (Icon as unknown as Record<string, unknown>)[iconName] = iconComponent;
});

export default Icon;
