import fs from "fs";
import { ASTNode } from "@postdfm/ast";
import parse from "../../src";

const parseFixturesPath = new URL(
  "../../../../../__test__/__fixtures__/parse/",
  import.meta.url
);

describe("dfm2ast", () => {
  describe("parse fixtures", () => {
    const fixtures = fs.readdirSync(parseFixturesPath);
    fixtures.forEach((fixture) => {
      const fixturePath = new URL(`./${fixture}/`, parseFixturesPath);
      const formFile = fs.readFileSync(
        new URL("./form.dfm", fixturePath),
        "ascii"
      );
      const astJson = JSON.parse(
        fs.readFileSync(new URL("./ast.json", fixturePath), "utf-8")
      ) as ASTNode;

      test(`${fixture}`, () => {
        expect(JSON.parse(JSON.stringify(parse(formFile)))).toEqual(astJson);
      });
    });
  });
});
