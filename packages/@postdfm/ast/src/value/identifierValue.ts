import { ASTType } from "../astType";
import { Value } from "./value";

export class IdentifierValue extends Value<string> {
  constructor(value: string) {
    super(ASTType.Identifier, value);
  }
}
