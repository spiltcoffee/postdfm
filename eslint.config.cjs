module.exports = function getConfig(enableTypeChecking) {
  return {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    settings: {
      node: {
        allowModules: [
          "postdfm",
          "@postdfm/ast",
          "@postdfm/ast2dfm",
          "@postdfm/dfm2ast",
          "@postdfm/plugin",
          "@postdfm/transform"
        ],
        tryExtensions: [".js", ".cjs", ".ts", ".json", ".node"]
      }
    },
    parserOptions: {
      extraFileExtensions: [".cjs"],
      project: "./tsconfig.json"
    },
    extends: [
      "eslint:recommended",
      "plugin:node/recommended",
      "plugin:jest/recommended",
      "prettier"
    ],
    overrides: [
      {
        files: ["*.ts"],
        extends: [
          "eslint:recommended",
          "plugin:node/recommended",
          "plugin:jest/recommended",
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
          enableTypeChecking &&
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
          "prettier"
        ].filter((v) => !!v),
        rules: {
          "node/no-unsupported-features/es-syntax": [
            "error",
            {
              ignores: ["modules", "dynamicImport"]
            }
          ]
        }
      }
    ]
  };
};
