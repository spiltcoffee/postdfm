import * as AST from "@postdfm/ast";
import { Plugin } from "@postdfm/plugin";
import { stringify } from "@postdfm/ast2dfm";
import { Transformer } from "@postdfm/transform";
import { parse } from "@postdfm/dfm2ast";

interface InternalRunnerOptions {
  parser: Parser;
  stringifier: Stringifier;
  plugins: Plugin[];
}

interface ReferencedPlugin {
  new (): Plugin;
}

export interface RunnerOptions {
  parser?: Parser | string;
  stringifier?: Stringifier | string;
  plugins?: Array<Plugin | typeof Plugin | string>;
}

export type Parser = (dfm: string) => AST.Root;

export type Stringifier = (ast: AST.Root) => string;

export interface ProcessingOptions {
  from?: string;
}

export class Runner {
  private options: InternalRunnerOptions;
  private transformer: Transformer;

  constructor(options: InternalRunnerOptions) {
    this.options = options;

    this.transformer = new Transformer(this.options.plugins);
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
        throw new Error(
          `Error in ${processingOptions.from}: ${
            (<{ message: string }>error).message
          }`
        );
      } else {
        throw error;
      }
    }

    /* istanbul ignore next */
    if (!ast) {
      throw new Error(
        `Somehow, \`ast\` is falsy?? (type: ${typeof ast}, value: ${
          ast as string
        })\n\n` +
          "  This probably isn't your fault. Please consider raising an " +
          "issue with a reproducable case at github.com/spiltcoffee/postdfm"
      );
    }

    const transformed = this.transformer.transform(ast);

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
    plugins: [],
  };

  if (options) {
    if (options.parser) {
      if (typeof options.parser === "string") {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        internalOptions.parser = require(options.parser) as Parser;
      } else if (typeof options.parser === "function") {
        internalOptions.parser = options.parser;
      } else {
        throw new Error("parser must be a string or a function");
      }
    }

    if (options.stringifier) {
      if (typeof options.stringifier === "string") {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        internalOptions.stringifier = require(options.stringifier) as Stringifier;
      } else if (typeof options.stringifier === "function") {
        internalOptions.stringifier = options.stringifier;
      } else {
        throw new Error("stringifier must be a string or a function");
      }
    }

    if (options.plugins) {
      if (!Array.isArray(options.plugins)) {
        throw new Error(
          "plugins must be an array of strings, functions and/or objects"
        );
      }

      options.plugins.forEach((plugin) => {
        let internalPlugin: Plugin;
        if (typeof plugin === "string") {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          internalPlugin = new (require(plugin) as ReferencedPlugin)();
        } else if (typeof plugin === "function") {
          internalPlugin = new (plugin as ReferencedPlugin)();
        } else if (typeof plugin === "object") {
          internalPlugin = plugin;
        } else {
          throw new Error(
            "plugins must be an array of strings, functions and/or objects"
          );
        }

        internalOptions.plugins.push(internalPlugin);
      });
    }
  }

  return new Runner(internalOptions);
}
