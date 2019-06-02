import * as AST from "@postdfm/ast";

export default class Stringifier {
  public stringify(ast: AST.ASTNode) {
    switch (ast.astType) {
      case AST.ASTType.String:
        return this.printString(ast as AST.StringValue);
      case AST.ASTType.ControlString:
        return this.printControlString(ast as AST.ControlString);
      case AST.ASTType.LiteralString:
        return this.printLiteralString(ast as AST.LiteralString);
      // case AST.ASTType.BinaryString:
      //   return this.printBinaryString(ast as AST.BinaryStringValue);
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
      // case AST.ASTType.Item:
      //   return this.printItem(ast as AST.Item);
      case AST.ASTType.VariantList:
        return this.printVariantList(ast as AST.VariantList);
      case AST.ASTType.BinaryStringList:
        return this.printBinaryStringList(ast as AST.BinaryStringList);
      case AST.ASTType.IdentifierList:
        return this.printIdentifierList(ast as AST.IdentifierList);
      case AST.ASTType.ItemList:
        return this.printItemList(ast as AST.ItemList);
      // case AST.ASTType.Property:
      //   return this.printProperty(ast as AST.Property);
      // case AST.ASTType.Object:
      //   return this.printObject(ast as AST.DObject);
      case AST.ASTType.Root:
        return this.printRoot(ast as AST.Root);
      default:
        throw Error(`Cannot stringify astType ${ast.astType}`);
    }
  }

  private printString(ast: AST.StringValue): string {
    return this.print(
      this.raws(ast).before,
      ast.value.map(str => this.stringify(str)).join(""),
      this.raws(ast).after
    );
  }

  private printControlString(ast: AST.ControlString): string {
    return this.print(
      this.raws(ast).before,
      "#",
      `${ast.value.charCodeAt(0)}`,
      this.raws(ast).after
    );
  }

  private printLiteralString(ast: AST.LiteralString): string {
    return this.print(
      this.raws(ast).before,
      "'",
      ast.value.replace(/'/g, "''"),
      "'",
      this.raws(ast).after
    );
  }

  private printBinaryString(ast: AST.BinaryStringValue): string {
    return this.print(this.raws(ast).before, ast.value, this.raws(ast).after);
  }

  private printInteger(ast: AST.IntegerValue): string {
    return this.print(
      this.raws(ast).before,
      `${ast.value}`,
      this.raws(ast).after
    );
  }

  private printHexCode(ast: AST.HexCodeValue): string {
    return this.print(
      this.raws(ast).before,
      "$",
      ast.value,
      this.raws(ast).after
    );
  }

  private printDouble(ast: AST.DoubleValue): string {
    return this.print(
      this.raws(ast).before,
      ast.value.integer,
      ast.value.fraction ? `.${ast.value.fraction}` : "",
      ast.value.exponent ? `e${ast.value.exponent}` : "",
      this.raws(ast).after
    );
  }

  private printSingle(ast: AST.SingleValue): string {
    return this.print(
      this.raws(ast).before,
      ast.value.integer,
      ast.value.fraction ? `.${ast.value.fraction}` : "",
      ast.value.exponent ? `e${ast.value.exponent}` : "",
      "s",
      this.raws(ast).after
    );
  }

  private printCurrency(ast: AST.CurrencyValue): string {
    return this.print(
      this.raws(ast).before,
      ast.value.integer,
      ast.value.fraction ? `.${ast.value.fraction}` : "",
      ast.value.exponent ? `e${ast.value.exponent}` : "",
      "c",
      this.raws(ast).after
    );
  }

  private printDateTime(ast: AST.DateTimeValue): string {
    return this.print(
      this.raws(ast).before,
      ast.value.integer,
      ast.value.fraction ? `.${ast.value.fraction}` : "",
      ast.value.exponent ? `e${ast.value.exponent}` : "",
      "d",
      this.raws(ast).after
    );
  }

  private printBoolean(ast: AST.BooleanValue): string {
    return this.print(
      this.raws(ast).before,
      ast.value ? "True" : "False",
      this.raws(ast).after
    );
  }

  private printIdentifier(ast: AST.IdentifierValue): string {
    return this.print(this.raws(ast).before, ast.value, this.raws(ast).after);
  }

  private printItem(ast: AST.Item): string {
    return this.print(
      this.raws(ast).before,
      "item",
      this.raws(ast).afterItem,
      ast.properties.map(property => this.printProperty(property)).join(""),
      this.raws(ast).beforeEnd,
      "end",
      this.raws(ast).after
    );
  }

  private printVariantList(ast: AST.VariantList): string {
    return this.print(
      this.raws(ast).before,
      "(",
      this.raws(ast).afterOpen,
      ast.values.map(variant => this.stringify(variant)).join(""),
      this.raws(ast).beforeClose,
      ")",
      this.raws(ast).after
    );
  }

  private printBinaryStringList(ast: AST.BinaryStringList): string {
    return this.print(
      this.raws(ast).before,
      "{",
      this.raws(ast).afterOpen,
      ast.values
        .map(binaryString => this.printBinaryString(binaryString))
        .join(""),
      this.raws(ast).beforeClose,
      "}",
      this.raws(ast).after
    );
  }

  private printIdentifierList(ast: AST.IdentifierList): string {
    return this.print(
      this.raws(ast).before,
      "[",
      this.raws(ast).afterOpen,
      ast.values.map(identifier => this.printIdentifier(identifier)).join(","),
      this.raws(ast).beforeClose,
      "]",
      this.raws(ast).after
    );
  }

  private printItemList(ast: AST.ItemList): string {
    return this.print(
      this.raws(ast).before,
      "<",
      this.raws(ast).afterOpen,
      ast.values.map(item => this.printItem(item)).join(""),
      this.raws(ast).beforeClose,
      ">",
      this.raws(ast).after
    );
  }

  private printProperty(ast: AST.Property): string {
    return this.print(
      this.raws(ast).before,
      ast.name,
      this.raws(ast).afterName,
      "=",
      this.raws(ast).beforeValue,
      this.stringify(ast.value),
      this.raws(ast).after
    );
  }

  private printObject(ast: AST.DObject): string {
    return this.print(
      this.raws(ast).before,
      ast.kind,
      this.raws(ast).beforeName,
      ast.name,
      this.raws(ast).afterName,
      ast.type
        ? this.print(
            ":",
            this.raws(ast).beforeType,
            ast.type,
            this.raws(ast).afterType
          )
        : "",
      ast.order !== undefined
        ? this.print(
            "[",
            this.raws(ast).beforeOrder,
            `${ast.order}`,
            this.raws(ast).afterOrder,
            "]"
          )
        : "",
      ast.properties && ast.properties.length
        ? this.print(
            this.raws(ast).beforeProperties,
            ast.properties
              .map(property => this.printProperty(property))
              .join("")
          )
        : "",
      ast.children && ast.children.length
        ? this.print(
            this.raws(ast).beforeChildren,
            ast.children.map(child => this.printObject(child)).join("")
          )
        : "",
      this.raws(ast).beforeEnd,
      "end",
      this.raws(ast).after
    );
  }

  private printRoot(ast: AST.Root): string {
    return this.print(
      this.raws(ast).before,
      ast.child ? this.printObject(ast.child) : "",
      this.raws(ast).after
    );
  }

  private print(...values: string[]): string {
    return values.join("");
  }

  private raws(obj: any): any {
    return obj.raws || {};
  }
}
