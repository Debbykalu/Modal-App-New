module.exports = {
    // Specify the root directory for Jest to search for test files
    roots: ['<rootDir>/src'],
  
    // Transform files before running tests
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Assuming you're using Babel for transforms
    },
  
    // Include files matching the specified patterns for tests
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  
    // Module file extensions for importing modules
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  };
   