import { ASTType } from "@postdfm/ast/astType";
import { IdentifierValue } from "@postdfm/ast/value/identifierValue";
import { List } from "@postdfm/ast/list/list";

export class IdentifierList extends List<IdentifierValue> {
  constructor(values?: IdentifierValue[]) {
    super(ASTType.IdentifierList, values || []);
  }
}
