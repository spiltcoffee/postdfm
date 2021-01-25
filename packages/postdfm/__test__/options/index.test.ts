import { stringify } from "@postdfm/ast2dfm";
import { parse } from "@postdfm/dfm2ast";
import * as path from "path";
import postdfm, { RunnerOptions } from "../../src";
import { Plugin } from "@postdfm/plugin";

class NoopPlugin extends Plugin {
  install(): void {
    // do nothing
  }
}

describe("postdfm", () => {
  describe("options", () => {
    test("valid (normal)", () => {
      const parser = parse;
      const stringifier = stringify;
      const plugins: Array<Plugin | typeof Plugin> = [
        NoopPlugin,
        new NoopPlugin(),
      ];

      expect(() => postdfm()).not.toThrow();
      expect(() => postdfm({})).not.toThrow();
      expect(() => postdfm({ parser })).not.toThrow();
      expect(() => postdfm({ stringifier })).not.toThrow();
      expect(() => postdfm({ plugins })).not.toThrow();
      expect(() => postdfm({ parser, stringifier })).not.toThrow();
      expect(() => postdfm({ parser, plugins })).not.toThrow();
      expect(() => postdfm({ stringifier, plugins })).not.toThrow();
      expect(() => postdfm({ parser, stringifier, plugins })).not.toThrow();
    });

    test("valid (using strings)", () => {
      const parser = "@postdfm/dfm2ast";
      const stringifier = "@postdfm/ast2dfm";
      const plugins = [path.join(__dirname, "plugin.js")];

      expect(() => postdfm({ parser })).not.toThrow();
      expect(() => postdfm({ stringifier })).not.toThrow();
      expect(() => postdfm({ plugins })).not.toThrow();
      expect(() => postdfm({ parser, stringifier })).not.toThrow();
      expect(() => postdfm({ parser, plugins })).not.toThrow();
      expect(() => postdfm({ stringifier, plugins })).not.toThrow();
      expect(() => postdfm({ parser, stringifier, plugins })).not.toThrow();
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
