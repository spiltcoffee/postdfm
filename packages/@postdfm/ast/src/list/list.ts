import { ASTNode } from "../astNode";
import { ASTRaws } from "../astRaws";
import { ASTType } from "../astType";

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
