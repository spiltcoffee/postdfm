const { spawnSync } = require("child_process");

async function prepare() {
  // ought to be safe to let the install update the yarn.lock,
  //   so all the workspace references change correctly
  spawnSync("yarn", ["install", "--no-immutable", "--mode=skip-build"]);
}

module.exports = { prepare };
