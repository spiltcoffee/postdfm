import { ASTType } from "../astType";
import { IFloat } from "./float";
import { Value } from "./value";

export class SingleValue extends Value<IFloat> {
  constructor(value?: IFloat) {
    super(ASTType.Single, value || { integer: "0" });
  }
}
