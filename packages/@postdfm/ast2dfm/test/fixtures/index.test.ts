import { readdirSync, readFileSync } from "fs";

import { Root } from "@postdfm/ast";
import { stringify } from "@postdfm/ast2dfm";

const parseFixturesPath = new URL(
  "../../../../../test/fixtures/parse/",
  import.meta.url
);

describe("dfm2ast", () => {
  describe("parse fixtures", () => {
    const fixtures = readdirSync(parseFixturesPath);
    fixtures.forEach((fixture) => {
      const fixturePath = new URL(`./${fixture}/`, parseFixturesPath);

      test(`${fixture}`, () => {
        expect(
          stringify(
            JSON.parse(
              readFileSync(new URL("./ast.json", fixturePath), "utf8")
            ) as Root
          )
        ).toEqual(readFileSync(new URL("./form.dfm", fixturePath), "ascii"));
      });
    });
  });
});
