import { ASTType } from "../astType";
import { BinaryStringValue } from "../value/binaryStringValue";
import { List } from "./list";

export class BinaryStringList extends List<BinaryStringValue> {
  constructor(values?: BinaryStringValue[]) {
    super(ASTType.BinaryStringList, values || []);
  }
}
