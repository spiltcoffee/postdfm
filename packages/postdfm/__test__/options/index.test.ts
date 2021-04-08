import { fileURLToPath } from "url";

import { stringify } from "@postdfm/ast2dfm";
import { parse } from "@postdfm/dfm2ast";
import {
  postdfm,
  postdfmSync,
  RunnerOptions,
  RunnerOptionsSync,
} from "../../src";
import { Plugin } from "@postdfm/plugin";

class NoopPlugin extends Plugin {
  install(): void {
    // do nothing
  }
}

describe("postdfm", () => {
  describe("options", () => {
    test("valid (normal)", async () => {
      const parser = parse;
      const stringifier = stringify;
      const plugins: Array<Plugin | typeof Plugin> = [
        NoopPlugin,
        new NoopPlugin(),
      ];

      await expect(postdfm()).resolves.not.toThrow();
      expect(() => postdfmSync()).not.toThrow();

      await expect(postdfm({})).resolves.not.toThrow();
      expect(() => postdfmSync({})).not.toThrow();

      await expect(postdfm({ parser })).resolves.not.toThrow();
      expect(() => postdfmSync({ parser })).not.toThrow();

      await expect(postdfm({ stringifier })).resolves.not.toThrow();
      expect(() => postdfmSync({ stringifier })).not.toThrow();

      await expect(postdfm({ plugins })).resolves.not.toThrow();
      expect(() => postdfmSync({ plugins })).not.toThrow();

      await expect(postdfm({ parser, stringifier })).resolves.not.toThrow();
      expect(() => postdfmSync({ parser, stringifier })).not.toThrow();

      await expect(postdfm({ parser, plugins })).resolves.not.toThrow();
      expect(() => postdfmSync({ parser, plugins })).not.toThrow();

      await expect(postdfm({ stringifier, plugins })).resolves.not.toThrow();
      expect(() => postdfmSync({ stringifier, plugins })).not.toThrow();

      await expect(
        postdfm({ parser, stringifier, plugins })
      ).resolves.not.toThrow();
      expect(() => postdfmSync({ parser, stringifier, plugins })).not.toThrow();
    });

    test("valid (using strings)", async () => {
      const parser = "@postdfm/dfm2ast";
      const stringifier = "@postdfm/ast2dfm";
      const plugins = [fileURLToPath(new URL("./plugin.js", import.meta.url))];

      await expect(postdfm({ parser })).resolves.not.toThrow();
      await expect(postdfm({ stringifier })).resolves.not.toThrow();
      await expect(postdfm({ plugins })).resolves.not.toThrow();
      await expect(postdfm({ parser, stringifier })).resolves.not.toThrow();
      await expect(postdfm({ parser, plugins })).resolves.not.toThrow();
      await expect(postdfm({ stringifier, plugins })).resolves.not.toThrow();
      await expect(
        postdfm({ parser, stringifier, plugins })
      ).resolves.not.toThrow();
    });

    test("invalid", async () => {
      const parser = true;
      const parserSync = "hello";
      const stringifier = 5;
      const stringifierSync = "world";
      const plugin1 = 5;
      const plugin2 = [5];
      const pluginSync = [NoopPlugin, "hello", "world"];

      await expect(
        postdfm(({ parser } as unknown) as RunnerOptions)
      ).rejects.toThrow(
        /parser must be a function, or \(only if async\) a string/
      );

      expect(() =>
        postdfmSync(({ parser: parserSync } as unknown) as RunnerOptionsSync)
      ).toThrow(/parser must be a function, or \(only if async\) a string/);

      await expect(
        postdfm(({ stringifier } as unknown) as RunnerOptions)
      ).rejects.toThrow(
        /stringifier must be a function, or \(only if async\) a string/
      );

      expect(() =>
        postdfmSync(({
          stringifier: stringifierSync,
        } as unknown) as RunnerOptionsSync)
      ).toThrow(
        /stringifier must be a function, or \(only if async\) a string/
      );

      await expect(
        postdfm(({ plugins: plugin1 } as unknown) as RunnerOptions)
      ).rejects.toThrow(
        /plugins must be an array of functions\/objects, or \(only if async\) strings/
      );

      await expect(
        postdfm(({ plugins: plugin2 } as unknown) as RunnerOptions)
      ).rejects.toThrow(
        /plugins must be an array of functions\/objects, or \(only if async\) strings/
      );

      expect(() =>
        postdfmSync(({ plugins: pluginSync } as unknown) as RunnerOptionsSync)
      ).toThrow(
        /plugins must be an array of functions\/objects, or \(only if async\) strings/
      );
    });
  });
});
