import * as AST from "@postdfm/ast";
import { stringify } from "@postdfm/ast2dfm";
import { parse } from "@postdfm/dfm2ast";

interface InternalRunnerOptions {
  parser: Parser;
  stringifier: Stringifier;
  transformers: Transformer[];
}

export interface RunnerOptions {
  parser?: Parser | string;
  stringifier?: Stringifier | string;
  transformers?: Array<Transformer | string>;
}

export type Parser = (dfm: string) => AST.Root;

export type Transformer = (ast: AST.Root) => AST.Root;

export type Stringifier = (ast: AST.Root) => string;

export interface ProcessingOptions {
  from?: string;
}

export class Runner {
  private options: InternalRunnerOptions;

  constructor(options: InternalRunnerOptions) {
    this.options = options;
  }

  public processSync(
    dfm: string,
    processingOptions?: ProcessingOptions
  ): string {
    let ast: AST.Root;
    try {
      ast = this.options.parser(dfm);
    } catch (error) {
      if (processingOptions && processingOptions.from) {
        throw new Error(`Error in ${processingOptions.from}: ${error.message}`);
      } else {
        throw error;
      }
    }

    if (!ast) {
      throw new Error(
        "Somehow, `ast` is null??\n\n" +
          "  This probably isn't your fault. Please consider raising an " +
          "issue with a reproducable case at github.com/spiltcoffee/postdfm"
      );
    }

    const transformed = this.options.transformers.reduce(
      (currAst, transformer) => transformer(currAst),
      ast
    );

    return this.options.stringifier(transformed);
  }

  public async process(
    dfm: string,
    processingOptions?: ProcessingOptions
  ): Promise<string> {
    return new Promise((resolve): void =>
      resolve(this.processSync(dfm, processingOptions))
    );
  }
}

export default function postdfm(options?: RunnerOptions): Runner {
  const internalOptions: InternalRunnerOptions = {
    parser: parse,
    stringifier: stringify,
    transformers: [],
  };

  if (options) {
    if (options.parser) {
      if (typeof options.parser === "string") {
        internalOptions.parser = require(options.parser);
      } else if (typeof options.parser === "function") {
        internalOptions.parser = options.parser;
      } else {
        throw new Error("parser must be a string or a function");
      }
    }

    if (options.stringifier) {
      if (typeof options.stringifier === "string") {
        internalOptions.stringifier = require(options.stringifier);
      } else if (typeof options.stringifier === "function") {
        internalOptions.stringifier = options.stringifier;
      } else {
        throw new Error("stringifier must be a string or a function");
      }
    }

    if (options.transformers) {
      if (!Array.isArray(options.transformers)) {
        throw new Error(
          "transformers must be an array of strings and/or functions"
        );
      }

      options.transformers.forEach((transformer) => {
        let internalTransformer: Transformer;
        if (typeof transformer === "string") {
          internalTransformer = require(transformer);
        } else if (typeof transformer === "function") {
          internalTransformer = transformer;
        } else {
          throw new Error(
            "transformers must be an array of strings and/or functions"
          );
        }

        internalOptions.transformers.push(internalTransformer);
      });
    }
  }

  return new Runner(internalOptions);
}
