/** @type {import('jest').Config} */
module.exports = {
  projects: [
    {
      // Pure TypeScript: domain logic, data layer, scripts. No React Native environment.
      displayName: 'node',
      preset: 'jest-expo/node',
      testMatch: [
        '<rootDir>/src/{domain,data,i18n}/**/*.test.ts',
        '<rootDir>/scripts/**/*.test.ts',
      ],
    },
    {
      // Screens and components, rendered with React Native mocks as on Android.
      displayName: 'app',
      preset: 'jest-expo/android',
      testMatch: ['<rootDir>/__tests__/**/*.test.tsx', '<rootDir>/{app,src}/**/*.test.tsx'],
    },
  ],
  collectCoverageFrom: ['src/domain/**/*.ts', '!src/domain/**/__tests__/**'],
  coverageThreshold: {
    './src/domain/': { branches: 90, functions: 90, lines: 90, statements: 90 },
  },
};
