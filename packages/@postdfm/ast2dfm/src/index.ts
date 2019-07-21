import { Root } from "@postdfm/ast";
import Stringifier from "./stringifier";

export function stringify(ast: Root): string {
  const stringifier = new Stringifier();
  return stringifier.stringify(ast);
}
