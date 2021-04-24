import { readdirSync, readFileSync } from "fs";
import { fileURLToPath } from "url";

import { ASTNode } from "@postdfm/ast";
import { Plugin } from "@postdfm/plugin";
import { Transformer } from "@postdfm/transform";

const transformFixturesPath = new URL(
  "../../../../../__test__/__fixtures__/transform/",
  import.meta.url
);

interface ReferencedPlugin {
  new (): Plugin;
}

describe("transform", () => {
  describe("transform fixtures", () => {
    const fixtures = readdirSync(transformFixturesPath);
    fixtures.forEach((fixture) => {
      test(`${fixture}`, async () => {
        const fixturePath = new URL(`./${fixture}/`, transformFixturesPath);

        const cisAst = JSON.parse(
          readFileSync(new URL("./cis.json", fixturePath), "utf-8")
        ) as ASTNode;

        const transAst = JSON.parse(
          readFileSync(new URL("./trans.json", fixturePath), "utf-8")
        ) as ASTNode;

        const plugins = [
          new (<{ default: ReferencedPlugin }>(
            await import(fileURLToPath(new URL("./plugin.js", fixturePath)))
          )).default(),
        ];

        const transformer = new Transformer(plugins);

        transformer.transform(cisAst);

        expect(cisAst).toEqual(transAst);
      });
    });
  });
});
