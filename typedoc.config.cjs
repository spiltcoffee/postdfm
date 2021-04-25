const path = require("path");

module.exports = (projectName) =>
  Object.assign({
    excludePrivate: true,
    theme: "minimal",
    entryPoints: ["src/index.ts"],
    out: path.resolve(__dirname, "docs", projectName)
  });
