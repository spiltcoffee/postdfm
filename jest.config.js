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
  coverageReporters: ["json", "text"],
  coverageDirectory: "coverage-results",
  roots: ["packages/"]
};
