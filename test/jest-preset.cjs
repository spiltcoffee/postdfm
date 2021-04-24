const path = require("path");

module.exports = (projectName) => ({
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true
    }
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  resolver: path.resolve(__dirname, "resolver.cjs"),
  collectCoverage: true,
  collectCoverageFrom: ["**/dist/**/*.js", "!**/node_modules/**"],
  coverageReporters: [
    [
      "lcovonly",
      { file: "coverage.info", projectRoot: path.resolve(__dirname, "..") }
    ],
    "text"
  ],
  coverageDirectory: "results/lcov",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        usePathForSuiteName: "true",
        classNameTemplate: "[{classname}]",
        titleTemplate: "{title}",
        outputName: "./report.xml",
        outputDirectory: "results/jest"
      }
    ]
  ]
});
