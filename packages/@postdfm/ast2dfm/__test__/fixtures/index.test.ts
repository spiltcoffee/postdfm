import * as AST from "@postdfm/ast";
import * as fs from "fs";
import * as path from "path";
import * as ast2dfm from "../../src";

const rootFixturesDir = path.join("__test__", "__fixtures__");
const parseFixturesDir = path.join(rootFixturesDir, "parse");

describe("dfm2ast", () => {
  describe("fixtures", () => {
    const fixtures = fs.readdirSync(parseFixturesDir);
    fixtures.forEach(fixture => {
      const astFile = path.join(parseFixturesDir, fixture, "ast.json");
      const formFile = path.join(parseFixturesDir, fixture, "form.dfm");

      test(fixture, () => {
        expect(
          ast2dfm.stringify(JSON.parse(
            fs.readFileSync(astFile, "utf8")
          ) as AST.Root)
        ).toEqual(fs.readFileSync(formFile, "ascii"));
      });
    });
  });
});
