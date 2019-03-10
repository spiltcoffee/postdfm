import { ASTType } from "../astType";
import { StringValue } from "../value/stringValue";
import { List } from "./list";

export class StringList extends List<StringValue> {
  constructor(values: StringValue[]) {
    super(ASTType.StringList, values);
  }
}
