import { ASTType } from "../astType";
import { Value } from "./value";

export class HexCodeValue extends Value<string> {
  constructor(value?: string) {
    super(ASTType.HexCode, value || "");
  }
}
