import * as AST from "@postdfm/ast";
import * as fs from "fs";
import * as path from "path";
import * as ast2dfm from "../../src";

describe("dfm2ast", () => {
  test("broken AST throws error", () => {
    const ast = JSON.parse(
      fs.readFileSync(path.join(__dirname, "ast.json"), "utf8")
    ) as AST.Root;

    expect(() => ast2dfm.stringify(ast)).toThrowError(
      "Cannot stringify astType unknown"
    );
  });
});
