# Contributing

Thank you for thinking of contributing to this project!

This document outlines the ways you can contribute to this project, what your development setup will need to be, and what workflows exist for you to develop with.

## Ways to Contribute

### Bug Reports

If you encounter a bug while using `postdfm`, please feel free to raise an issue detailing the bug. Please create the bug report by answering the following questions:

* What versions am I using of...
** `nodejs`
** `npm`/`yarn`
** `postdfm`
* What did I do?
* What was I expecting?
* What happened instead?
* What do I think is the problem?
* Am I willing to make a pull request with failing tests to help speed up the fix?
* Am I willing to make a pull request with the fix as well?

### Feature Requests

If you find `postdfm` to be lacking in a certain feature, please feel free to raise a new issue explaining what the missing feature is.

At this point, I'm not sure what direction to take `postdfm` in, if any (it might even be finished already, seeing as Delphi is already pretty unused as a language, and `dfm` files even less so).

### Documentation

If you find documentation (either `README.md`s or typedocs) lacking or full of errors, please feel free to directly raise a pull request to fix the documentation.

### Code

Please avoid raising a pull request to change code without first raising an issue detailing either a bug or a feature.

## Development Setup

You will need the following software to help develop this project:
1. `git`
2. `nodejs >= 7.6.0`
3. `npm`
4. `yarn`

## Development Workflow

### Bootstrap

Before running any commands, you'll likely have to run the following:

```bash
~/postdfm (master)
$ yarn bootstrap
```

### Everything at once

In order to see all of the operations that would be run in the Continuous Integration, run:

```bash
~/postdfm (master)
$ yarn ci
```

### Formatting and Linting

We use `prettier` for formatting and `tslint` and `eslint` for linting. The linting and formatting are separated into two steps.

To see the linting and formatting issues, run:
```bash
~/postdfm (master)
$ yarn lint:check
$ yarn format:check
```

To have as many issues as possible fixed by the tools, run:
```bash
~/postdfm (master)
$ yarn lint:fix
$ yarn format:fix
```

Make sure to run `format:fix` last, as that's what the CI will perform. If there are conflicts between the linter and the formatter, the formatter will win.

### Compilation

`postdfm` uses TypeScript and Nearley.js, so some compilation is required. Run:

```bash
~/postdfm (master)
$ yarn compile
```

### Testing

`postdfm` uses Jest to run and report coverage of all tests in the project. Run:
```bash
~/postdfm (master)
$ yarn test
```

### Documentation

Besides the README.md files for each project, `postdfm` uses TypeDoc to produce basic API documentation (viewable online athttp://spiltcoffee.com).
```bash
~/postdfm (master)
$ yarn doc
```

### Releasing

The release step is performed automatically by the CI. You can run the command, but it won't do anything.
```bash
~/postdfm (master)
$ yarn release
```

## Other information

### Committing

When writing a commit message, your message should follow the conventional commit format. The format is enforced by [`commitlint`](https://github.com/conventional-changelog/commitlint), so see that project for more info about the format.

You should list any issues your commits close in the commit message, as `fix #<issue>`.

When making a commit, your code in the commit will be automatically linted, formatted and tested. If any of this fails, the commit won't work.

You should try to fix whatever problems are occurring, but if you can't (like you're trying to add failing tests), please commit using the following:

```bash
~/postdfm (master)
$ git commit --no-verify
```

### Pull Request

Once you've made changes in a branch in your forked repo, make a pull request against this repo. This will trigger CircleCI to run all checks, and if successful, CodeCov will then report on your code coverage.
