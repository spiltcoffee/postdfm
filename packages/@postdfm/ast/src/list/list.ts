import { ASTNode } from "@postdfm/ast/astNode";
import { ASTRaws } from "@postdfm/ast/astRaws";
import { ASTType } from "@postdfm/ast/astType";

interface ListRaws extends ASTRaws {
  afterOpen?: string;
  beforeClose?: string;
}
export class List<T> extends ASTNode<ListRaws> {
  public values: T[];

  constructor(astType: ASTType, values: T[]) {
    super(astType);
    this.values = values;
  }
}
