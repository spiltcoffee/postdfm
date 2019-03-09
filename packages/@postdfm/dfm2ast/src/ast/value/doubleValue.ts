import { ASTType } from "../astType";
import { Value } from "./value";

export class DoubleValue extends Value<number> {
  constructor(value: number) {
    super(ASTType.Double, value);
  }
}
