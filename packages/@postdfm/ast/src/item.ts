import { ASTNode } from "./astNode";
import { ASTRaws } from "./astRaws";
import { ASTType } from "./astType";
import { Property } from "./property";

interface ItemRaws extends ASTRaws {
  afterItem?: string;
  beforeEnd?: string;
}

export class Item extends ASTNode<ItemRaws> {
  public properties: Property[];

  constructor(properties?: Property[]) {
    super(ASTType.Item);
    this.properties = properties || [];
  }
}
