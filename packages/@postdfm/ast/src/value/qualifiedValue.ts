import { ASTType } from "../astType";
import { Value } from "./value";

export class QualifiedValue extends Value<string> {
  constructor(value: string) {
    super(ASTType.Qualified, value);
  }
}
