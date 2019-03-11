import * as fs from "fs";
import * as path from "path";
import * as dfm2ast from "../../src";

describe("dfm2ast", () => {
  test("converted AST matches expected AST", () => {
    const dfm = fs.readFileSync(path.join(__dirname, "form.dfm"), "ascii");

    const received = JSON.parse(JSON.stringify(dfm2ast.parse(dfm)));
    const expected = JSON.parse(
      fs.readFileSync(path.join(__dirname, "ast.json"), "utf8")
    );

    expect(received).toEqual(expected);
  });
});
