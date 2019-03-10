import * as AST from "../src";

describe("creating FormObjects", () => {
  test("empty FormObject", () => {
    const node = new AST.FormObject(
      AST.ObjectKind.Inherited,
      "MyForm",
      "TMyForm"
    );

    expect(node.kind).toBe(AST.ObjectKind.Inherited);
    expect(node.name).toBe("MyForm");
    expect(node.type).toBe("TMyForm");
    expect(node.order).toBeUndefined();
    expect(node.properties).toHaveLength(0);
    expect(node.children).toHaveLength(0);
  });

  test("FormObject with order", () => {
    const node = new AST.FormObject(
      AST.ObjectKind.Inline,
      "MyForm",
      "TMyForm",
      0
    );

    expect(node.kind).toBe(AST.ObjectKind.Inline);
    expect(node.name).toBe("MyForm");
    expect(node.type).toBe("TMyForm");
    expect(node.order).toBe(0);
    expect(node.properties).toHaveLength(0);
    expect(node.children).toHaveLength(0);
  });

  test("FormObject with properties", () => {
    const propertyNode = new AST.Property(
      "Font.Name",
      new AST.StringValue("sans-serif")
    );

    const node = new AST.FormObject(
      AST.ObjectKind.Object,
      "MyForm",
      "TMyForm",
      undefined,
      [propertyNode]
    );

    expect(node.kind).toBe(AST.ObjectKind.Object);
    expect(node.name).toBe("MyForm");
    expect(node.type).toBe("TMyForm");
    expect(node.order).toBeUndefined();
    expect(node.properties).toContainEqual(propertyNode);
    expect(node.children).toHaveLength(0);
  });

  test("FormObject with children", () => {
    const childNode = new AST.FormObject(
      AST.ObjectKind.Object,
      "MyEdit",
      "TEdit"
    );

    const node = new AST.FormObject(
      AST.ObjectKind.Object,
      "MyForm",
      "TMyForm",
      undefined,
      undefined,
      [childNode]
    );

    expect(node.kind).toBe(AST.ObjectKind.Object);
    expect(node.name).toBe("MyForm");
    expect(node.type).toBe("TMyForm");
    expect(node.order).toBeUndefined();
    expect(node.properties).toHaveLength(0);
    expect(node.children).toContainEqual(childNode);
  });

  test("FormObject with a bit of everything", () => {
    const propertyNode = new AST.Property(
      "Font.Name",
      new AST.StringValue("sans-serif")
    );

    const childNode = new AST.FormObject(
      AST.ObjectKind.Object,
      "MyEdit",
      "TEdit"
    );

    const node = new AST.FormObject(
      AST.ObjectKind.Object,
      "MyForm",
      "TMyForm",
      0,
      [propertyNode],
      [childNode]
    );

    expect(node.kind).toBe(AST.ObjectKind.Object);
    expect(node.name).toBe("MyForm");
    expect(node.type).toBe("TMyForm");
    expect(node.order).toBe(0);
    expect(node.properties).toContainEqual(propertyNode);
    expect(node.children).toContainEqual(childNode);
  });
});
