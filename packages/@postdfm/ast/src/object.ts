import { ASTNode } from "@postdfm/ast/astNode";
import { ASTRaws } from "@postdfm/ast/astRaws";
import { ASTType } from "@postdfm/ast/astType";
import { ObjectKind } from "@postdfm/ast/objectKind";
import { Property } from "@postdfm/ast/property";

interface ObjectRaws extends ASTRaws {
  beforeDef?: string;
  afterName?: string;
  beforeType?: string;
  afterType?: string;
  beforeOrder?: string;
  afterOrder?: string;
  beforeProperties?: string;
  beforeChildren?: string;
  beforeEnd?: string;
}

export class DObject extends ASTNode<ObjectRaws> {
  public kind: ObjectKind;
  public name: string;
  public type: string;
  public order: number;
  public properties: Property[];
  public children: DObject[];

  constructor(
    kind: ObjectKind,
    name: string,
    type: string,
    order?: number,
    properties?: Property[],
    children?: DObject[]
  ) {
    super(ASTType.Object);
    this.kind = kind;
    this.name = name;
    this.type = type;

    if (order != null) {
      this.order = order;
    }

    this.properties = properties || [];
    this.children = children || [];
  }
}
