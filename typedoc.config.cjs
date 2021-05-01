const path = require("path");

module.exports = (projectName) =>
  Object.assign({
    excludePrivate: true,
    theme: "default",
    entryPoints: ["src/index.ts"],
    out: path.resolve(__dirname, "docs", projectName)
  });
