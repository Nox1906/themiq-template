import { SvgIcon, type SvgIconProps } from "@mui/material";
import camelCase from "lodash.camelcase";
import upperFirst from "lodash.upperfirst";
import { forwardRef } from "react";

import { isValidURL } from "../../../../validations";

/**
 * @deprecated
 * This component was the rendering engine for the old `Icon` component, which received a
 * `svgIcons` map of custom SVG files and resolved icons by name at runtime.
 *
 * It is **no longer used** — `Icon` was refactored to use `@mui/icons-material` directly
 * combined with a custom `iconRegistry` (see `iconUtils.ts`).
 *
 * Safe to delete unless you intend to use it as a standalone generic SVG resolver outside
 * of the `Icon` component.
 */

const getSvgComponentName = (name?: string) =>
  name ? upperFirst(camelCase(name)) : "";

type WrappedSvgProps = {
  /** Caller-provided map of PascalCase icon name → SVG component. */
  svgIcons: Record<string, React.ElementType>;
  /** Icon name (kebab-case or PascalCase) to look up in `svgIcons`. */
  name?: string;
  /** Fallback icon name used when `name` is not found in `svgIcons`. */
  defaultIcon?: string;
  /** Raw SVG component — takes precedence over `name` and `defaultIcon`. */
  svgComponent?: React.ElementType;
} & SvgIconProps;

const WrappedSvg = forwardRef<SVGSVGElement, WrappedSvgProps>(
  function WrappedSvg(
    { svgIcons, svgComponent, name, defaultIcon, ...rest },
    ref,
  ) {
    const SvgComponent =
      svgComponent ||
      svgIcons[getSvgComponentName(name)] ||
      svgIcons[getSvgComponentName(defaultIcon)];

    if (!SvgComponent) {
      const isLinkIcon = isValidURL(name || "");

      if (!isLinkIcon) {
        console.warn(`unable to render icon for name:"${name}"`);

        return <svg ref={ref} {...rest} />;
      }

      const url = name as string;

      return (
        <svg ref={ref} {...rest}>
          <image href={url} height="100%" />
        </svg>
      );
    }

    return <SvgComponent ref={ref} {...rest} />;
  },
);

type SvgProps = { component?: React.ElementType } & Omit<
  WrappedSvgProps,
  "svgComponent"
>;

const Svg = forwardRef(function Icon(
  { className, classes, component, svgIcons, defaultIcon, ...rest }: SvgProps,
  ref: React.Ref<SVGSVGElement>,
) {
  return (
    <SvgIcon
      defaultIcon={defaultIcon}
      svgIcons={svgIcons}
      className={className}
      classes={classes}
      component={WrappedSvg}
      svgComponent={component}
      ref={ref}
      {...rest}
    />
  );
});

export default Svg;
