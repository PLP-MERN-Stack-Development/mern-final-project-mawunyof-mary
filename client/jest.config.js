module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: ['<rootDir>/src/**/*.test.jsx'],
  collectCoverageFrom: [
    'src/**/*.{jsx,js}',
    '!src/index.jsx',
    '!src/reportWebVitals.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
