import { ASTType } from "@postdfm/ast/astType";
import { Value } from "@postdfm/ast/value/value";

export class HexCodeValue extends Value<string> {
  constructor(value?: string) {
    super(ASTType.HexCode, value || "");
  }
}
