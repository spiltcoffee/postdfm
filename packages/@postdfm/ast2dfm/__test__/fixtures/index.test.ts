import path from "path";
import { readdirSync, readFileSync } from "fs";

import { Root } from "@postdfm/ast";
import { stringify } from "@postdfm/ast2dfm";

const rootFixturesDir = path.join("__test__", "__fixtures__");
const parseFixturesDir = path.join(rootFixturesDir, "parse");

describe("dfm2ast", () => {
  describe("parse fixtures", () => {
    const fixtures = readdirSync(parseFixturesDir);
    fixtures.forEach((fixture) => {
      const astFile = path.join(parseFixturesDir, fixture, "ast.json");
      const formFile = path.join(parseFixturesDir, fixture, "form.dfm");

      test(`${fixture}`, () => {
        expect(
          stringify(JSON.parse(readFileSync(astFile, "utf8")) as Root)
        ).toEqual(readFileSync(formFile, "ascii"));
      });
    });
  });
});
