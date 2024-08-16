import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,  // Use the TypeScript parser for all files
      parserOptions: {
        ecmaVersion: "latest",  // Use the latest ECMAScript standard
        sourceType: "module",   // Enable ES Modules syntax (import/export)
        ecmaFeatures: {
          jsx: true,  // Enable JSX parsing
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react": pluginReact,
    },
    extends: [
      pluginJs.configs.recommended,         // Base ESLint rules
      "plugin:@typescript-eslint/recommended",  // TypeScript-specific rules
      "plugin:react/recommended",           // React-specific rules
    ],
    rules: {
      "react/react-in-jsx-scope": "off",    // Next.js doesn't require React in scope
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],  // Ignore unused variables starting with "_"
      // Add or customize additional rules as needed
    },
  },
];
