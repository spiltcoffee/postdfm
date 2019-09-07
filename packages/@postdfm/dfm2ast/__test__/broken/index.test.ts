import * as fs from "fs";
import * as path from "path";
import parse from "../../src";

describe("dfm2ast", () => {
  test("broken DFM throws error", () => {
    const dfm = fs.readFileSync(path.join(__dirname, "form.dfm"), "ascii");

    expect(() => parse(dfm)).toThrow("Unexpected End Of Input");
  });
});
