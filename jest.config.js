module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true,
  setupFiles: ['dotenv/config'],
  globalSetup: './tests/setup.js',
  globalTeardown: './tests/teardown.js',
};