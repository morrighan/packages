# `@cichol/eslint-config`

An universal ESLint configuration for personal projects.

[![Build Status][github actions badge]][github actions][![License][license badge]](LICENSE)[![Package Version][npm package version badge]][npm package]

## Table of Contents

- [`@cichol/eslint-config`](#cicholeslint-config)
  - [Table of Contents](#table-of-contents)
  - [Requisites](#requisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contained presets and plugins](#contained-presets-and-plugins)
  - [License](#license)

## Requisites

- ESLint `^7.32.0`
- TypeScript `^4.4.2`

## Installation

```sh
$ npm install --save-dev @cichol/eslint-config
```

## Usage

```json
{
    "extends": "@cichol/eslint-config"
}
```

## Contained presets and plugins

- Presets
  - [eslint-config-airbnb][eslint-config-airbnb]
  - [eslint-config-airbnb-base][eslint-config-airbnb-base]
- Plugins
  - [eslint-plugin-import][eslint-plugin-import]
  - [eslint-plugin-node][eslint-plugin-node]
  - [eslint-plugin-promise][eslint-plugin-promise]
  - [eslint-plugin-eslint-comments][eslint-plugin-eslint-comments]
  - [eslint-plugin-react][eslint-plugin-react]
  - [eslint-plugin-jsx-a11y][eslint-plugin-jsx-a11y]

## License

[MIT Licensed](../../LICENSE).

[github actions badge]: https://img.shields.io/github/actions/workflow/status/morrighan/packages/default.yml?branch=develop&style=flat-square
[github actions]: https://github.com/morrighan/packages/actions
[license badge]: https://img.shields.io/github/license/morrighan/packages.svg?style=flat-square
[npm package version badge]: https://img.shields.io/npm/v/@cichol/eslint-config.svg?style=flat-square
[npm package]: https://www.npmjs.com/package/@cichol/eslint-config
[eslint]: https://eslint.org/
[eslint-config-airbnb]: https://www.npmjs.com/package/eslint-preset-airbnb
[eslint-config-airbnb-base]: https://www.npmjs.com/package/eslint-config-airbnb-base
[eslint-plugin-import]: https://www.npmjs.com/package/eslint-plugin-import
[eslint-plugin-node]: https://www.npmjs.com/package/eslint-plugin-node
[eslint-plugin-promise]: https://www.npmjs.com/package/eslint-plugin-promise
[eslint-plugin-eslint-comments]: https://www.npmjs.com/package/eslint-plugin-eslint-comments
[eslint-plugin-react]: https://www.npmjs.com/package/eslint-plugin-react
[eslint-plugin-jsx-a11y]: https://www.npmjs.com/package/eslint-plugin-jsx-a11y
