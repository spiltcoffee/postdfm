import { Root } from "@postdfm/ast";
import Stringifier from "@postdfm/ast2dfm/stringifier";

function stringify(ast: Root): string {
  const stringifier = new Stringifier();
  return stringifier.stringify(ast);
}

export default stringify;
export { stringify };
