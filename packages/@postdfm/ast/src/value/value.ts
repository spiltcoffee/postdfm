import { ASTNode } from "@postdfm/ast/astNode";
import { ASTType } from "@postdfm/ast/astType";

export class Value<T> extends ASTNode {
  public value: T;
  constructor(astType: ASTType, value: T) {
    super(astType);
    this.value = value;
  }
}
