import { ASTType } from "@postdfm/ast/astType";
import { Item } from "@postdfm/ast/item";
import { List } from "@postdfm/ast/list/list";

export class ItemList extends List<Item> {
  constructor(values?: Item[]) {
    super(ASTType.ItemList, values || []);
  }
}
