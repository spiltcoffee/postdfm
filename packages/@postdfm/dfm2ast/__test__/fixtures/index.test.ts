import * as fs from "fs";
import * as path from "path";
import * as dfm2ast from "../../src";

const rootFixturesDir = path.join("__test__", "__fixtures__");
const parseFixturesDir = path.join(rootFixturesDir, "parse");

describe("dfm2ast", () => {
  describe("fixtures", () => {
    const fixtures = fs.readdirSync(parseFixturesDir);
    fixtures.forEach(fixture => {
      const formFile = path.join(parseFixturesDir, fixture, "form.dfm");
      const astFile = path.join(parseFixturesDir, fixture, "ast.json");

      test(fixture, () => {
        expect(
          JSON.parse(
            JSON.stringify(dfm2ast.parse(fs.readFileSync(formFile, "ascii")))
          )
        ).toEqual(JSON.parse(fs.readFileSync(astFile, "utf8")));
      });
    });
  });
});
