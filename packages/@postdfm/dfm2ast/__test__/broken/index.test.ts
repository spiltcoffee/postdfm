import { readFileSync } from "fs";
import { parse } from "@postdfm/dfm2ast";

describe("dfm2ast", () => {
  test("broken DFM throws error", () => {
    const dfm = readFileSync(new URL("./form.dfm", import.meta.url), "ascii");

    expect(() => parse(dfm)).toThrow("Unexpected End Of Input");
  });
});
