import { ASTNode } from "../astNode";
import { ASTType } from "../astType";

export class Value<T> extends ASTNode {
  public value: T;
  constructor(astType: ASTType, value: T) {
    super(astType);
    this.value = value;
  }
}
