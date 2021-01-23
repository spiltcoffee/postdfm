import * as AST from "@postdfm/ast";
import { AnyList } from "@postdfm/ast/dist/list/anyList";
import { VariantValue } from "@postdfm/ast/dist/value/variantValue";
import { StringValuePart } from "@postdfm/ast/dist/value/stringValuePart";
import { Plugin } from "./plugin";
import * as tapable from "tapable";

type Hooks = {
  [key in AST.ASTType]: tapable.SyncWaterfallHook<AST.ASTNode>;
};

export class Tapable {
  hooks: Hooks;

  constructor(plugins: Plugin[]) {
    this.hooks = Object.values(AST.ASTType).reduce(
      (obj: Partial<Hooks>, astType: AST.ASTType) => {
        return {
          ...obj,
          [astType]: new tapable.SyncWaterfallHook(["node"])
        };
      },
      {}
    ) as Hooks;

    plugins.forEach((plugin) => plugin.install(this));
  }

  process(ast: AST.ASTNode): AST.ASTNode {
    return this.tap(ast);
  }

  private tap(ast: AST.ASTNode): AST.ASTNode {
    switch (ast.astType) {
      case AST.ASTType.String:
        return this.tapString(ast as AST.StringValue);
      case AST.ASTType.ControlString:
        return this.tapControlString(ast as AST.ControlString);
      case AST.ASTType.LiteralString:
        return this.tapLiteralString(ast as AST.LiteralString);
      case AST.ASTType.Integer:
        return this.tapInteger(ast as AST.IntegerValue);
      case AST.ASTType.HexCode:
        return this.tapHexCode(ast as AST.HexCodeValue);
      case AST.ASTType.Double:
        return this.tapDouble(ast as AST.DoubleValue);
      case AST.ASTType.Single:
        return this.tapSingle(ast as AST.SingleValue);
      case AST.ASTType.Currency:
        return this.tapCurrency(ast as AST.CurrencyValue);
      case AST.ASTType.DateTime:
        return this.tapDateTime(ast as AST.DateTimeValue);
      case AST.ASTType.Boolean:
        return this.tapBoolean(ast as AST.BooleanValue);
      case AST.ASTType.Identifier:
        return this.tapIdentifier(ast as AST.IdentifierValue);
      case AST.ASTType.VariantList:
        return this.tapVariantList(ast as AST.VariantList);
      case AST.ASTType.BinaryStringList:
        return this.tapBinaryStringList(ast as AST.BinaryStringList);
      case AST.ASTType.IdentifierList:
        return this.tapIdentifierList(ast as AST.IdentifierList);
      case AST.ASTType.ItemList:
        return this.tapItemList(ast as AST.ItemList);
      case AST.ASTType.Root:
        return this.tapRoot(ast as AST.Root);
      default:
        throw Error(`Cannot generically tap astType ${ast.astType}`);
    }
  }

  private tapString(ast: AST.StringValue): AST.StringValue {
    ast = this.hooks[AST.ASTType.String].call(ast) as AST.StringValue;
    ast.value = ast.value.map((str) => this.tap(str) as StringValuePart);
    return ast;
  }

  private tapControlString(ast: AST.ControlString): AST.ControlString {
    return this.hooks[AST.ASTType.ControlString].call(ast) as AST.ControlString;
  }

  private tapLiteralString(ast: AST.LiteralString): AST.LiteralString {
    return this.hooks[AST.ASTType.LiteralString].call(ast) as AST.LiteralString;
  }

  private tapBinaryString(ast: AST.BinaryStringValue): AST.BinaryStringValue {
    return this.hooks[AST.ASTType.BinaryString].call(
      ast
    ) as AST.BinaryStringValue;
  }

  private tapInteger(ast: AST.IntegerValue): AST.IntegerValue {
    return this.hooks[AST.ASTType.Integer].call(ast) as AST.IntegerValue;
  }

  private tapHexCode(ast: AST.HexCodeValue): AST.HexCodeValue {
    return this.hooks[AST.ASTType.HexCode].call(ast) as AST.HexCodeValue;
  }

  private tapDouble(ast: AST.DoubleValue): AST.DoubleValue {
    return this.hooks[AST.ASTType.Double].call(ast) as AST.DoubleValue;
  }

  private tapSingle(ast: AST.SingleValue): AST.SingleValue {
    return this.hooks[AST.ASTType.Single].call(ast) as AST.SingleValue;
  }

  private tapCurrency(ast: AST.CurrencyValue): AST.CurrencyValue {
    return this.hooks[AST.ASTType.Currency].call(ast) as AST.CurrencyValue;
  }

  private tapDateTime(ast: AST.DateTimeValue): AST.DateTimeValue {
    return this.hooks[AST.ASTType.DateTime].call(ast) as AST.DateTimeValue;
  }

  private tapBoolean(ast: AST.BooleanValue): AST.BooleanValue {
    return this.hooks[AST.ASTType.Boolean].call(ast) as AST.BooleanValue;
  }

  private tapIdentifier(ast: AST.IdentifierValue): AST.IdentifierValue {
    return this.hooks[AST.ASTType.Identifier].call(ast) as AST.IdentifierValue;
  }

  private tapItem(ast: AST.Item): AST.Item {
    ast = this.hooks[AST.ASTType.Item].call(ast) as AST.Item;
    ast.properties = ast.properties.map((property) =>
      this.tapProperty(property)
    );
    return ast;
  }

  private tapVariantList(ast: AST.VariantList): AST.VariantList {
    ast = this.hooks[AST.ASTType.VariantList].call(ast) as AST.VariantList;
    ast.values = ast.values.map((variant) => this.tap(variant) as VariantValue);
    return ast;
  }

  private tapBinaryStringList(ast: AST.BinaryStringList): AST.BinaryStringList {
    ast = this.hooks[AST.ASTType.BinaryString].call(
      ast
    ) as AST.BinaryStringList;
    ast.values = ast.values.map((binaryString) =>
      this.tapBinaryString(binaryString)
    );
    return ast;
  }

  private tapIdentifierList(ast: AST.IdentifierList): AST.IdentifierList {
    ast = this.hooks[AST.ASTType.IdentifierList].call(
      ast
    ) as AST.IdentifierList;
    ast.values = ast.values.map((identifier) => this.tapIdentifier(identifier));
    return ast;
  }

  private tapItemList(ast: AST.ItemList): AST.ItemList {
    ast = this.hooks[AST.ASTType.ItemList].call(ast) as AST.ItemList;
    ast.values = ast.values.map((item) => this.tapItem(item));
    return ast;
  }

  private tapProperty(ast: AST.Property): AST.Property {
    ast = this.hooks[AST.ASTType.Property].call(ast) as AST.Property;
    ast.value = this.tap(ast.value) as VariantValue | AnyList;
    return ast;
  }

  private tapObject(ast: AST.DObject): AST.DObject {
    ast = this.hooks[AST.ASTType.Object].call(ast) as AST.DObject;
    ast.properties = ast.properties.map((property) =>
      this.tapProperty(property)
    );
    ast.children = ast.children.map((child) => this.tapObject(child));
    return ast;
  }

  private tapRoot(ast: AST.Root): AST.Root {
    ast = this.hooks[AST.ASTType.Root].call(ast);
    if (ast.child) {
      ast.child = this.tapObject(ast.child);
    }
    return ast;
  }
}
