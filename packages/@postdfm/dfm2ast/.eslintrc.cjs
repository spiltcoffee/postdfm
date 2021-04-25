const baseConfig = require("../../../eslint.config.cjs")(true);
module.exports = {
  ...baseConfig,
  ignorePatterns: ["src/grammar.ts"]
};
