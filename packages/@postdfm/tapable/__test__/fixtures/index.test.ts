import * as fs from "fs";
import * as path from "path";
import * as AST from "@postdfm/ast";
import { Tapable, Plugin } from "../../src";

const rootFixturesDir = path.resolve("__test__", "__fixtures__");
const transformFixturesDir = path.join(rootFixturesDir, "transform");

interface ReferencedPlugin {
  new (): Plugin;
}

describe("tapable", () => {
  describe("transform fixtures", () => {
    const fixtures = fs.readdirSync(transformFixturesDir);
    fixtures.forEach((fixture) => {
      const fixtureDir = path.join(transformFixturesDir, fixture);

      const cisAst = JSON.parse(
        fs.readFileSync(path.join(fixtureDir, "cis.json"), "utf-8")
      ) as AST.ASTNode;

      const transAst = JSON.parse(
        fs.readFileSync(path.join(fixtureDir, "trans.json"), "utf-8")
      ) as AST.ASTNode;

      const plugins = [
        new (require(path.join(fixtureDir, "plugin.js")) as ReferencedPlugin)()
      ];

      const tapable = new Tapable(plugins);

      test(`${fixture}`, () => {
        expect(tapable.process(cisAst)).toEqual(transAst);
      });
    });
  });
});
