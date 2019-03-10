import { ASTNode } from "./astNode";
import { ASTType } from "./astType";
import { List } from "./list/list";
import { Value } from "./value/value";

export class Property extends ASTNode {
  public name: string;
  public value: Value<any> | List<any>;

  constructor(name: string, value: Value<any> | List<any>) {
    super(ASTType.Property);
    this.name = name;
    this.value = value;
  }
}
