import * as AST from "../src";

describe("creating Values", () => {
  test("StringValue", () => {
    const node = new AST.StringValue("hello world");
    expect(node.value).toBe("hello world");
  });

  test("HexStringValue", () => {
    const node = new AST.HexStringValue("FFFFFFFF");
    expect(node.value).toBe("FFFFFFFF");
  });

  test("IntegerValue", () => {
    const node = new AST.IntegerValue(1337);
    expect(node.value).toBe(1337);
  });

  test("DoubleValue", () => {
    const node = new AST.DoubleValue(420.69);
    expect(node.value).toBe(420.69);
  });

  test("BooleanValue", () => {
    const node = new AST.BooleanValue(true);
    expect(node.value).toBe(true);
  });

  test("QualifiedValue", () => {
    const node = new AST.QualifiedValue("Font.Name");
    expect(node.value).toBe("Font.Name");
  });
});
