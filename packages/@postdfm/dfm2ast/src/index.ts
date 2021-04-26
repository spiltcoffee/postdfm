import { Root } from "@postdfm/ast";

// nearley isn't a proper ESM module here (not even CommonJS - it's UMD)
import * as nearleyPkg from "nearley";
import type { Parser as ParserType, Grammar as GrammarType } from "nearley";
const { Parser, Grammar } = (<
  { default: { Parser: typeof ParserType; Grammar: typeof GrammarType } }
>(<unknown>nearleyPkg)).default;

import grammar from "@postdfm/dfm2ast/grammar";

function parse(dfm: string): Root {
  const parser = new Parser(Grammar.fromCompiled(grammar));
  parser.feed(dfm);

  if (!parser.results.length) {
    throw new Error("Unexpected End Of Input");
  }

  /* istanbul ignore next */
  if (parser.results.length > 1) {
    throw new Error(
      `Ambiguous Grammar: ${parser.results.length} Results Found\n\n` +
        "  This probably isn't your fault. Please consider raising an " +
        "issue with a reproducable case at github.com/spiltcoffee/postdfm"
    );
  }

  return parser.results[0] as Root;
}

export default parse;
export { parse };
