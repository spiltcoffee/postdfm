const dfm2ast = require("../dist");
const fs = require("fs");

describe("DFM to AST", () => {
  test("converted AST matches expected AST", () => {
    const dfm = fs.readFileSync("test/sample.dfm", "ascii");
    const expectedAst = JSON.parse(fs.readFileSync("test/expected.json", "utf8"));
    expect(dfm2ast.parse(dfm)).toEqual(expectedAst);
  });
});