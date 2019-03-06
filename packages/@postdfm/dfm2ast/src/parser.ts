import * as nearley from "nearley";
import * as grammar from "./grammar";
import * as AST from "./ast";

export function parse(dfm: string): AST.FormObject {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
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
