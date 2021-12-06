const enhancedResolve = require("enhanced-resolve");
const resolve = enhancedResolve.create.sync({
  conditionNames: ["import", "node", "default"],
  extensions: [".ts", ".js"],
});

module.exports = function testResolve(request, options) {
  try {
    return resolve(options.basedir, request);
  } catch (err) {
    return options.defaultResolver(request, options);
  }
};
