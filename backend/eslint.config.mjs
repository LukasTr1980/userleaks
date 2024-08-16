import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node, // Assuming you're working in a Node.js environment
      parser: tsParser, // Use the TypeScript parser
      parserOptions: {
        ecmaVersion: "latest", // Use the latest ECMAScript standard
        sourceType: "module",  // Enable ES Modules syntax (import/export)
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    extends: [
      "eslint:recommended", // Use recommended ESLint rules
      "plugin:@typescript-eslint/recommended", // Use recommended TypeScript rules
    ],
    rules: {
      // You can add custom rules here if needed
    },
  },
];
