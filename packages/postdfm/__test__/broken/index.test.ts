import * as fs from "fs";
import * as path from "path";
import postdfm from "../../src";

describe("postdfm", () => {
  describe("broken DFMs throw errors", () => {
    describe("unexpected end", () => {
      const file = path.join(__dirname, "unexpectedEnd.dfm");
      const dfm = fs.readFileSync(file, "ascii");

      test("without `from`", () => {
        expect(() => postdfm().processSync(dfm)).toThrow(
          /Unexpected End Of Input/
        );
      });

      test("with `from`", () => {
        expect(() => postdfm().processSync(dfm, { from: file })).toThrow(
          /unexpectedEnd.dfm: Unexpected End Of Input/
        );
      });
    });

    describe("invalid property", () => {
      const file = path.join(__dirname, "invalidProperty.dfm");
      const dfm = fs.readFileSync(file, "ascii");

      test("without `from`", () => {
        expect(() => postdfm().processSync(dfm)).toThrow(
          /Syntax error at line 3 col 1/
        );
      });

      test("with `from`", () => {
        expect(() => postdfm().processSync(dfm, { from: file })).toThrow(
          /invalidProperty.dfm: Syntax error at line 3 col 1/
        );
      });
    });
  });
});
