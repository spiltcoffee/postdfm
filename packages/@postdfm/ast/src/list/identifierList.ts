import { ASTType } from "../astType";
import { IdentifierValue } from "../value/identifierValue";
import { List } from "./list";

export class IdentifierList extends List<IdentifierValue> {
  constructor(values?: IdentifierValue[]) {
    super(ASTType.IdentifierList, values || []);
  }
}
