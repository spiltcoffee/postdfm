import * as AST from "@postdfm/ast";
import Stringifier from "./stringifier";

export function stringify(ast: AST.Root): string {
  const stringifier = new Stringifier();
  return stringifier.stringify(ast);
}
