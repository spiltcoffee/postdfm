import { ASTType } from "../astType";
import { Value } from "../value/value";
import { List } from "./list";

export class VariantList extends List<Value<any>> {
  constructor(values?: Array<Value<any>>) {
    super(ASTType.StringList, values || []);
  }
}
