# @postdfm/plugin

> Sub-package for [`postdfm`](https://github.com/spiltcoffee/postdfm).
>
> Provides structure and utilities for making plugins that can modify a `@postdfm/ast` Abstract Syntax Tree.

[![npm](https://img.shields.io/npm/v/@postdfm/plugin.svg?label=npm)](https://www.npmjs.com/package/@postdfm/plugin)
[![CircleCI branch](https://img.shields.io/circleci/project/github/spiltcoffee/postdfm/main.svg)](https://circleci.com)
[![Codecov branch](https://img.shields.io/codecov/c/gh/spiltcoffee/postdfm/main.svg)](https://codecov.io)
[![Known Vulnerabilities](https://snyk.io/test/github/spiltcoffee/postdfm/badge.svg?targetFile=packages/@postdfm/plugin/package.json)](https://snyk.io/test/github/spiltcoffee/postdfm?targetFile=packages/@postdfm/plugin/package.json)

## Table of Contents

- [Installation](#installation)
- [Example Usage](#example-usage)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Installation

```shell
# npm
$ npm install @postdfm/plugin

# yarn
$ yarn add @postdfm/plugin
```

## Example Usage

```js
const { Plugin } = require("@postdfm/plugin");

class SomePlugin extends Plugin {
  install(hooks) {
    hooks.string.tap(ast => {
      // manipulate AST here
    }

    // all AST types can be manipulated, see AST.ASTTypes

    // also available:
    // - "after" hook for certain types
    hooks.after.object.tap(ast => {
      // manipulate AST here
    })
    // - "all" hook for everything - excludes "after" hooks
    hooks.all.tap(ast => {
      // manipulate AST here
    })
  }
}
```

## Documentation

See [`postdfm`](https://github.com/spiltcoffee/postdfm) for more information, or the generated `typedoc` documentation [here](https://spiltcoffee.com/docs/@postdfm/plugin/).

## Contributing

Bug reports and feature requests are greatly appreciated, as are pull requests.

Please see the [Contributing Guide](https://github.com/spiltcoffee/postdfm/blob/main/.github/CONTRIBUTING.md) for instructions on how to contribute to this project.

## License

Licensed under the MIT License.
