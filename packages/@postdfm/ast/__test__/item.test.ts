import * as AST from "../src";

describe("creating Items", () => {
  test("empty Item", () => {
    const node = new AST.Item();

    expect(node.properties).toHaveLength(0);
  });

  test("Item", () => {
    const propertyNode = new AST.Property(
      "Font.Name",
      new AST.StringValue("sans-serif")
    );
    const node = new AST.Item([propertyNode]);

    expect(node.properties).toContainEqual(propertyNode);
  });
});
