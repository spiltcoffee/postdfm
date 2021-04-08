import fs from "fs";
import { fileURLToPath } from "url";

import { Root } from "@postdfm/ast";
import stringify from "../../src";

describe("dfm2ast", () => {
  test("broken AST throws error", () => {
    const ast = JSON.parse(
      fs.readFileSync(
        fileURLToPath(new URL("./ast.json", import.meta.url)),
        "utf8"
      )
    ) as Root;

    expect(() => stringify(ast)).toThrow("Cannot stringify astType unknown");
  });
});
