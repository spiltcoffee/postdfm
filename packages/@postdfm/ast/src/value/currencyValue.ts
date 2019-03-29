import { ASTType } from "../astType";
import { IFloat } from "./float";
import { Value } from "./value";

export class CurrencyValue extends Value<IFloat> {
  constructor(value?: IFloat) {
    super(ASTType.Currency, value || { integer: "0" });
  }
}
