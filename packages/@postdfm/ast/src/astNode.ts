import { ASTType } from "@postdfm/ast/astType";
import { ASTRaws } from "@postdfm/ast/astRaws";

export class ASTNode<R extends ASTRaws = ASTRaws> {
  public astType: ASTType;

  public raws: R;
  constructor(astType: ASTType) {
    this.astType = astType;
  }
}
