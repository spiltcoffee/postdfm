import * as AST from "@postdfm/ast";
import { Plugin, Hooks } from "@postdfm/plugin";

export class Transformer {
  hooks: Hooks;
  parents: AST.ASTNode[];

  constructor(plugins: Plugin[]) {
    this.hooks = new Hooks();
    plugins.forEach((plugin) => plugin.install(this.hooks));
  }

  transform(ast: AST.ASTNode): void {
    switch (ast.astType) {
      case AST.ASTType.String:
        this.transformString(ast as AST.StringValue);
        break;
      case AST.ASTType.ControlString:
        this.transformControlString(ast as AST.ControlString);
        break;
      case AST.ASTType.LiteralString:
        this.transformLiteralString(ast as AST.LiteralString);
        break;
      case AST.ASTType.Integer:
        this.transformInteger(ast as AST.IntegerValue);
        break;
      case AST.ASTType.HexCode:
        this.transformHexCode(ast as AST.HexCodeValue);
        break;
      case AST.ASTType.Double:
        this.transformDouble(ast as AST.DoubleValue);
        break;
      case AST.ASTType.Single:
        this.transformSingle(ast as AST.SingleValue);
        break;
      case AST.ASTType.Currency:
        this.transformCurrency(ast as AST.CurrencyValue);
        break;
      case AST.ASTType.DateTime:
        this.transformDateTime(ast as AST.DateTimeValue);
        break;
      case AST.ASTType.Boolean:
        this.transformBoolean(ast as AST.BooleanValue);
        break;
      case AST.ASTType.Identifier:
        this.transformIdentifier(ast as AST.IdentifierValue);
        break;
      case AST.ASTType.VariantList:
        this.transformVariantList(ast as AST.VariantList);
        break;
      case AST.ASTType.BinaryStringList:
        this.transformBinaryStringList(ast as AST.BinaryStringList);
        break;
      case AST.ASTType.IdentifierList:
        this.transformIdentifierList(ast as AST.IdentifierList);
        break;
      case AST.ASTType.ItemList:
        this.transformItemList(ast as AST.ItemList);
        break;
      case AST.ASTType.Root:
        this.transformRoot(ast as AST.Root);
        break;
      default:
        throw Error(`Cannot generically transform astType ${ast.astType}`);
    }
  }

  private transformString(ast: AST.StringValue): void {
    this.hooks[AST.ASTType.String].call(ast);
    ast.value.forEach((str) => this.transform(str));
    this.hooks.after[AST.ASTType.String].call(ast);
  }

  private transformControlString(ast: AST.ControlString): void {
    this.hooks[AST.ASTType.ControlString].call(ast);
  }

  private transformLiteralString(ast: AST.LiteralString): void {
    this.hooks[AST.ASTType.LiteralString].call(ast);
  }

  private transformBinaryString(ast: AST.BinaryStringValue): void {
    this.hooks[AST.ASTType.BinaryString].call(ast);
  }

  private transformInteger(ast: AST.IntegerValue): void {
    this.hooks[AST.ASTType.Integer].call(ast);
  }

  private transformHexCode(ast: AST.HexCodeValue): void {
    this.hooks[AST.ASTType.HexCode].call(ast);
  }

  private transformDouble(ast: AST.DoubleValue): void {
    this.hooks[AST.ASTType.Double].call(ast);
  }

  private transformSingle(ast: AST.SingleValue): void {
    this.hooks[AST.ASTType.Single].call(ast);
  }

  private transformCurrency(ast: AST.CurrencyValue): void {
    this.hooks[AST.ASTType.Currency].call(ast);
  }

  private transformDateTime(ast: AST.DateTimeValue): void {
    this.hooks[AST.ASTType.DateTime].call(ast);
  }

  private transformBoolean(ast: AST.BooleanValue): void {
    this.hooks[AST.ASTType.Boolean].call(ast);
  }

  private transformIdentifier(ast: AST.IdentifierValue): void {
    this.hooks[AST.ASTType.Identifier].call(ast);
  }

  private transformItem(ast: AST.Item): void {
    this.hooks[AST.ASTType.Item].call(ast);
    ast.properties.forEach((property) => this.transformProperty(property));
    this.hooks.after[AST.ASTType.Item].call(ast);
  }

  private transformVariantList(ast: AST.VariantList): void {
    this.hooks[AST.ASTType.VariantList].call(ast);
    ast.values.forEach((variant) => this.transform(variant));
    this.hooks.after[AST.ASTType.VariantList].call(ast);
  }

  private transformBinaryStringList(ast: AST.BinaryStringList): void {
    this.hooks[AST.ASTType.BinaryStringList].call(ast);
    ast.values.forEach((binaryString) =>
      this.transformBinaryString(binaryString),
    );
    this.hooks.after[AST.ASTType.BinaryStringList].call(ast);
  }

  private transformIdentifierList(ast: AST.IdentifierList): void {
    this.hooks[AST.ASTType.IdentifierList].call(ast);
    ast.values.forEach((identifier) => this.transformIdentifier(identifier));
    this.hooks.after[AST.ASTType.IdentifierList].call(ast);
  }

  private transformItemList(ast: AST.ItemList): void {
    this.hooks[AST.ASTType.ItemList].call(ast);
    ast.values.forEach((item) => this.transformItem(item));
    this.hooks.after[AST.ASTType.ItemList].call(ast);
  }

  private transformProperty(ast: AST.Property): void {
    this.hooks[AST.ASTType.Property].call(ast);
    this.transform(ast.value);
    this.hooks.after[AST.ASTType.Property].call(ast);
  }

  private transformObject(ast: AST.DObject): void {
    this.hooks[AST.ASTType.Object].call(ast);
    ast.properties.forEach((property) => this.transformProperty(property));
    ast.children.forEach((child) => this.transformObject(child));
    this.hooks.after[AST.ASTType.Object].call(ast);
  }

  private transformRoot(ast: AST.Root): void {
    this.hooks[AST.ASTType.Root].call(ast);
    if (ast.child) {
      this.transformObject(ast.child);
    }
    this.hooks.after[AST.ASTType.Root].call(ast);
  }
}
