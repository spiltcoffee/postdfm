import { ASTType } from "../astType";
import { StringValuePart } from "./stringValuePart";

export class LiteralString extends StringValuePart {
  constructor(value?: string) {
    super(ASTType.LiteralString, value);
  }
}
