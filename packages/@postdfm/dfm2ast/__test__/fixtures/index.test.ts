import { readdirSync, readFileSync } from "fs";

import { ASTNode } from "@postdfm/ast";
import { parse } from "@postdfm/dfm2ast";

const parseFixturesPath = new URL(
  "../../../../../__test__/__fixtures__/parse/",
  import.meta.url
);

describe("dfm2ast", () => {
  describe("parse fixtures", () => {
    const fixtures = readdirSync(parseFixturesPath);
    fixtures.forEach((fixture) => {
      const fixturePath = new URL(`./${fixture}/`, parseFixturesPath);
      const formFile = readFileSync(
        new URL("./form.dfm", fixturePath),
        "ascii"
      );
      const astJson = JSON.parse(
        readFileSync(new URL("./ast.json", fixturePath), "utf-8")
      ) as ASTNode;

      test(`${fixture}`, () => {
        expect(JSON.parse(JSON.stringify(parse(formFile)))).toEqual(astJson);
      });
    });
  });
});
