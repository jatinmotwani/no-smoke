const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier/flat');

const DOMAIN_MESSAGE =
  'src/domain is pure TypeScript: import only from src/domain (and date-fns). No React, React Native, Expo, or app code.';

module.exports = defineConfig([
  globalIgnores(['dist/*', 'coverage/*', '.expo/*', 'expo-env.d.ts', 'android/*', 'ios/*']),
  expoConfig,
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    settings: {
      // Resolve the `@/` path alias so import rules see real file paths.
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
        node: true,
      },
    },
  },
  {
    // SPEC §0.5: domain logic has no React/Expo imports.
    files: ['src/domain/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            // Anything that isn't a relative import or date-fns.
            { regex: '^(?!\\.{1,2}/|date-fns(/|$))', message: DOMAIN_MESSAGE },
          ],
        },
      ],
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/domain',
              from: './src',
              except: ['./domain'],
              message: DOMAIN_MESSAGE,
            },
            { target: './src/domain', from: './app', message: DOMAIN_MESSAGE },
            { target: './src/domain', from: './scripts', message: DOMAIN_MESSAGE },
          ],
        },
      ],
    },
  },
]);
