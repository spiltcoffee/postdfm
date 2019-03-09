import { ASTType } from "../astType";
import { Value } from "./value";

export class StringValue extends Value<string> {
  constructor(value: string) {
    super(ASTType.String, value);
  }
}
