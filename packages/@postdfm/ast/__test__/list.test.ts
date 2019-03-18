import * as AST from "../src";

describe("creating Lists", () => {
  test("empty StringList", () => {
    const node = new AST.StringList();

    expect(node.values).toHaveLength(0);
  });
  test("StringList", () => {
    const node = new AST.StringList([
      new AST.StringValue("hello"),
      new AST.StringValue("world")
    ]);

    expect(node.values).toContainEqual(new AST.StringValue("world"));
  });
  test("empty QualifiedList", () => {
    const node = new AST.IdentifierList();

    expect(node.values).toHaveLength(0);
  });
  test("QualifiedList", () => {
    const node = new AST.IdentifierList([
      new AST.IdentifierValue("enHello"),
      new AST.IdentifierValue("enWorld")
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
      new AST.Property("Font.Name", new AST.StringValue("sans-serif"))
    ]);
    const node = new AST.ItemList([itemNode1, itemNode2]);

    expect(node.values).toContainEqual(itemNode2);
  });
});
