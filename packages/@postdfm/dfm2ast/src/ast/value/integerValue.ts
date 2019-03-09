import { ASTType } from "../astType";
import { Value } from "./value";

export class IntegerValue extends Value<number> {
  constructor(value: number) {
    super(ASTType.Integer, value);
  }
}
