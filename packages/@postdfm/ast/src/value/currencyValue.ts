import { ASTType } from "../astType";
import { Float } from "./float";
import { Value } from "./value";

export class CurrencyValue extends Value<Float> {
  constructor(value?: Float) {
    super(ASTType.Currency, value || { integer: "0" });
  }
}
