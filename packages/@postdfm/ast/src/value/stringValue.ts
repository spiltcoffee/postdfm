import { ASTType } from "../astType";
import { StringValuePart } from "./stringValuePart";
import { Value } from "./value";

export class StringValue extends Value<StringValuePart[]> {
  constructor(value?: StringValuePart[]) {
    super(ASTType.String, value || []);
  }
}
