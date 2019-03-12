import { ASTType } from "../astType";
import { Value } from "./value";

interface IDouble {
  integer: string;
  fraction?: string;
  exponent?: string;
}

export class DoubleValue extends Value<IDouble> {
  constructor(value?: IDouble) {
    super(ASTType.Double, value || { integer: "0" });
  }
}
