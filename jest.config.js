module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  coverageReporters: ['lcov'],
  collectCoverageFrom: [
    './src/*.{ts,js}',
    '!./src/index.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};
