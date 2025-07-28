// ESLint v9+ flat config for TypeScript and Playwright
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Remove project reference for compatibility
        // project: './tsconfig.json',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      // Add Playwright best practices or custom rules here
    },
  },
];
