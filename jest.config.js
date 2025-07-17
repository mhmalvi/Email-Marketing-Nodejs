module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true,
  setupFiles: ['<rootDir>/tests/jest.setup.js'],
  // globalSetup: '<rootDir>/tests/setup.js',
  // globalTeardown: '<rootDir>/tests/teardown.js',
  testTimeout: 30000,
  forceExit: true,
  clearMocks: true,
};