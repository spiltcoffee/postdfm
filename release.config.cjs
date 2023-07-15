const path = require("path");
const { spawnSync } = require("child_process");

// ordered by dependency first, name second
const pkgs = [
  { name: "@postdfm/ast", pkgRoot: "packages/@postdfm/ast" },
  { name: "@postdfm/ast2dfm", pkgRoot: "packages/@postdfm/ast2dfm" },
  { name: "@postdfm/dfm2ast", pkgRoot: "packages/@postdfm/dfm2ast" },
  { name: "@postdfm/plugin", pkgRoot: "packages/@postdfm/plugin" },
  { name: "@postdfm/transform", pkgRoot: "packages/@postdfm/transform" },
  { name: "postdfm", pkgRoot: "packages/postdfm" },
];

const workspaces = spawnSync(
  "yarn",
  ["workspaces", "list", "--json", "--no-private"],
  { shell: true, encoding: "utf-8" },
)
  .stdout.split(/[\r\n]+/)
  .filter(Boolean)
  .map(JSON.parse)
  .map(({ name, location }) => ({ name, pkgRoot: location }));

function isPkgEqual(a) {
  return (b) => a.name === b.name && a.pkgRoot === b.pkgRoot;
}

if (
  !(
    workspaces.every((workspace) => pkgs.some(isPkgEqual(workspace))) &&
    pkgs.every((pkg) => workspaces.some(isPkgEqual(pkg)))
  )
) {
  throw new Error(
    "Mismatch between public workspaces and packages in release configuration!",
  );
}

const tarballDir = path.resolve(__dirname, "dist");

module.exports = {
  branches: ["main", { name: "beta", prerelease: true }],
  repositoryUrl: "ssh://git@github.com/spiltcoffee/postdfm.git",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ...pkgs.flatMap((pkg) => [
      ["./release/dependency.cjs", { pkg, pkgs }],
      ["@semantic-release/npm", { pkgRoot: pkg.pkgRoot, tarballDir }],
    ]),
    "./release/yarnlock.cjs",
    [
      "@semantic-release/github",
      {
        assets: pkgs.map(({ name }) => ({
          path: path.resolve(
            tarballDir,
            `${name.replace("@", "").replace("/", "-")}-*.tgz`,
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
