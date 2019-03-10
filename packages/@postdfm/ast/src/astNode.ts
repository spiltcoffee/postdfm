import { ASTType } from "./astType";

export class ASTNode {
  public astType: ASTType;
  constructor(astType: ASTType) {
    this.astType = astType;
  }
}
