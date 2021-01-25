import * as AST from "@postdfm/ast";
import { AnyList } from "@postdfm/ast/dist/list/anyList";
import { VariantValue } from "@postdfm/ast/dist/value/variantValue";
import { StringValuePart } from "@postdfm/ast/dist/value/stringValuePart";
import { Plugin, Hooks } from "@postdfm/plugin";

export class Transformer {
  hooks: Hooks;
  parents: AST.ASTNode[];

  constructor(plugins: Plugin[]) {
    this.hooks = new Hooks();
    plugins.forEach((plugin) => plugin.install(this.hooks));
  }

  transform(ast: AST.ASTNode): AST.ASTNode {
    switch (ast.astType) {
      case AST.ASTType.String:
        return this.transformString(ast as AST.StringValue);
      case AST.ASTType.ControlString:
        return this.transformControlString(ast as AST.ControlString);
      case AST.ASTType.LiteralString:
        return this.transformLiteralString(ast as AST.LiteralString);
      case AST.ASTType.Integer:
        return this.transformInteger(ast as AST.IntegerValue);
      case AST.ASTType.HexCode:
        return this.transformHexCode(ast as AST.HexCodeValue);
      case AST.ASTType.Double:
        return this.transformDouble(ast as AST.DoubleValue);
      case AST.ASTType.Single:
        return this.transformSingle(ast as AST.SingleValue);
      case AST.ASTType.Currency:
        return this.transformCurrency(ast as AST.CurrencyValue);
      case AST.ASTType.DateTime:
        return this.transformDateTime(ast as AST.DateTimeValue);
      case AST.ASTType.Boolean:
        return this.transformBoolean(ast as AST.BooleanValue);
      case AST.ASTType.Identifier:
        return this.transformIdentifier(ast as AST.IdentifierValue);
      case AST.ASTType.VariantList:
        return this.transformVariantList(ast as AST.VariantList);
      case AST.ASTType.BinaryStringList:
        return this.transformBinaryStringList(ast as AST.BinaryStringList);
      case AST.ASTType.IdentifierList:
        return this.transformIdentifierList(ast as AST.IdentifierList);
      case AST.ASTType.ItemList:
        return this.transformItemList(ast as AST.ItemList);
      case AST.ASTType.Root:
        return this.transformRoot(ast as AST.Root);
      default:
        throw Error(`Cannot generically transform astType ${ast.astType}`);
    }
  }

  private transformString(ast: AST.StringValue): AST.StringValue {
    ast = this.hooks[AST.ASTType.String].call(ast);
    ast.value = ast.value.map((str) => this.transform(str) as StringValuePart);
    ast = this.hooks.after[AST.ASTType.String].call(ast);
    return ast;
  }

  private transformControlString(ast: AST.ControlString): AST.ControlString {
    return this.hooks[AST.ASTType.ControlString].call(ast);
  }

  private transformLiteralString(ast: AST.LiteralString): AST.LiteralString {
    return this.hooks[AST.ASTType.LiteralString].call(ast);
  }

  private transformBinaryString(
    ast: AST.BinaryStringValue
  ): AST.BinaryStringValue {
    return this.hooks[AST.ASTType.BinaryString].call(ast);
  }

  private transformInteger(ast: AST.IntegerValue): AST.IntegerValue {
    return this.hooks[AST.ASTType.Integer].call(ast);
  }

  private transformHexCode(ast: AST.HexCodeValue): AST.HexCodeValue {
    return this.hooks[AST.ASTType.HexCode].call(ast);
  }

  private transformDouble(ast: AST.DoubleValue): AST.DoubleValue {
    return this.hooks[AST.ASTType.Double].call(ast);
  }

  private transformSingle(ast: AST.SingleValue): AST.SingleValue {
    return this.hooks[AST.ASTType.Single].call(ast);
  }

  private transformCurrency(ast: AST.CurrencyValue): AST.CurrencyValue {
    return this.hooks[AST.ASTType.Currency].call(ast);
  }

  private transformDateTime(ast: AST.DateTimeValue): AST.DateTimeValue {
    return this.hooks[AST.ASTType.DateTime].call(ast);
  }

  private transformBoolean(ast: AST.BooleanValue): AST.BooleanValue {
    return this.hooks[AST.ASTType.Boolean].call(ast);
  }

  private transformIdentifier(ast: AST.IdentifierValue): AST.IdentifierValue {
    return this.hooks[AST.ASTType.Identifier].call(ast);
  }

  private transformItem(ast: AST.Item): AST.Item {
    ast = this.hooks[AST.ASTType.Item].call(ast);
    ast.properties = ast.properties.map((property) =>
      this.transformProperty(property)
    );
    ast = this.hooks.after[AST.ASTType.Item].call(ast);
    return ast;
  }

  private transformVariantList(ast: AST.VariantList): AST.VariantList {
    ast = this.hooks[AST.ASTType.VariantList].call(ast);
    ast.values = ast.values.map(
      (variant) => this.transform(variant) as VariantValue
    );
    ast = this.hooks.after[AST.ASTType.VariantList].call(ast);
    return ast;
  }

  private transformBinaryStringList(
    ast: AST.BinaryStringList
  ): AST.BinaryStringList {
    ast = this.hooks[AST.ASTType.BinaryStringList].call(ast);
    ast.values = ast.values.map((binaryString) =>
      this.transformBinaryString(binaryString)
    );
    ast = this.hooks.after[AST.ASTType.BinaryStringList].call(ast);
    return ast;
  }

  private transformIdentifierList(ast: AST.IdentifierList): AST.IdentifierList {
    ast = this.hooks[AST.ASTType.IdentifierList].call(ast);
    ast.values = ast.values.map((identifier) =>
      this.transformIdentifier(identifier)
    );
    ast = this.hooks.after[AST.ASTType.IdentifierList].call(ast);
    return ast;
  }

  private transformItemList(ast: AST.ItemList): AST.ItemList {
    ast = this.hooks[AST.ASTType.ItemList].call(ast);
    ast.values = ast.values.map((item) => this.transformItem(item));
    ast = this.hooks.after[AST.ASTType.ItemList].call(ast);
    return ast;
  }

  private transformProperty(ast: AST.Property): AST.Property {
    ast = this.hooks[AST.ASTType.Property].call(ast);
    ast.value = this.transform(ast.value) as VariantValue | AnyList;
    ast = this.hooks.after[AST.ASTType.Property].call(ast);
    return ast;
  }

  private transformObject(ast: AST.DObject): AST.DObject {
    ast = this.hooks[AST.ASTType.Object].call(ast);
    ast.properties = ast.properties.map((property) =>
      this.transformProperty(property)
    );
    ast.children = ast.children.map((child) => this.transformObject(child));
    ast = this.hooks.after[AST.ASTType.Object].call(ast);
    return ast;
  }

  private transformRoot(ast: AST.Root): AST.Root {
    ast = this.hooks[AST.ASTType.Root].call(ast);
    if (ast.child) {
      ast.child = this.transformObject(ast.child);
    }
    ast = this.hooks.after[AST.ASTType.Root].call(ast);
    return ast;
  }
}
