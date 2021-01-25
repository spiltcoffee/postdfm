import * as AST from "@postdfm/ast";
import { MultiHook, SyncWaterfallHook } from "tapable";

const AFTER_PREFIX = "after:";
export class Hooks {
  [AST.ASTType.String]: SyncWaterfallHook<AST.StringValue>;
  [AST.ASTType.ControlString]: SyncWaterfallHook<AST.ControlString>;
  [AST.ASTType.LiteralString]: SyncWaterfallHook<AST.LiteralString>;
  [AST.ASTType.BinaryString]: SyncWaterfallHook<AST.BinaryStringValue>;
  [AST.ASTType.Integer]: SyncWaterfallHook<AST.IntegerValue>;
  [AST.ASTType.HexCode]: SyncWaterfallHook<AST.HexCodeValue>;
  [AST.ASTType.Double]: SyncWaterfallHook<AST.DoubleValue>;
  [AST.ASTType.Single]: SyncWaterfallHook<AST.SingleValue>;
  [AST.ASTType.Currency]: SyncWaterfallHook<AST.CurrencyValue>;
  [AST.ASTType.DateTime]: SyncWaterfallHook<AST.DateTimeValue>;
  [AST.ASTType.Boolean]: SyncWaterfallHook<AST.BooleanValue>;
  [AST.ASTType.Identifier]: SyncWaterfallHook<AST.IdentifierValue>;
  [AST.ASTType.Item]: SyncWaterfallHook<AST.Item>;
  [AST.ASTType.VariantList]: SyncWaterfallHook<AST.VariantList>;
  [AST.ASTType.BinaryStringList]: SyncWaterfallHook<AST.BinaryStringList>;
  [AST.ASTType.IdentifierList]: SyncWaterfallHook<AST.IdentifierList>;
  [AST.ASTType.ItemList]: SyncWaterfallHook<AST.ItemList>;
  [AST.ASTType.Property]: SyncWaterfallHook<AST.Property>;
  [AST.ASTType.Object]: SyncWaterfallHook<AST.DObject>;
  [AST.ASTType.Root]: SyncWaterfallHook<AST.Root>;
  after: {
    [AST.ASTType.String]: SyncWaterfallHook<AST.StringValue>;
    [AST.ASTType.Item]: SyncWaterfallHook<AST.Item>;
    [AST.ASTType.VariantList]: SyncWaterfallHook<AST.VariantList>;
    [AST.ASTType.BinaryStringList]: SyncWaterfallHook<AST.BinaryStringList>;
    [AST.ASTType.IdentifierList]: SyncWaterfallHook<AST.IdentifierList>;
    [AST.ASTType.ItemList]: SyncWaterfallHook<AST.ItemList>;
    [AST.ASTType.Property]: SyncWaterfallHook<AST.Property>;
    [AST.ASTType.Object]: SyncWaterfallHook<AST.DObject>;
    [AST.ASTType.Root]: SyncWaterfallHook<AST.Root>;
  };
  all: MultiHook<AST.ASTNode>;

  constructor() {
    this[AST.ASTType.String] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.String
    );

    this[AST.ASTType.ControlString] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.ControlString
    );

    this[AST.ASTType.LiteralString] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.LiteralString
    );

    this[AST.ASTType.BinaryString] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.BinaryString
    );

    this[AST.ASTType.Integer] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.Integer
    );

    this[AST.ASTType.HexCode] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.HexCode
    );

    this[AST.ASTType.Double] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.Double
    );

    this[AST.ASTType.Single] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.Single
    );

    this[AST.ASTType.Currency] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.Currency
    );

    this[AST.ASTType.DateTime] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.DateTime
    );

    this[AST.ASTType.Boolean] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.Boolean
    );

    this[AST.ASTType.Identifier] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.Identifier
    );

    this[AST.ASTType.Item] = new SyncWaterfallHook(["ast"], AST.ASTType.Item);

    this[AST.ASTType.VariantList] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.VariantList
    );

    this[AST.ASTType.BinaryStringList] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.BinaryStringList
    );

    this[AST.ASTType.IdentifierList] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.IdentifierList
    );

    this[AST.ASTType.ItemList] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.ItemList
    );

    this[AST.ASTType.Property] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.Property
    );

    this[AST.ASTType.Object] = new SyncWaterfallHook(
      ["ast"],
      AST.ASTType.Object
    );

    this[AST.ASTType.Root] = new SyncWaterfallHook(["ast"], AST.ASTType.Root);

    this.after = {
      [AST.ASTType.String]: new SyncWaterfallHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.String
      ),

      [AST.ASTType.Item]: new SyncWaterfallHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.Item
      ),

      [AST.ASTType.VariantList]: new SyncWaterfallHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.VariantList
      ),

      [AST.ASTType.BinaryStringList]: new SyncWaterfallHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.BinaryStringList
      ),

      [AST.ASTType.IdentifierList]: new SyncWaterfallHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.IdentifierList
      ),

      [AST.ASTType.ItemList]: new SyncWaterfallHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.ItemList
      ),

      [AST.ASTType.Property]: new SyncWaterfallHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.Property
      ),

      [AST.ASTType.Object]: new SyncWaterfallHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.Object
      ),

      [AST.ASTType.Root]: new SyncWaterfallHook(
        ["ast"],
        AFTER_PREFIX + AST.ASTType.Root
      ),
    };

    this.all = new MultiHook([
      ...Object.values(AST.ASTType).map((astType) => this[astType]),
      ...Object.values(this.after),
    ]);
  }
}
