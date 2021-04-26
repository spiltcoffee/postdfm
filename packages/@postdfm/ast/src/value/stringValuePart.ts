import { ASTType } from "@postdfm/ast/astType";
import { Value } from "@postdfm/ast/value/value";

export class StringValuePart extends Value<string> {
  constructor(astType: ASTType, value?: string) {
    super(astType, value || "");
  }
}
