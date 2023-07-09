import { readFileSync } from "fs";

import { Root } from "@postdfm/ast";
import { stringify } from "@postdfm/ast2dfm";

describe("dfm2ast", () => {
  test("broken AST throws error", () => {
    const ast = JSON.parse(
      readFileSync(new URL("./ast.json", import.meta.url), "utf8"),
    ) as Root;

    expect(() => stringify(ast)).toThrow("Cannot stringify astType unknown");
  });
});
