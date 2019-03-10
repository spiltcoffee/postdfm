import * as AST from "../src";

describe("creating Properties", () => {
  test("Property with Value", () => {
    const valueNode = new AST.StringValue("sans-serif");
    const node = new AST.Property("Font.Name", valueNode);

    expect(node.name).toBe("Font.Name");
    expect(node.value).toEqual(valueNode);
  });

  test("Property with List", () => {
    const listNode = new AST.StringList([
      new AST.StringValue("Verdana"),
      new AST.StringValue("sans-serif")
    ]);
    const node = new AST.Property("Font.Name", listNode);

    expect(node.name).toBe("Font.Name");
    expect(node.value).toEqual(listNode);
  });
});
