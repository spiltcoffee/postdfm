export enum ASTType {
  String = "string",
  HexString = "hexString",
  Integer = "integer",
  Double = "double",
  Boolean = "boolean",
  Qualified = "qualified",
  Item = "item",
  StringList = "stringList",
  QualifiedList = "qualifiedList",
  ItemList = "itemList",
  Property = "property",
  Object = "object"
}

class ASTNode {
  astType: ASTType
  constructor(astType: ASTType) {
    this.astType = astType;
  }
}

class Value<T> extends ASTNode {
  value: T;
  constructor(astType: ASTType, value: T) {
    super(astType);
    this.value = value;
  }
}

export class StringValue extends Value<string> {
  constructor(value: string) {
    super(ASTType.String, value);
  }
}

export class HexStringValue extends Value<string> {
  constructor(value: string) {
    super(ASTType.HexString, value);
  }
}

export class IntegerValue extends Value<number> {
  constructor(value: number) {
    super(ASTType.Integer, value);
  }
}

export class DoubleValue extends Value<number> {
  constructor(value: number) {
    super(ASTType.Double, value);
  }
}

export class BooleanValue extends Value<boolean> {
  constructor(value: boolean) {
    super(ASTType.Boolean, value);
  }
}

export class QualifiedValue extends Value<string> {
  constructor(value: string) {
    super(ASTType.Qualified, value);
  }
}

export class Item extends ASTNode {
  properties: Property[];

  constructor(properties: Property[]) {
    super(ASTType.Item);
    this.properties = properties;
  }
}

class List<T> extends ASTNode {
  values: T[]

  constructor(astType: ASTType, values: T[]) {
    super(astType);
    this.values = values;
  }
}

export class QualifiedList extends List<QualifiedValue> {
  constructor(values: QualifiedValue[]) {
    super(ASTType.QualifiedList, values);
  }
}

export class StringList extends List<StringValue> {
  constructor(values: StringValue[]) {
    super(ASTType.StringList, values);
  }
}

export class ItemList extends List<Item> {
  constructor(values: Item[]) {
    super(ASTType.ItemList, values);
  }
}

export class Property extends ASTNode {
  name: string;
  value: Value<any> | List<any>

  constructor(name: string, value: Value<any> | List<any>) {
    super(ASTType.Property);
    this.name = name;
    this.value = value;
  }
}

export enum ObjectKind {
  Object = "object",
  Inline = "inline",
  Inherited = "inherited"
}

export class FormObject extends ASTNode {
  kind: ObjectKind;
  name: string;
  type: string;
  order: number;
  properties: Property[];
  children: FormObject[];

  constructor(kind: ObjectKind, name: string, type: string, order: number, properties?: Property[], children?: FormObject[]) {
    super(ASTType.Object);
    this.kind = kind;
    this.name = name;
    this.type = type;

    if (order) {
      this.order = order;
    }

    if (properties) {
      this.properties = properties;
    }

    if (children) {
      this.children = children;
    }
  }
}