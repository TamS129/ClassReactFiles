module.exports = {
    testEnvironment: 'jest-environment-jsdom', // Ensure this points to the installed package
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Point to your setup file
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest to transform JS/TS files
    },
    moduleNameMapper: {
      '\\.(css|styl|stylus)$': 'identity-obj-proxy', // Mock CSS modules
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore node_modules and dist folders
  };
  