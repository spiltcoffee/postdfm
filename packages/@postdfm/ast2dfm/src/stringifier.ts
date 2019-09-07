import * as AST from "@postdfm/ast";

export default class Stringifier {
  public stringify(ast: AST.ASTNode): string {
    switch (ast.astType) {
      case AST.ASTType.String:
        return this.printString(ast as AST.StringValue);
      case AST.ASTType.ControlString:
        return this.printControlString(ast as AST.ControlString);
      case AST.ASTType.LiteralString:
        return this.printLiteralString(ast as AST.LiteralString);
      case AST.ASTType.Integer:
        return this.printInteger(ast as AST.IntegerValue);
      case AST.ASTType.HexCode:
        return this.printHexCode(ast as AST.HexCodeValue);
      case AST.ASTType.Double:
        return this.printDouble(ast as AST.DoubleValue);
      case AST.ASTType.Single:
        return this.printSingle(ast as AST.SingleValue);
      case AST.ASTType.Currency:
        return this.printCurrency(ast as AST.CurrencyValue);
      case AST.ASTType.DateTime:
        return this.printDateTime(ast as AST.DateTimeValue);
      case AST.ASTType.Boolean:
        return this.printBoolean(ast as AST.BooleanValue);
      case AST.ASTType.Identifier:
        return this.printIdentifier(ast as AST.IdentifierValue);
      case AST.ASTType.VariantList:
        return this.printVariantList(ast as AST.VariantList);
      case AST.ASTType.BinaryStringList:
        return this.printBinaryStringList(ast as AST.BinaryStringList);
      case AST.ASTType.IdentifierList:
        return this.printIdentifierList(ast as AST.IdentifierList);
      case AST.ASTType.ItemList:
        return this.printItemList(ast as AST.ItemList);
      case AST.ASTType.Root:
        return this.printRoot(ast as AST.Root);
      default:
        throw Error(`Cannot stringify astType ${ast.astType}`);
    }
  }

  private printString(ast: AST.StringValue): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      ast.value.map(str => this.stringify(str)).join(""),
      raws.after
    );
  }

  private printControlString(ast: AST.ControlString): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      "#",
      `${ast.value.charCodeAt(0)}`,
      raws.after
    );
  }

  private printLiteralString(ast: AST.LiteralString): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      "'",
      ast.value.replace(/'/g, "''"),
      "'",
      raws.after
    );
  }

  private printBinaryString(ast: AST.BinaryStringValue): string {
    const raws = this.raws(ast);
    return this.print(raws.before, ast.value, raws.after);
  }

  private printInteger(ast: AST.IntegerValue): string {
    const raws = this.raws(ast);
    return this.print(raws.before, `${ast.value}`, raws.after);
  }

  private printHexCode(ast: AST.HexCodeValue): string {
    const raws = this.raws(ast);
    return this.print(raws.before, "$", ast.value, raws.after);
  }

  private printDouble(ast: AST.DoubleValue): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      ast.value.integer,
      ast.value.fraction ? `.${ast.value.fraction}` : "",
      ast.value.exponent ? `e${ast.value.exponent}` : "",
      raws.after
    );
  }

  private printSingle(ast: AST.SingleValue): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      ast.value.integer,
      ast.value.fraction ? `.${ast.value.fraction}` : "",
      ast.value.exponent ? `e${ast.value.exponent}` : "",
      "s",
      raws.after
    );
  }

  private printCurrency(ast: AST.CurrencyValue): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      ast.value.integer,
      ast.value.fraction ? `.${ast.value.fraction}` : "",
      ast.value.exponent ? `e${ast.value.exponent}` : "",
      "c",
      raws.after
    );
  }

  private printDateTime(ast: AST.DateTimeValue): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      ast.value.integer,
      ast.value.fraction ? `.${ast.value.fraction}` : "",
      ast.value.exponent ? `e${ast.value.exponent}` : "",
      "d",
      raws.after
    );
  }

  private printBoolean(ast: AST.BooleanValue): string {
    const raws = this.raws(ast);
    return this.print(raws.before, ast.value ? "True" : "False", raws.after);
  }

  private printIdentifier(ast: AST.IdentifierValue): string {
    const raws = this.raws(ast);
    return this.print(raws.before, ast.value, raws.after);
  }

  private printItem(ast: AST.Item): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      "item",
      raws.afterItem,
      ast.properties.map(property => this.printProperty(property)).join(""),
      raws.beforeEnd,
      "end",
      raws.after
    );
  }

  private printVariantList(ast: AST.VariantList): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      "(",
      raws.afterOpen,
      ast.values.map(variant => this.stringify(variant)).join(""),
      raws.beforeClose,
      ")",
      raws.after
    );
  }

  private printBinaryStringList(ast: AST.BinaryStringList): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      "{",
      raws.afterOpen,
      ast.values
        .map(binaryString => this.printBinaryString(binaryString))
        .join(""),
      raws.beforeClose,
      "}",
      raws.after
    );
  }

  private printIdentifierList(ast: AST.IdentifierList): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      "[",
      raws.afterOpen,
      ast.values.map(identifier => this.printIdentifier(identifier)).join(","),
      raws.beforeClose,
      "]",
      raws.after
    );
  }

  private printItemList(ast: AST.ItemList): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      "<",
      raws.afterOpen,
      ast.values.map(item => this.printItem(item)).join(""),
      raws.beforeClose,
      ">",
      raws.after
    );
  }

  private printProperty(ast: AST.Property): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      ast.name,
      raws.afterName,
      "=",
      raws.beforeValue,
      this.stringify(ast.value),
      raws.after
    );
  }

  private printObject(ast: AST.DObject): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      ast.kind,
      raws.beforeName,
      ast.name,
      raws.afterName,
      ast.type
        ? this.print(":", raws.beforeType, ast.type, raws.afterType)
        : "",
      ast.order !== undefined
        ? this.print(
            "[",
            raws.beforeOrder,
            `${ast.order}`,
            raws.afterOrder,
            "]"
          )
        : "",
      ast.properties && ast.properties.length
        ? this.print(
            raws.beforeProperties,
            ast.properties
              .map(property => this.printProperty(property))
              .join("")
          )
        : "",
      ast.children && ast.children.length
        ? this.print(
            raws.beforeChildren,
            ast.children.map(child => this.printObject(child)).join("")
          )
        : "",
      raws.beforeEnd,
      "end",
      raws.after
    );
  }

  private printRoot(ast: AST.Root): string {
    const raws = this.raws(ast);
    return this.print(
      raws.before,
      ast.child ? this.printObject(ast.child) : "",
      raws.after
    );
  }

  private print(...values: (string | undefined)[]): string {
    return values.filter(v => !!v).join("");
  }

  private raws<R extends AST.ASTRaws>(obj: AST.ASTNode<R>): R {
    return (obj.raws || {}) as R;
  }
}
