import { ASTNode } from "./astNode";
import { ASTRaws } from "./astRaws";
import { ASTType } from "./astType";
import { AnyList } from "./list/anyList";
import { VariantValue } from "./value/variantValue";

interface PropertyRaws extends ASTRaws {
  afterName?: string;
  beforeValue?: string;
}
export class Property extends ASTNode<PropertyRaws> {
  public name: string;
  public value: VariantValue | AnyList;

  constructor(name: string, value: VariantValue | AnyList) {
    super(ASTType.Property);
    this.name = name;
    this.value = value;
  }
}
