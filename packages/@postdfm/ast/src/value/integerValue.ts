import { ASTType } from "@postdfm/ast/astType";
import { Value } from "@postdfm/ast/value/value";

export class IntegerValue extends Value<number> {
  constructor(value?: number) {
    super(ASTType.Integer, value || 0);
  }
}
