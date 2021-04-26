import { ASTType } from "@postdfm/ast/astType";
import { StringValuePart } from "@postdfm/ast/value/stringValuePart";
import { Value } from "@postdfm/ast/value/value";

export class StringValue extends Value<StringValuePart[]> {
  constructor(value?: StringValuePart[]) {
    super(ASTType.String, value || []);
  }
}
