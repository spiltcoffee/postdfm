import * as AST from "@postdfm/ast";

describe("creating Lists", () => {
  test("empty VariantList", () => {
    const node = new AST.VariantList();

    expect(node.values).toHaveLength(0);
  });

  test("VariantList", () => {
    const node = new AST.VariantList([
      new AST.StringValue([new AST.LiteralString("hello")]),
      new AST.IntegerValue(255),
      new AST.BooleanValue(true),
      new AST.StringValue([new AST.LiteralString("world")]),
    ]);

    expect(node.values).toContainEqual(
      new AST.StringValue([new AST.LiteralString("world")])
    );

    expect(node.values).toContainEqual(new AST.IntegerValue(255));

    expect(node.values).toContainEqual(new AST.BooleanValue(true));
  });

  test("empty BinaryStringList", () => {
    const node = new AST.BinaryStringList();

    expect(node.values).toHaveLength(0);
  });

  test("BinaryStringList", () => {
    const node = new AST.BinaryStringList([
      new AST.BinaryStringValue("BADA55"),
      new AST.BinaryStringValue("C0FFEE"),
    ]);

    expect(node.values).toContainEqual(new AST.BinaryStringValue("C0FFEE"));
  });

  test("empty QualifiedList", () => {
    const node = new AST.IdentifierList();

    expect(node.values).toHaveLength(0);
  });

  test("QualifiedList", () => {
    const node = new AST.IdentifierList([
      new AST.IdentifierValue("enHello"),
      new AST.IdentifierValue("enWorld"),
    ]);

    expect(node.values).toContainEqual(new AST.IdentifierValue("enWorld"));
  });

  test("empty ItemList", () => {
    const node = new AST.ItemList();

    expect(node.values).toHaveLength(0);
  });

  test("ItemList", () => {
    const itemNode1 = new AST.Item();
    const itemNode2 = new AST.Item([
      new AST.Property(
        "Font.Name",
        new AST.StringValue([new AST.LiteralString("sans-serif")])
      ),
    ]);
    const node = new AST.ItemList([itemNode1, itemNode2]);

    expect(node.values).toContainEqual(itemNode2);
  });
});
