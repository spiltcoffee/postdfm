import { stringify } from "@postdfm/ast2dfm";
import { parse } from "@postdfm/dfm2ast";
import * as path from "path";
import postdfm, { RunnerOptions, Transformer } from "../../src";
import { Root } from "@postdfm/ast";

function noopTransformer(ast: Root): Root {
  return ast;
}

describe("postdfm", () => {
  describe("options", () => {
    test("valid (normal)", () => {
      const parser = parse;
      const stringifier = stringify;
      const transformers: Transformer[] = [noopTransformer];

      expect(() => postdfm()).not.toThrow();
      expect(() => postdfm()).not.toThrow();
      expect(() => postdfm({ parser })).not.toThrow();
      expect(() => postdfm({ stringifier })).not.toThrow();
      expect(() => postdfm({ transformers })).not.toThrow();
      expect(() => postdfm({ parser, stringifier })).not.toThrow();
      expect(() => postdfm({ parser, transformers })).not.toThrow();
      expect(() => postdfm({ stringifier, transformers })).not.toThrow();
      expect(() =>
        postdfm({ parser, stringifier, transformers })
      ).not.toThrow();
    });

    test("valid (using strings)", () => {
      const parser = "@postdfm/dfm2ast";
      const stringifier = "@postdfm/ast2dfm";
      const transformers = [path.join(__dirname, "transformer.js")];

      expect(() => postdfm({ parser })).not.toThrow();
      expect(() => postdfm({ stringifier })).not.toThrow();
      expect(() => postdfm({ transformers })).not.toThrow();
      expect(() => postdfm({ parser, stringifier })).not.toThrow();
      expect(() => postdfm({ parser, transformers })).not.toThrow();
      expect(() => postdfm({ stringifier, transformers })).not.toThrow();
      expect(() =>
        postdfm({ parser, stringifier, transformers })
      ).not.toThrow();
    });

    test("invalid", () => {
      const parser = true;
      const stringifier = 5;
      const transformer1 = {};
      const transformer2 = [5];

      expect(() => postdfm(({ parser } as unknown) as RunnerOptions)).toThrow(
        /parser must be a string or a function/
      );
      expect(() =>
        postdfm(({ stringifier } as unknown) as RunnerOptions)
      ).toThrow(/stringifier must be a string or a function/);
      expect(() =>
        postdfm(({ transformers: transformer1 } as unknown) as RunnerOptions)
      ).toThrow(/transformers must be an array of strings and\/or functions/);
      expect(() =>
        postdfm(({ transformers: transformer2 } as unknown) as RunnerOptions)
      ).toThrow(/transformers must be an array of strings and\/or functions/);
    });
  });
});
