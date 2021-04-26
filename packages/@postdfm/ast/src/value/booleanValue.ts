import { ASTType } from "@postdfm/ast/astType";
import { Value } from "@postdfm/ast/value/value";

export class BooleanValue extends Value<boolean> {
  constructor(value: boolean) {
    super(ASTType.Boolean, value);
  }
}
