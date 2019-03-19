import { ASTType } from "../astType";
import { StringValuePart } from "./stringValuePart";

export class ControlString extends StringValuePart {
  constructor(value?: string) {
    super(ASTType.ControlString, value);
  }
}
