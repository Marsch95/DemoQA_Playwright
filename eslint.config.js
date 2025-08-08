// ESLint v9+ flat config for TypeScript and Playwright
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['playwright-report/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        HTMLElement: 'readonly',
        getComputedStyle: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      // Playwright best practice: disallow test.only
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.object.name='test'][callee.property.name='only']",
          message: 'Do not commit test.only. Remove before pushing.',
        },
      ],
    },
  },
];
