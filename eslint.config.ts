import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js, mjs, cjs, ts, mts, cts, jsx, tsx}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2024,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js, jsx, ts, tsx}"],
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
    settings: {
      react: {
        version: "19.2.4",
      },
    },
  },
  {
    files: ["**/*.json"],
    plugins: { json: json as unknown as Record<string, unknown> },
    language: "json/json",
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
]);
