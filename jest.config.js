// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
export default {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: false,
    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: ["./src/**/*.js"],
    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: ["/node_modules/", "/plugins/parser/", "/tests/"],
    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ["json", "text", "lcov", "clover"],
    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: ["node_modules"],
    // An array of file extensions your modules use
    moduleFileExtensions: ["js", "json", "vue", "node"],
    // A map from regular expressions to module names that allow to stub out resources with a single module
    moduleNameMapper: {
        vue$: "vue/dist/vue.common.js",
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    // The test environment that will be used for testing
    testEnvironment: "node",
    // The glob patterns Jest uses to detect test files
    testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ["/node_modules/"],
    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!three)"]
};
