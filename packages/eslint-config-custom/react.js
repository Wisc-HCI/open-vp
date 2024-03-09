const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use a library
 * that utilizes React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/react",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  plugins: ["only-warn"],
  globals: {
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    ".eslintrc.js",
    "**/*.css",
    "vite.config.ts",
  ],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    "react/jsx-sort-props": "off",
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-else-return": "off",
    "unicorn/filename-case": "off",
    "react/jsx-no-leaked-render": "off",
    "react/no-array-index-key": "off",
    "prefer-named-capture-group": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
  },
};
