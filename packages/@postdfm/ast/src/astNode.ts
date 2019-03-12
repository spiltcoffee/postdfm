import { ASTType } from "./astType";

export class ASTNode {
  public astType: ASTType;

  // define?
  public raws: any;
  constructor(astType: ASTType) {
    this.astType = astType;
  }
}
