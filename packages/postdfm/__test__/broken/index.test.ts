import fs from "fs";
import { fileURLToPath } from "url";
import { postdfmSync } from "../../src";

describe("postdfm", () => {
  describe("broken DFMs throw errors", () => {
    describe("unexpected end", () => {
      const file = fileURLToPath(
        new URL("./unexpectedEnd.dfm", import.meta.url)
      );
      const dfm = fs.readFileSync(file, "ascii");

      test("without `from`", () => {
        expect(() => postdfmSync().processSync(dfm)).toThrow(
          /Unexpected End Of Input/
        );
      });

      test("with `from`", () => {
        expect(() => postdfmSync().processSync(dfm, { from: file })).toThrow(
          /unexpectedEnd.dfm: Unexpected End Of Input/
        );
      });
    });

    describe("invalid property", () => {
      const file = fileURLToPath(
        new URL("./invalidProperty.dfm", import.meta.url)
      );
      const dfm = fs.readFileSync(file, "ascii");

      test("without `from`", () => {
        expect(() => postdfmSync().processSync(dfm)).toThrow(
          /Syntax error at line 3 col 1/
        );
      });

      test("with `from`", () => {
        expect(() => postdfmSync().processSync(dfm, { from: file })).toThrow(
          /invalidProperty.dfm: Syntax error at line 3 col 1/
        );
      });
    });
  });
});
