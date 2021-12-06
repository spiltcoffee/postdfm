const path = require("path");
const { spawnSync } = require("child_process");

const pkgs = spawnSync("yarn", ["workspaces", "list", "--json"], {
  shell: true,
  encoding: "utf-8",
})
  .stdout.split(/[\r\n]+/)
  .filter(Boolean)
  .map(JSON.parse)
  .filter(({ location }) => location !== ".");

const tarballDir = path.resolve(__dirname, "dist");

module.exports = {
  branches: ["main", { name: "beta", prerelease: true }],
  repositoryUrl: "ssh://git@github.com/spiltcoffee/postdfm.git",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["./release/dependency.cjs", { pkgs }],
    ...pkgs.map(({ location: pkgRoot }) => [
      "@semantic-release/npm",
      {
        pkgRoot,
        tarballDir,
      },
    ]),
    [
      "@semantic-release/github",
      {
        assets: pkgs.map(({ name }) => ({
          path: path.resolve(
            tarballDir,
            `${name.replace("@", "").replace("/", "-")}-*.tgz`
          ),
          label: name,
        })),
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: [
          ["packages/**/package.json", "!**/node_modules/**/package.json"],
        ],
      },
    ],
  ],
};
