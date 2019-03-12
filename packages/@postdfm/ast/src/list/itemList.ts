import { ASTType } from "../astType";
import { Item } from "../item";
import { List } from "./list";

export class ItemList extends List<Item> {
  constructor(values?: Item[]) {
    super(ASTType.ItemList, values || []);
  }
}
