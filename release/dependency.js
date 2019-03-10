const readPkg = require("read-pkg");
const writePkg = require("write-pkg");

async function prepare(pluginConfig, context) {
  for (const pkg of pluginConfig.pkgs) {
    const pkgJson = await readPkg({ cwd: pkg.location, normalize: false });

    if (pkgJson.dependencies) {
      pkgJson.dependencies = Object.entries(pkgJson.dependencies).reduce(
        (dependencies, [depName, depVersion]) => {
          dependencies[depName] = pluginConfig.pkgs.some(
            ({ name }) => name === depName
          )
            ? `^${context.nextRelease.version}`
            : depVersion;

          return dependencies;
        },
        {}
      );
    }

    await writePkg(pkg.location, pkgJson, { normalize: false });
  }
}

module.exports = { prepare };
