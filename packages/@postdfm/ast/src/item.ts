import { ASTNode } from "@postdfm/ast/astNode";
import { ASTRaws } from "@postdfm/ast/astRaws";
import { ASTType } from "@postdfm/ast/astType";
import { Property } from "@postdfm/ast/property";

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
