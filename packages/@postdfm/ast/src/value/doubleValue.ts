import { ASTType } from "../astType";
import { Float } from "./float";
import { Value } from "./value";

export class DoubleValue extends Value<Float> {
  constructor(value?: Float) {
    super(ASTType.Double, value || { integer: "0" });
  }
}
