import { ASTType } from "@postdfm/ast/astType";
import { BinaryStringValue } from "@postdfm/ast/value/binaryStringValue";
import { List } from "@postdfm/ast/list/list";

export class BinaryStringList extends List<BinaryStringValue> {
  constructor(values?: BinaryStringValue[]) {
    super(ASTType.BinaryStringList, values || []);
  }
}
