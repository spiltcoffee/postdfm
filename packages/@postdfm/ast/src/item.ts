import { ASTNode } from "./astNode";
import { ASTType } from "./astType";
import { Property } from "./property";

export class Item extends ASTNode {
  public properties: Property[];

  constructor(properties?: Property[]) {
    super(ASTType.Item);
    this.properties = properties || [];
  }
}
