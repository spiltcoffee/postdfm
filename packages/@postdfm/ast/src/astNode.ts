import { ASTType } from "./astType";
import { ASTRaws } from "./astRaws";

export class ASTNode<R extends ASTRaws = ASTRaws> {
  public astType: ASTType;

  public raws: R;
  constructor(astType: ASTType) {
    this.astType = astType;
  }
}
