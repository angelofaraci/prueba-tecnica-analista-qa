const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const stylistic = require('@stylistic/eslint-plugin');

module.exports = defineConfig(
  {
    ignores: ['node_modules/**', 'dist/**', 'screenshots/**'],
  },
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    extends: [...tseslint.configs.recommended],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'always'], //;
      eqeqeq: ['error', 'always'],
    },
  },
);
