import { ASTType } from "../astType";
import { Value } from "./value";

export class BooleanValue extends Value<boolean> {
  constructor(value: boolean) {
    super(ASTType.Boolean, value);
  }
}
