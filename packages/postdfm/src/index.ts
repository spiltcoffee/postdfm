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

export interface RunnerOptionsSync {
  parser?: Parser;
  stringifier?: Stringifier;
  plugins?: Array<Plugin | typeof Plugin>;
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

    this.transformer.transform(ast);

    return this.options.stringifier(ast);
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

export function postdfmSync(options?: RunnerOptionsSync): Runner {
  const internalOptions: InternalRunnerOptions = {
    parser: parse,
    stringifier: stringify,
    plugins: [],
  };

  if (options) {
    if (options.parser) {
      if (typeof options.parser === "function") {
        internalOptions.parser = options.parser;
      } else {
        throw new Error(
          "parser must be a function, or (only if async) a string"
        );
      }
    }

    if (options.stringifier) {
      if (typeof options.stringifier === "function") {
        internalOptions.stringifier = options.stringifier;
      } else {
        throw new Error(
          "stringifier must be a function, or (only if async) a string"
        );
      }
    }

    if (options.plugins) {
      if (!Array.isArray(options.plugins)) {
        throw new Error(
          "plugins must be an array of functions/objects, or (only if async) strings"
        );
      }

      options.plugins.forEach((plugin) => {
        let internalPlugin: Plugin;
        if (typeof plugin === "function") {
          internalPlugin = new (plugin as ReferencedPlugin)();
        } else if (typeof plugin === "object") {
          internalPlugin = plugin;
        } else {
          throw new Error(
            "plugins must be an array of functions/objects, or (only if async) strings"
          );
        }

        internalOptions.plugins.push(internalPlugin);
      });
    }
  }

  return new Runner(internalOptions);
}

export async function postdfm(options?: RunnerOptions): Promise<Runner> {
  const syncOptions: RunnerOptionsSync = {
    parser: undefined,
    stringifier: undefined,
    plugins: [],
  };

  if (options) {
    if (options.parser) {
      if (typeof options.parser === "string") {
        syncOptions.parser = (<{ default: Parser }>(
          await import(options.parser)
        )).default;
      } else {
        syncOptions.parser = options.parser;
      }
    }

    if (options.stringifier) {
      if (typeof options.stringifier === "string") {
        syncOptions.stringifier = (<{ default: Stringifier }>(
          await import(options.stringifier)
        )).default;
      } else {
        syncOptions.stringifier = options.stringifier;
      }
    }

    if (options.plugins) {
      if (Array.isArray(options.plugins)) {
        for (const plugin of options.plugins) {
          let syncPlugin;
          if (typeof plugin === "string") {
            syncPlugin = new (<{ default: ReferencedPlugin }>(
              await import(plugin)
            )).default();
          } else {
            syncPlugin = plugin;
          }

          syncOptions.plugins?.push(syncPlugin);
        }
      } else {
        syncOptions.plugins = options.plugins;
      }
    }
  }

  return postdfmSync(syncOptions);
}
