const path = require("path");

module.exports = (projectName) => ({
  excludePrivate: true,
  theme: "default",
  entryPoints: ["src/index.ts"],
  gitRevision: "main",
  out: path.resolve(__dirname, "docs", projectName),
});
