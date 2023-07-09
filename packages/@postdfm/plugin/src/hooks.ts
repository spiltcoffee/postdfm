import * as AST from "@postdfm/ast";
import { MultiHook, SyncHook } from "tapable";

const AFTER_PREFIX = "after:";
export class Hooks {
  [AST.ASTType.String]: SyncHook<AST.StringValue>;
  [AST.ASTType.ControlString]: SyncHook<AST.ControlString>;
  [AST.ASTType.LiteralString]: SyncHook<AST.LiteralString>;
  [AST.ASTType.BinaryString]: SyncHook<AST.BinaryStringValue>;
  [AST.ASTType.Integer]: SyncHook<AST.IntegerValue>;
  [AST.ASTType.HexCode]: SyncHook<AST.HexCodeValue>;
  [AST.ASTType.Double]: SyncHook<AST.DoubleValue>;
  [AST.ASTType.Single]: SyncHook<AST.SingleValue>;
  [AST.ASTType.Currency]: SyncHook<AST.CurrencyValue>;
  [AST.ASTType.DateTime]: SyncHook<AST.DateTimeValue>;
  [AST.ASTType.Boolean]: SyncHook<AST.BooleanValue>;
  [AST.ASTType.Identifier]: SyncHook<AST.IdentifierValue>;
  [AST.ASTType.Item]: SyncHook<AST.Item>;
  [AST.ASTType.VariantList]: SyncHook<AST.VariantList>;
  [AST.ASTType.BinaryStringList]: SyncHook<AST.BinaryStringList>;
  [AST.ASTType.IdentifierList]: SyncHook<AST.IdentifierList>;
  [AST.ASTType.ItemList]: SyncHook<AST.ItemList>;
  [AST.ASTType.Property]: SyncHook<AST.Property>;
  [AST.ASTType.Object]: SyncHook<AST.DObject>;
  [AST.ASTType.Root]: SyncHook<AST.Root>;
  after: {
    [AST.ASTType.String]: SyncHook<AST.StringValue>;
    [AST.ASTType.Item]: SyncHook<AST.Item>;
    [AST.ASTType.VariantList]: SyncHook<AST.VariantList>;
    [AST.ASTType.BinaryStringList]: SyncHook<AST.BinaryStringList>;
    [AST.ASTType.IdentifierList]: SyncHook<AST.IdentifierList>;
    [AST.ASTType.ItemList]: SyncHook<AST.ItemList>;
    [AST.ASTType.Property]: SyncHook<AST.Property>;
    [AST.ASTType.Object]: SyncHook<AST.DObject>;
    [AST.ASTType.Root]: SyncHook<AST.Root>;
  };
  all: MultiHook<AST.ASTNode>;

  constructor() {
    this[AST.ASTType.String] = new SyncHook(["ast"], AST.ASTType.String);

    this[AST.ASTType.ControlString] = new SyncHook(
      ["ast"],
      AST.ASTType.ControlString,
    );

    this[AST.ASTType.LiteralString] = new SyncHook(
      ["ast"],
      AST.ASTType.LiteralString,
    );

    this[AST.ASTType.BinaryString] = new SyncHook(
      ["ast"],
      AST.ASTType.BinaryString,
    );

    this[AST.ASTType.Integer] = new SyncHook(["ast"], AST.ASTType.Integer);

    this[AST.ASTType.HexCode] = new SyncHook(["ast"], AST.ASTType.HexCode);

    this[AST.ASTType.Double] = new SyncHook(["ast"], AST.ASTType.Double);

    this[AST.ASTType.Single] = new SyncHook(["ast"], AST.ASTType.Single);

    this[AST.ASTType.Currency] = new SyncHook(["ast"], AST.ASTType.Currency);

    this[AST.ASTType.DateTime] = new SyncHook(["ast"], AST.ASTType.DateTime);

    this[AST.ASTType.Boolean] = new SyncHook(["ast"], AST.ASTType.Boolean);

    this[AST.ASTType.Identifier] = new SyncHook(
      ["ast"],
      AST.ASTType.Identifier,
    );

    this[AST.ASTType.Item] = new SyncHook(["ast"], AST.ASTType.Item);

    this[AST.ASTType.VariantList] = new SyncHook(
      ["ast"],
      AST.ASTType.VariantList,
    );

    this[AST.ASTType.BinaryStringList] = new SyncHook(
      ["ast"],
      AST.ASTType.BinaryStringList,
    );

    this[AST.ASTType.IdentifierList] = new SyncHook(
      ["ast"],
      AST.ASTType.IdentifierList,
    );

    this[AST.ASTType.ItemList] = new SyncHook(["ast"], AST.ASTType.ItemList);

    this[AST.ASTType.Property] = new SyncHook(["ast"], AST.ASTType.Property);

    this[AST.ASTType.Object] = new SyncHook(["ast"], AST.ASTType.Object);

    this[AST.ASTType.Root] = new SyncHook(["ast"], AST.ASTType.Root);

    this.after = {
      [AST.ASTType.String]: new SyncHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.String,
      ),

      [AST.ASTType.Item]: new SyncHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.Item,
      ),

      [AST.ASTType.VariantList]: new SyncHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.VariantList,
      ),

      [AST.ASTType.BinaryStringList]: new SyncHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.BinaryStringList,
      ),

      [AST.ASTType.IdentifierList]: new SyncHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.IdentifierList,
      ),

      [AST.ASTType.ItemList]: new SyncHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.ItemList,
      ),

      [AST.ASTType.Property]: new SyncHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.Property,
      ),

      [AST.ASTType.Object]: new SyncHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.Object,
      ),

      [AST.ASTType.Root]: new SyncHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.Root,
      ),
    };

    this.all = new MultiHook([
      ...Object.values(AST.ASTType).map((astType) => this[astType]),
      ...Object.values(this.after),
    ]);
  }
}
