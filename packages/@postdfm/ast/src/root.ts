import { ASTNode } from "@postdfm/ast/astNode";
import { ASTType } from "@postdfm/ast/astType";
import { DObject } from "@postdfm/ast/object";

export class Root extends ASTNode {
  public child?: DObject;

  constructor(child?: DObject) {
    super(ASTType.Root);
    this.child = child;
  }
}
