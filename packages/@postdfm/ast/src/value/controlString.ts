import { ASTType } from "@postdfm/ast/astType";
import { StringValuePart } from "@postdfm/ast/value/stringValuePart";

export class ControlString extends StringValuePart {
  constructor(value?: string) {
    super(ASTType.ControlString, value);
  }
}
