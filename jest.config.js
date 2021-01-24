module.exports = {
  reporters: [
    "default",
    [
      "jest-junit",
      {
        usePathForSuiteName: "true",
        classNameTemplate: "[{classname}]",
        titleTemplate: "{title}",
        outputDirectory: "test-results/jest",
        outputName: "./report.xml",
      },
    ],
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.ts",
    "!**/node_modules/**",
    "!**/dist/**",
    "!packages/@postdfm/dfm2ast/src/grammar.ts",
  ],
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "coverage",
  rootDir: "./",
};
