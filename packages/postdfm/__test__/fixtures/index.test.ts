import * as fs from "fs";
import * as path from "path";
import postdfm from "../../src";

const rootFixturesDir = path.resolve("__test__", "__fixtures__");
const parseFixturesDir = path.join(rootFixturesDir, "parse");
const transformFixturesDir = path.join(rootFixturesDir, "transform");

describe("postdfm", () => {
  describe("parse fixtures", () => {
    const runner = postdfm({
      transformers: [ast => ast]
    });

    const fixtures = fs.readdirSync(parseFixturesDir);
    fixtures.forEach(fixture => {
      const cisForm = fs.readFileSync(
        path.join(parseFixturesDir, fixture, "form.dfm"),
        "ascii"
      );

      describe(fixture, () => {
        test("sync", () => {
          expect(runner.processSync(cisForm)).toEqual(cisForm);
        });

        test("async", () => {
          return runner
            .process(cisForm)
            .then(dfm => expect(dfm).toEqual(cisForm));
        });
      });
    });
  });

  describe("transform fixtures", () => {
    const fixtures = fs.readdirSync(transformFixturesDir);
    fixtures.forEach(fixture => {
      const fixtureDir = path.join(transformFixturesDir, fixture);
      const cisForm = fs.readFileSync(
        path.join(fixtureDir, "cis.dfm"),
        "ascii"
      );
      const transForm = fs.readFileSync(
        path.join(fixtureDir, "trans.dfm"),
        "ascii"
      );
      const transformers = [require(path.join(fixtureDir, "transformer.js"))];

      const runner = postdfm({ transformers });

      describe(fixture, () => {
        test("sync", () => {
          expect(runner.processSync(cisForm)).toEqual(transForm);
        });

        test("async", () => {
          return runner
            .process(cisForm)
            .then(dfm => expect(dfm).toEqual(transForm));
        });
      });
    });
  });
});
