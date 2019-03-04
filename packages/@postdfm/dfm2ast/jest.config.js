module.exports = {
  "reporters": [
    "default",
    [
      "jest-junit",
      {
        suiteNameTemplate: "{filename}",
        classNameTemplate: "{classname}",
        titleTemplate: "{title}"
      }
    ]
  ],
};
