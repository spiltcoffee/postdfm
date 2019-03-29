import { ASTType } from "../astType";
import { IFloat } from "./float";
import { Value } from "./value";

export class DateTimeValue extends Value<IFloat> {
  constructor(value?: IFloat) {
    super(ASTType.DateTime, value || { integer: "0" });
  }
}
