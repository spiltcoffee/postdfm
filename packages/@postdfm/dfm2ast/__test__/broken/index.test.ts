import fs from "fs";
import { fileURLToPath } from "url";
import parse from "../../src";

describe("dfm2ast", () => {
  test("broken DFM throws error", () => {
    const dfm = fs.readFileSync(
      fileURLToPath(new URL("./form.dfm", import.meta.url)),
      "ascii"
    );

    expect(() => parse(dfm)).toThrow("Unexpected End Of Input");
  });
});
