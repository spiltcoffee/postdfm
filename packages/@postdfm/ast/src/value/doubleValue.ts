import { ASTType } from "@postdfm/ast/astType";
import { Float } from "@postdfm/ast/value/float";
import { Value } from "@postdfm/ast/value/value";

export class DoubleValue extends Value<Float> {
  constructor(value?: Float) {
    super(ASTType.Double, value || { integer: "0" });
  }
}
