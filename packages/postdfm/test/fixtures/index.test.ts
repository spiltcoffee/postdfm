import { readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";

import { Plugin } from "@postdfm/plugin";
import { postdfm, postdfmSync } from "postdfm";

const parseFixturesPath = new URL(
  "../../../../test/fixtures/parse/",
  import.meta.url,
);

const transformFixturesPath = new URL(
  "../../../../test/fixtures/transform/",
  import.meta.url,
);

class NoopPlugin extends Plugin {
  install(): void {
    // do nothing
  }
}

describe("postdfm", () => {
  describe("parse fixtures", () => {
    const fixtures = readdirSync(parseFixturesPath);
    fixtures.forEach((fixture) => {
      const fixturePath = new URL(`./${fixture}/`, parseFixturesPath);
      const cisForm = readFileSync(new URL("./form.dfm", fixturePath), "ascii");

      describe(`${fixture}`, () => {
        test("sync", () => {
          const runner = postdfmSync({ plugins: [NoopPlugin] });

          const dfm = runner.processSync(cisForm);

          expect(dfm).toEqual(cisForm);
        });

        test("async", async () => {
          const runner = await postdfm({ plugins: [NoopPlugin] });

          const dfm = await runner.process(cisForm);

          expect(dfm).toEqual(cisForm);
        });
      });
    });
  });

  describe("transform fixtures", () => {
    const fixtures = readdirSync(transformFixturesPath);
    fixtures.forEach((fixture) => {
      const fixturePath = new URL(`./${fixture}/`, transformFixturesPath);
      const cisForm = readFileSync(new URL("./cis.dfm", fixturePath), "ascii");
      const transForm = readFileSync(
        new URL("./trans.dfm", fixturePath),
        "ascii",
      );

      const pluginFile = fileURLToPath(new URL("./plugin.js", fixturePath));

      describe(`${fixture}`, () => {
        test("sync", async () => {
          const plugins = [
            (<{ default: Plugin }>await import(pluginFile)).default,
          ];

          const runner = postdfmSync({ plugins });

          const dfm = runner.processSync(cisForm);

          expect(dfm).toEqual(transForm);
        });

        test("async", async () => {
          const plugins = [pluginFile];

          const runner = await postdfm({ plugins });

          const dfm = await runner.process(cisForm);

          expect(dfm).toEqual(transForm);
        });
      });
    });
  });
});
