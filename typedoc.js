const path = require("path");

module.exports = options =>
  Object.assign(
    {
      excludePrivate: true,
      theme: "minimal"
    },
    options,
    {
      out: path.resolve(__dirname, "docs", options.out)
    }
  );
