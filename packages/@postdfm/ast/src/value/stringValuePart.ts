import { ASTType } from "../astType";
import { Value } from "./value";

export class StringValuePart extends Value<string> {
  constructor(astType: ASTType, value?: string) {
    super(astType, value || "");
  }
}
