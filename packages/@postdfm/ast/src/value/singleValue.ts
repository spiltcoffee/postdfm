import { ASTType } from "../astType";
import { Float } from "./float";
import { Value } from "./value";

export class SingleValue extends Value<Float> {
  constructor(value?: Float) {
    super(ASTType.Single, value || { integer: "0" });
  }
}
