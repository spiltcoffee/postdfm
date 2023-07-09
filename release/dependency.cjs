const path = require("path");
const fs = require("fs");

async function prepare(pluginConfig, { nextRelease: { version }, logger }) {
  for (const pkg of pluginConfig.pkgs) {
    const pkgJsonPath = path.join(pkg.location, "package.json");

    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath));

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
        {},
      );
    }

    if (!found) {
      logger.log(`${pkg.name}: No dependencies to update`);
    }

    await fs.writeFileSync(
      pkgJsonPath,
      JSON.stringify(pkgJson, null, 2) + "\n",
    );
  }
}

module.exports = { prepare };
