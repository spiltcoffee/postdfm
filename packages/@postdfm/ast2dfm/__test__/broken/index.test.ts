import * as AST from "@postdfm/ast";
import * as fs from "fs";
import * as path from "path";
import stringify from "../../src";

describe("dfm2ast", () => {
  test("broken AST throws error", () => {
    const ast = JSON.parse(
      fs.readFileSync(path.join(__dirname, "ast.json"), "utf8")
    ) as AST.Root;

    expect(() => stringify(ast)).toThrow("Cannot stringify astType unknown");
  });
});
