import { ASTType } from "@postdfm/ast/astType";
import { StringValuePart } from "@postdfm/ast/value/stringValuePart";

export class LiteralString extends StringValuePart {
  constructor(value?: string) {
    super(ASTType.LiteralString, value);
  }
}
