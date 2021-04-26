import { BinaryStringList } from "@postdfm/ast/list/binaryStringList";
import { IdentifierList } from "@postdfm/ast/list/identifierList";
import { VariantList } from "@postdfm/ast/list/variantList";
import { ItemList } from "@postdfm/ast/list/itemList";

export type AnyList =
  | BinaryStringList
  | IdentifierList
  | VariantList
  | ItemList;
