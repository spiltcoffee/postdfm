import * as AST from "../src";

describe("creating Values", () => {
  test("empty ControlString", () => {
    const node = new AST.ControlString();
    expect(node.value).toEqual("");
  });

  test("ControlString", () => {
    const node = new AST.ControlString();
    expect(node.value).toEqual("");
  });

  test("empty LiteralString", () => {
    const node = new AST.LiteralString();
    expect(node.value).toEqual("");
  });

  test("LiteralString", () => {
    const node = new AST.LiteralString();
    expect(node.value).toEqual("");
  });

  test("empty StringValue", () => {
    const node = new AST.StringValue();
    expect(node.value).toEqual([]);
  });

  test("StringValue", () => {
    const node = new AST.StringValue([
      new AST.LiteralString("hello"),
      new AST.ControlString("\r\n"),
      new AST.LiteralString("world"),
    ]);
    expect(node.value).toContainEqual(new AST.LiteralString("world"));
  });

  test("empty BinaryStringValue", () => {
    const node = new AST.BinaryStringValue();
    expect(node.value).toBe("");
  });

  test("BinaryStringValue", () => {
    const node = new AST.BinaryStringValue("FFFFFFFF");
    expect(node.value).toBe("FFFFFFFF");
  });

  test("empty HexCodeValue", () => {
    const node = new AST.HexCodeValue();
    expect(node.value).toBe("");
  });

  test("HexCodeValue", () => {
    const node = new AST.HexCodeValue("FFFFFFFF");
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
      integer: "420",
    });

    expect(node.value).toEqual({
      exponent: "1337",
      fraction: "000069",
      integer: "420",
    });
  });

  test("empty SingleValue", () => {
    const node = new AST.SingleValue();

    expect(node.value).toEqual({ integer: "0" });
  });

  test("SingleValue", () => {
    const node = new AST.SingleValue({
      exponent: "1337",
      fraction: "000069",
      integer: "420",
    });

    expect(node.value).toEqual({
      exponent: "1337",
      fraction: "000069",
      integer: "420",
    });
  });

  test("empty CurrencyValue", () => {
    const node = new AST.CurrencyValue();

    expect(node.value).toEqual({ integer: "0" });
  });

  test("CurrencyValue", () => {
    const node = new AST.CurrencyValue({
      exponent: "1337",
      fraction: "000069",
      integer: "420",
    });

    expect(node.value).toEqual({
      exponent: "1337",
      fraction: "000069",
      integer: "420",
    });
  });

  test("empty DateTimeValue", () => {
    const node = new AST.DateTimeValue();

    expect(node.value).toEqual({ integer: "0" });
  });

  test("DateTimeValue", () => {
    const node = new AST.DateTimeValue({
      exponent: "1337",
      fraction: "000069",
      integer: "420",
    });

    expect(node.value).toEqual({
      exponent: "1337",
      fraction: "000069",
      integer: "420",
    });
  });

  test("BooleanValue", () => {
    const node = new AST.BooleanValue(true);
    expect(node.value).toBe(true);
  });

  test("IdentifierValue", () => {
    const node = new AST.IdentifierValue("neIdentifier");
    expect(node.value).toBe("neIdentifier");
  });
});
