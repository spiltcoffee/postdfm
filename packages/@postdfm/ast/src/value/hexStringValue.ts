import { ASTType } from "../astType";
import { Value } from "./value";

export class HexStringValue extends Value<string> {
  constructor(value?: string) {
    super(ASTType.HexString, value || "");
  }
}
