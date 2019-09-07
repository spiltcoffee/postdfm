import { Root } from "@postdfm/ast";
import { Grammar, Parser } from "nearley";
import * as grammar from "./grammar";

function parse(dfm: string): Root {
  const parser = new Parser(Grammar.fromCompiled(grammar));
  parser.feed(dfm);

  if (!parser.results.length) {
    throw new Error("Unexpected End Of Input");
  }

  if (parser.results.length > 1) {
    throw new Error(
      `Ambiguous Grammar: ${parser.results.length} Results Found\n\n` +
        "  This probably isn't your fault. Please consider raising an " +
        "issue with a reproducable case at github.com/spiltcoffee/postdfm"
    );
  }

  return parser.results[0];
}

export default parse;
export { parse };
