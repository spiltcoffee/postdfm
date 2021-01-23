import { stringify } from "@postdfm/ast2dfm";
import { parse } from "@postdfm/dfm2ast";
import * as path from "path";
import postdfm, { RunnerOptions } from "../../src";
import { Plugin } from "@postdfm/tapable";

class NoopPlugin extends Plugin {
  install(): void {
    // do nothing
  }
}

describe("postdfm", () => {
  describe("options", () => {
    // eslint-disable-next-line jest/expect-expect
    test("valid (normal)", () => {
      const parser = parse;
      const stringifier = stringify;
      const plugins: Array<Plugin | typeof Plugin> = [
        NoopPlugin,
        new NoopPlugin()
      ];

      postdfm();
      postdfm({ parser });
      postdfm({ stringifier });
      postdfm({ plugins });
      postdfm({ parser, stringifier });
      postdfm({ parser, plugins });
      postdfm({ stringifier, plugins });
      postdfm({ parser, stringifier, plugins });
    });

    // eslint-disable-next-line jest/expect-expect
    test("valid (using strings)", () => {
      const parser = "@postdfm/dfm2ast";
      const stringifier = "@postdfm/ast2dfm";
      const plugins = [path.join(__dirname, "plugin.js")];

      postdfm();
      postdfm({ parser });
      postdfm({ stringifier });
      postdfm({ plugins });
      postdfm({ parser, stringifier });
      postdfm({ parser, plugins });
      postdfm({ stringifier, plugins });
      postdfm({ parser, stringifier, plugins });
    });

    test("invalid", () => {
      const parser = true;
      const stringifier = 5;
      const plugin1 = {};
      const plugin2 = [5];

      expect(() => postdfm(({ parser } as unknown) as RunnerOptions)).toThrow(
        /parser must be a string or a function/
      );
      expect(() =>
        postdfm(({ stringifier } as unknown) as RunnerOptions)
      ).toThrow(/stringifier must be a string or a function/);
      expect(() =>
        postdfm(({ plugins: plugin1 } as unknown) as RunnerOptions)
      ).toThrow(
        /plugins must be an array of strings, functions and\/or objects/
      );
      expect(() =>
        postdfm(({ plugins: plugin2 } as unknown) as RunnerOptions)
      ).toThrow(
        /plugins must be an array of strings, functions and\/or objects/
      );
    });
  });
});
