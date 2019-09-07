import { ASTType } from "../astType";
import { VariantValue } from "../value/variantValue";
import { List } from "./list";

export class VariantList extends List<VariantValue> {
  constructor(values?: Array<VariantValue>) {
    super(ASTType.VariantList, values || []);
  }
}
