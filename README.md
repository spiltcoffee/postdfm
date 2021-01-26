# postdfm

> Process over Delphi Forms (.dfm) files via an AST.
>
> Inspired by the excellent PostCSS tool, motivated by my rage at the Delphi IDE.

[![CircleCI branch](https://img.shields.io/circleci/project/github/spiltcoffee/postdfm/main.svg)](https://circleci.com)
[![Codecov branch](https://img.shields.io/codecov/c/gh/spiltcoffee/postdfm/main.svg)](https://codecov.io)
[![Known Vulnerabilities](https://snyk.io/test/github/spiltcoffee/postdfm/badge.svg?targetFile=package.json)](https://snyk.io/test/github/spiltcoffee/postdfm?targetFile=package.json)

## Table of Contents

- [Packages](#packages)
- [Installation](#installation)
- [Example Usage](#example-usage)
- [Contributing](#contributing)
- [License](#license)

## Packages

| Package                                              | Version                                                                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [`postdfm`](/packages/postdfm)                       | [![npm](https://img.shields.io/npm/v/postdfm.svg?label=npm)](https://www.npmjs.com/package/postdfm)                       |
| [`@postdfm/ast`](/packages/@postdfm/ast)             | [![npm](https://img.shields.io/npm/v/@postdfm/ast.svg?label=npm)](https://www.npmjs.com/package/@postdfm/ast)             |
| [`@postdfm/ast2dfm`](/packages/@postdfm/ast2dfm)     | [![npm](https://img.shields.io/npm/v/@postdfm/ast2dfm.svg?label=npm)](https://www.npmjs.com/package/@postdfm/ast2dfm)     |
| [`@postdfm/dfm2ast`](/packages/@postdfm/dfm2ast)     | [![npm](https://img.shields.io/npm/v/@postdfm/dfm2ast.svg?label=npm)](https://www.npmjs.com/package/@postdfm/dfm2ast)     |
| [`@postdfm/plugin`](/packages/@postdfm/plugin)       | [![npm](https://img.shields.io/npm/v/@postdfm/plugin.svg?label=npm)](https://www.npmjs.com/package/@postdfm/plugin)       |
| [`@postdfm/transform`](/packages/@postdfm/transform) | [![npm](https://img.shields.io/npm/v/@postdfm/transform.svg?label=npm)](https://www.npmjs.com/package/@postdfm/transform) |

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

const runner = postdfm({
  transformers: [new Plugin()],
});

const transDfm = runner.processSync(dfm, {
  //filename used for reporting errors
  from: "cis.dfm",
});

fs.writeFileSync("trans.dfm", transDfm);
```

See the [`postdfm`](packages/postdfm) package for more information.

## Contributing

Bug reports and feature requests are greatly appreciated, as are pull requests.

Please see the [Contributing Guide](/.github/CONTRIBUTING.md) for instructions on how to contribute to this project.

## License

Licensed under the MIT License.
