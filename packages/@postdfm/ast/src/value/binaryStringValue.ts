import { ASTType } from "../astType";
import { Value } from "./value";

export class BinaryStringValue extends Value<string> {
  constructor(value?: string) {
    super(ASTType.BinaryString, value || "");
  }
}
