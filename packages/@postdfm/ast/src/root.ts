import { ASTNode } from "./astNode";
import { ASTType } from "./astType";
import { DObject } from "./object";

export class Root extends ASTNode {
  public child?: DObject;

  constructor(child?: DObject) {
    super(ASTType.Root);
    this.child = child;
  }
}
