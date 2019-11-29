require('dotenv').config();

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  moduleDirectories: ['node_modules', 'src', 'types'],
  moduleNameMapper: {
    'src/(.*)$': '<rootDir>/src/$1',
    'users/(.*)$': '<rootDir>/src/users/$1',
    'utilities/(.*)$': '<rootDir>/src/utilities/$1',
    'customMiddleware/(.*)$': '<rootDir>/src/middleware/$1',
    'customTypes/(.*)$': '<rootDir>/src/types/$1',
  },
};
