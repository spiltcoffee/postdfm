import * as AST from "../src";

describe("creating Values", () => {
  test("empty StringValue", () => {
    const node = new AST.StringValue();
    expect(node.value).toBe("");
  });

  test("StringValue", () => {
    const node = new AST.StringValue("hello world");
    expect(node.value).toBe("hello world");
  });

  test("empty HexStringValue", () => {
    const node = new AST.HexStringValue();
    expect(node.value).toBe("");
  });

  test("HexStringValue", () => {
    const node = new AST.HexStringValue("FFFFFFFF");
    expect(node.value).toBe("FFFFFFFF");
  });

  test("empty IntegerValue", () => {
    const node = new AST.IntegerValue();
    expect(node.value).toBe(0);
  });

  test("IntegerValue", () => {
    const node = new AST.IntegerValue(1337);
    expect(node.value).toBe(1337);
  });

  test("empty DoubleValue", () => {
    const node = new AST.DoubleValue();

    expect(node.value).toEqual({ integer: "0" });
  });

  test("DoubleValue", () => {
    const node = new AST.DoubleValue({
      exponent: "1337",
      fraction: "000069",
      integer: "420"
    });

    expect(node.value).toEqual({
      exponent: "1337",
      fraction: "000069",
      integer: "420"
    });
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
