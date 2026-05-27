// Core
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';

// Libraries
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      importPlugin.flatConfigs.errors,
    ],
    plugins: {
      perfectionist,
      react,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      // Pin version — eslint-plugin-react "detect" is not compatible with ESLint 10 yet
      react: { version: '19.2' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
        node: true,
      },
    },
    rules: {
      'max-len': [
        'error',
        {
          code: 100,
          comments: 100,
          ignoreUrls: true,
          ignorePattern: '^\\s*import\\s.+\\sfrom\\s.+$',
        },
      ],
      'multiline-ternary': ['error', 'always-multiline'],
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, consistent: true },
          ObjectPattern: { multiline: true, consistent: true },
          ImportDeclaration: { multiline: true, consistent: true },
          ExportDeclaration: { multiline: true, consistent: true },
        },
      ],

      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration',
          message: 'Use named exports instead of default exports.',
        },
      ],

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'no-type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'inline-type-imports',
        },
      ],
      'semi': ['error', 'always'],
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: true,
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-object-types': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],

      // import/order disabled — eslint-plugin-import is not compatible with ESLint 10 APIs yet
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': ['error', { 'prefer-inline': false }],
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/components/ui',
              from: './src/views',
              message: 'UI components must not import from views.',
            },
            {
              target: './src/components/system',
              from: './src/views',
              message: 'System components must not import from views.',
            },
          ],
        },
      ],

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },

  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  // React components: destructured props with 2+ keys must break across lines
  {
    files: ['**/*.tsx'],
    rules: {
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, consistent: true },
          ObjectPattern: { multiline: true, minProperties: 2, consistent: true },
          ImportDeclaration: { multiline: true, minProperties: 4, consistent: true },
          ExportDeclaration: { multiline: true, consistent: true },
        },
      ],
    },
  },

  // Icon components: allow intact SVG path strings; max-len still applies everywhere else
  {
    files: [
      'src/components/icons/**/*.{ts,tsx}',
      'src/assets/icons/**/*.{ts,tsx}',
      '**/*.icon.tsx',
    ],
    rules: {
      'max-len': 'off',
    },
  },
])
