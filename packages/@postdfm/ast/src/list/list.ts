import { ASTNode } from "../astNode";
import { ASTType } from "../astType";

export class List<T> extends ASTNode {
  public values: T[];

  constructor(astType: ASTType, values: T[]) {
    super(astType);
    this.values = values;
  }
}
