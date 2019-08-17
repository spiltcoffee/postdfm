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

See the [`postdfm` README.md](https://github.com/spiltcoffee/postdfm/blob/master/packages/postdfm/README.md) for more information.

## Contributing

Bug reports and feature requests are greatly appreciated, as are pull requests.

Please see the [Contributing Guide](https://github.com/spiltcoffee/postdfm/blob/master/CONTRIBUTING.md) for instructions on how to contribute to this project.

## License

Licensed under the MIT License.
