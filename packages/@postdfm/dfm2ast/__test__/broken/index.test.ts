import * as fs from "fs";
import * as path from "path";
import * as dfm2ast from "../../src";

describe("dfm2ast", () => {
  test("broken DFM throws error", () => {
    const dfm = fs.readFileSync(path.join(__dirname, "form.dfm"), "ascii");

    expect(() => dfm2ast.parse(dfm)).toThrowError("Unexpected End Of Input");
  });
});
