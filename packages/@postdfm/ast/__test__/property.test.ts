import * as AST from "@postdfm/ast";

describe("creating Properties", () => {
  test("Property with Value", () => {
    const valueNode = new AST.StringValue([
      new AST.LiteralString("sans-serif"),
    ]);
    const node = new AST.Property("Font.Name", valueNode);

    expect(node.name).toBe("Font.Name");
    expect(node.value).toEqual(valueNode);
  });

  test("Property with List", () => {
    const listNode = new AST.VariantList([
      new AST.StringValue([new AST.LiteralString("Verdana")]),
      new AST.StringValue([new AST.LiteralString("sans-serif")]),
    ]);
    const node = new AST.Property("Font.Name", listNode);

    expect(node.name).toBe("Font.Name");
    expect(node.value).toEqual(listNode);
  });
});
