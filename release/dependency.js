const readPkg = require("read-pkg");
const writePkg = require("write-pkg");

async function prepare(pluginConfig, { nextRelease: { version }, logger }) {
  for (const pkg of pluginConfig.pkgs) {
    const pkgJson = await readPkg({ cwd: pkg.location, normalize: false });

    let found = false;

    if (pkgJson.dependencies) {
      pkgJson.dependencies = Object.entries(pkgJson.dependencies).reduce(
        (dependencies, [depName, depVersion]) => {
          if (pluginConfig.pkgs.some(({ name }) => name === depName)) {
            found = true;
            logger.log(`${pkg.name}: Updating ${depName} to ^${version}`);
            dependencies[depName] = `^${version}`;
          } else {
            dependencies[depName] = depVersion;
          }

          return dependencies;
        },
        {}
      );
    }

    if (!found) {
      logger.log(`${pkg.name}: No dependencies to update`);
    }

    await writePkg(pkg.location, pkgJson, { normalize: false });
  }
}

module.exports = { prepare };
