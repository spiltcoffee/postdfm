import * as fs from "fs";
import * as path from "path";
import * as dfm2ast from "../src";

describe("dfm2ast", () => {
  test("converted AST matches expected AST", () => {
    const dfm = fs.readFileSync(path.join(__dirname, "sample.dfm"), "ascii");

    const expectedAst = JSON.parse(
      fs.readFileSync(path.join(__dirname, "expected.json"), "utf8")
    );

    expect(dfm2ast.parse(dfm)).toEqual(expectedAst);
  });
});
