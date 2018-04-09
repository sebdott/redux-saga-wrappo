module.exports = {
  rootDir: '../',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  globals: {
    NODE_ENV: 'test',
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
  ],
  moduleDirectories: [
    'node_modules',
    'src',
    './',
  ],
  moduleNameMapper: {
    '^addOnActionTypeNaming': '<rootDir>/src/addOnActionTypeNaming',
    '^appCreator': '<rootDir>/src/appCreator.js',
    '^connect': '<rootDir>/src/connect',
    '^generateReducers': '<rootDir>/src/generateReducers',
    '^generateSagas': '<rootDir>/src/generateSagas',
    '^getComponents': '<rootDir>/src/getComponents',
    '^validation': '<rootDir>/src/utils/validation',
    '^registerAllComponent': '<rootDir>/src/registerAllComponent',
    '^.+\\.(css|scss)$': '<rootDir>/test/__setup__/styleMock.js',
    '^(.+\\.(jpe?g|png|gif|ttf|eot|svg|md)|bootstrap.*)$': '<rootDir>/test/__setup__/fileMock.js',
    '^(expose|bundle)': '<rootDir>/test/__setup__/moduleMock.js',
  },
  setupFiles: [
    '<rootDir>/test/__setup__/shim.js',
    '<rootDir>/test/__setup__/index.js',
  ],
  setupTestFrameworkScriptFile: 'jest-enzyme/lib/index.js',
  testEnvironment: 'jest-environment-jsdom-global',
  testRegex: '/test/.*?\\.(test|spec)\\.js$',
  testURL: 'http://localhost:3000',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|my-project|redux-persist|lodash)/)',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 65,
  //     functions: 65,
  //     lines: 65,
  //     statements: 65,
  //   },
  // },
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   'src/**/*.{js,jsx}',
  // ],
  verbose: true,
};
