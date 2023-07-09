import { readFileSync } from "fs";

import { postdfmSync } from "postdfm";

describe("postdfm", () => {
  describe("broken DFMs throw errors", () => {
    describe("unexpected end", () => {
      const file = new URL("./unexpectedEnd.dfm", import.meta.url);
      const dfm = readFileSync(file, "ascii");

      test("without `from`", () => {
        expect(() => postdfmSync().processSync(dfm)).toThrow(
          /Unexpected End Of Input/,
        );
      });

      test("with `from`", () => {
        expect(() =>
          postdfmSync().processSync(dfm, { from: file.toString() }),
        ).toThrow(/unexpectedEnd.dfm: Unexpected End Of Input/);
      });
    });

    describe("invalid property", () => {
      const file = new URL("./invalidProperty.dfm", import.meta.url);
      const dfm = readFileSync(file, "ascii");

      test("without `from`", () => {
        expect(() => postdfmSync().processSync(dfm)).toThrow(
          /Syntax error at line 3 col 1/,
        );
      });

      test("with `from`", () => {
        expect(() =>
          postdfmSync().processSync(dfm, { from: file.toString() }),
        ).toThrow(/invalidProperty.dfm: Syntax error at line 3 col 1/);
      });
    });
  });
});
