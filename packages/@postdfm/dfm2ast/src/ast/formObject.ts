import { ASTNode } from "./astNode";
import { ASTType } from "./astType";
import { ObjectKind } from "./objectKind";
import { Property } from "./property";

export class FormObject extends ASTNode {
  public kind: ObjectKind;
  public name: string;
  public type: string;
  public order: number;
  public properties: Property[];
  public children: FormObject[];

  constructor(
    kind: ObjectKind,
    name: string,
    type: string,
    order: number,
    properties?: Property[],
    children?: FormObject[]
  ) {
    super(ASTType.Object);
    this.kind = kind;
    this.name = name;
    this.type = type;

    if (order) {
      this.order = order;
    }

    if (properties) {
      this.properties = properties;
    }

    if (children) {
      this.children = children;
    }
  }
}
