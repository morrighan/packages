# `@cichol/stylelint-config`

A Stylelint configuration for personal projects.

[![Build Status][github actions badge]][github actions][![Coverage Status][coverage badge]][coverage][![License][license badge]](LICENSE)[![Package Version][npm package version badge]][npm package]

## Table of Contents

- [`@cichol/stylelint-config`](#cicholstylelint-config)
  - [Table of Contents](#table-of-contents)
  - [Requisites](#requisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contained presets and plugins](#contained-presets-and-plugins)
  - [License](#license)

## Requisites

- Stylelint `^16.24.0`

## Installation

```sh
$ npm install --save-dev @cichol/stylelint-config
```

## Usage

```javascript
export default {
  extends: '@cichol/stylelint-config'
}
```

## Contained presets and plugins

- Presets
  - [stylelint-config-sass-guidelines][stylelint-config-sass-guidelines]
- Plugins
  - [stylelint-order][stylelint-order]

## License

[MIT Licensed](../../LICENSE).

[github actions badge]: https://img.shields.io/github/actions/workflow/status/morrighan/packages/default.yml?branch=develop&style=flat-square
[github actions]: https://github.com/morrighan/packages/actions
[coverage badge]: https://img.shields.io/codecov/c/github/morrighan/packages?style=flat-square
[coverage]: https://app.codecov.io/gh/morrighan/packages/tree/develop/packages%2Fstylelint-config
[license badge]: https://img.shields.io/github/license/morrighan/packages.svg?style=flat-square
[npm package version badge]: https://img.shields.io/npm/v/@cichol/stylelint-config.svg?style=flat-square
[npm package]: https://www.npmjs.com/package/@cichol/stylelint-config
[stylelint-config-sass-guidelines]: https://www.npmjs.com/package/stylelint-config-sass-guidelines
[stylelint-order]: https://www.npmjs.com/package/stylelint-order
