import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-themes",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  viteFinal: async (config) => {
    // Add SVGR support
    if (config.plugins) {
      const { default: svgr } = await import("vite-plugin-svgr");
      config.plugins.push(
        svgr({
          include: "**/*.svg?react",
        }),
      );
    }
    return config;
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        if (prop.parent) {
          return !/node_modules/.test(prop.parent.fileName);
        }
        return true;
      },
    },
  },
};

export default config;
