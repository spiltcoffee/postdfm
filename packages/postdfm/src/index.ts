import * as AST from "@postdfm/ast";
import stringify from "@postdfm/ast2dfm";
import parse from "@postdfm/dfm2ast";

interface IInternalRunnerOptions {
  parser: IParser;
  stringifier: IStringifier;
  transformers: ITransformer[];
}

export interface IRunnerOptions {
  parser?: IParser | string;
  stringifier?: IStringifier | string;
  transformers?: Array<ITransformer | string>;
}

export type IParser = (dfm: string) => AST.Root;

export type ITransformer = (ast: AST.Root) => AST.Root;

export type IStringifier = (ast: AST.Root) => string;

export interface IProcessingOptions {
  from?: string;
}

export class Runner {
  private options: IInternalRunnerOptions;

  constructor(options: IInternalRunnerOptions) {
    this.options = options;
  }

  public processSync(dfm: string, processingOptions?: IProcessingOptions) {
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

    const transformed = this.options.transformers.reduce(
      (currAst, transformer) => transformer(currAst),
      ast!
    );

    return this.options.stringifier(transformed);
  }

  public async process(dfm: string, processingOptions?: IProcessingOptions) {
    return this.processSync(dfm, processingOptions);
  }
}

export default function postdfm(options?: IRunnerOptions): Runner {
  const internalOptions: IInternalRunnerOptions = {
    parser: parse,
    stringifier: stringify,
    transformers: []
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

      options.transformers.forEach(transformer => {
        let internalTransformer: ITransformer;
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
