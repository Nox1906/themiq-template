export type ColorVariant = {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
  "0"?: string;
  "100"?: string;
  "300"?: string;
  "600"?: string;
  "700"?: string;
  "900"?: string;
};

export type ThemeSpecPalette = {
  primary: ColorVariant;
  secondary: ColorVariant;
  success: ColorVariant;
  warning: ColorVariant;
  error: ColorVariant;
  neutral: ColorVariant;
  "neutral-dark": {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  disabled: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  common: {
    black: string;
    white: string;
  };
  background: {
    default: string;
  };
};
