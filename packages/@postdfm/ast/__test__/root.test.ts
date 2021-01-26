import * as AST from "../src";

describe("creating FormObjects", () => {
  test("empty Root", () => {
    const node = new AST.Root();

    expect(node.child).toBeUndefined();
  });

  test("empty FormObject", () => {
    const objectNode = new AST.DObject(
      AST.ObjectKind.Inherited,
      "MyForm",
      "TMyForm"
    );

    const node = new AST.Root(objectNode);

    expect(node.child).toBeDefined();
    expect(node.child?.kind).toBe(AST.ObjectKind.Inherited);
  });
});
