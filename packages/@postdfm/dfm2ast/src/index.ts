import { Root } from "@postdfm/ast";
import { Grammar, Parser } from "nearley";
import * as grammar from "./grammar";

export function parse(dfm: string): Root {
  const parser = new Parser(Grammar.fromCompiled(grammar));
  parser.feed(dfm);

  if (!parser.results.length) {
    throw new Error("Unexpected End Of Input");
  }

  if (parser.results.length > 1) {
    throw new Error(
      `Ambiguous Grammar: ${parser.results.length} Results Found`
    );
  }

  return parser.results[0];
}
