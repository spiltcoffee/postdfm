import { ASTType } from "../astType";
import { Float } from "./float";
import { Value } from "./value";

export class DateTimeValue extends Value<Float> {
  constructor(value?: Float) {
    super(ASTType.DateTime, value || { integer: "0" });
  }
}
