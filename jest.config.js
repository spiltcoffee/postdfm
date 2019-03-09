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
        outputName: "./report.xml"
      }
    ]
  ],
  collectCoverageFrom: [
    "<rootDir>/packages/**/*.js",
    "!**/coverage/**",
    "!**/node_modules/**"
  ],
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "coverage",
  rootDir: "./"
};
