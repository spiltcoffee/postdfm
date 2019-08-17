# postdfm

> Process over Delphi Forms (.dfm) files via an AST.
>
> Inspired by the excellent PostCSS tool, motivated by my rage at the Delphi IDE.

![npm: @postdfm/dfm2ast](https://img.shields.io/npm/v/@postdfm/dfm2ast.svg?label=npm%3A%20%40postdfm%2Fdfm2ast)
![CircleCI branch](https://img.shields.io/circleci/project/github/spiltcoffee/postdfm/master.svg)
![Codecov branch](https://img.shields.io/codecov/c/gh/spiltcoffee/postdfm/master.svg)
[![Greenkeeper](https://badges.greenkeeper.io/spiltcoffee/postdfm.svg)](https://greenkeeper.io/)

## Table of Contents

- [Installation](#installation)
- [Example Usage](#example-usage)
- [Reference](#reference)
- [Contributing](#contributing)
- [License](#license)

## Installation

The `postdfm` project is an interface wrapping all the separate modules together.

```shell
# npm
$ npm install postdfm

# yarn
$ yarn add postdfm
```

## Example Usage

```js
const fs = require("fs");
const postdfm = require("postdfm");

const cisDfm = fs.readFileSync(
  "cis.dfm",
  //.dfm files tend to be ascii instead of utf8
  "ascii"
);

const runner = postcss({
  transformers: [
    function(ast) {
      //transform and return the ast
      return transformedAst;
    }
  ]
});

const transDfm = runner.processSync(dfm, {
  //filename used for reporting errors
  from: "cis.dfm"
});

fs.writeFileSync("trans.dfm", transDfm);
```

## Reference

### `Runner` instance

Create a runner by calling the `postdfm` function.

```js
const postdfm = require("postdfm");
const runner = postdfm();
```

#### `postdfm(options?: IRunnerOptions)`

Create a `Runner` instance using `IRunnerOptions`

#### `runner.process(dfm: string, processingOptions: IProcessingOptions): Promise<string>`

Process a file through the runner asynchronously.

#### `runner.processSync(dfm: string, processingOptions: IProcessingOptions): string`

Process a file through the runner synchronously.

### `IRunnerOptions`

Options to pass to an instance of `Runner`.

#### `options.transformers: ITransformer[]`

Array of transformations to perform on AST.

#### `options.parser: IParser = "@postdfm/dfm2ast"`

Parser to use, defaults to `@postdfm/dfm2ast`.

#### `options.stringifier: IStringifier = "@postdfm/ast2dfm"`

Stringifier to use, defaults to `@postdfm/ast2dfm`.

### `ITransformer`

A function that takes an AST, transforms it, and returns it.

```js
(ast: AST.Root): AST.Root
```

### `IParser`

A function that takes a string, parses it, and returns an AST.

```js
(dfm: string): AST.Root
```

### `IStringifier`

A function that takes an AST, stringifies it, and returns a string.

```js
(ast: AST.Root): string
```

### `IProcessingOptions`

#### `processingOptions.from`

The file which is being processed. Used when throwing syntax errors.

## Generated Documentation

You can find the generated `typedoc` documentation [here](https://spiltcoffee.com/docs/postdfm/).

## Contributing

Bug reports and feature requests are greatly appreciated, as are pull requests.

Please see the [Contributing Guide](https://github.com/spiltcoffee/postdfm/blob/master/CONTRIBUTING.md) for instructions on how to contribute to this project.

## License

Licensed under the MIT License.
