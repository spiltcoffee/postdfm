import { ASTType } from "../astType";
import { QualifiedValue } from "../value/qualifiedValue";
import { List } from "./list";

export class QualifiedList extends List<QualifiedValue> {
  constructor(values?: QualifiedValue[]) {
    super(ASTType.QualifiedList, values || []);
  }
}
