import { BinaryStringList } from "./binaryStringList";
import { IdentifierList } from "./identifierList";
import { VariantList } from "./variantList";
import { ItemList } from "./itemList";

export type AnyList =
  | BinaryStringList
  | IdentifierList
  | VariantList
  | ItemList;
