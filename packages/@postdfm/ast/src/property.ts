import { ASTNode } from "@postdfm/ast/astNode";
import { ASTRaws } from "@postdfm/ast/astRaws";
import { ASTType } from "@postdfm/ast/astType";
import { AnyList } from "@postdfm/ast/list/anyList";
import { VariantValue } from "@postdfm/ast/value/variantValue";

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
