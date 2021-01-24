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

      postdfm();
      postdfm({ parser });
      postdfm({ stringifier });
      postdfm({ transformers });
      postdfm({ parser, stringifier });
      postdfm({ parser, transformers });
      postdfm({ stringifier, transformers });
      postdfm({ parser, stringifier, transformers });
    });

    test("valid (using strings)", () => {
      const parser = "@postdfm/dfm2ast";
      const stringifier = "@postdfm/ast2dfm";
      const transformers = [path.join(__dirname, "transformer.js")];

      postdfm();
      postdfm({ parser });
      postdfm({ stringifier });
      postdfm({ transformers });
      postdfm({ parser, stringifier });
      postdfm({ parser, transformers });
      postdfm({ stringifier, transformers });
      postdfm({ parser, stringifier, transformers });
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
