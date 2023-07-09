import { ASTNode, ASTType } from "@postdfm/ast";
import { Transformer } from "@postdfm/transform";

describe("transform", () => {
  test("broken AST throws error", () => {
    const ast = {
      raws: {},
      astType: "broken",
    } as unknown as ASTNode;

    const transformer = new Transformer([]);

    expect(() => transformer.transform(ast)).toThrow(
      "Cannot generically transform astType broken",
    );
  });

  test("empty AST root does not throw error", () => {
    const ast = {
      raws: {},
      astType: ASTType.Root,
    };

    const transformer = new Transformer([]);

    expect(() => transformer.transform(ast)).not.toThrow();
  });
});
