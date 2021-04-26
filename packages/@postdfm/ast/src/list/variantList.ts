import { ASTType } from "@postdfm/ast/astType";
import { VariantValue } from "@postdfm/ast/value/variantValue";
import { List } from "@postdfm/ast/list/list";

export class VariantList extends List<VariantValue> {
  constructor(values?: Array<VariantValue>) {
    super(ASTType.VariantList, values || []);
  }
}
