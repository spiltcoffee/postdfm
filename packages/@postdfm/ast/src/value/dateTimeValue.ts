import { ASTType } from "@postdfm/ast/astType";
import { Float } from "@postdfm/ast/value/float";
import { Value } from "@postdfm/ast/value/value";

export class DateTimeValue extends Value<Float> {
  constructor(value?: Float) {
    super(ASTType.DateTime, value || { integer: "0" });
  }
}
