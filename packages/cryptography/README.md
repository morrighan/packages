# `@cichol/cryptography`

A cryptography library providing various IES presets based on Web Crypto API for personal projects.

[![Build Status][github actions badge]][github actions][![Coverage Status][coverage badge]][coverage][![License][license badge]](LICENSE)[![Package Version][npm package version badge]][npm package]

## Table of Contents

- [`@cichol/cryptography`](#cicholcryptography)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [IES Presets](#ies-presets)
  - [License](#license)

## Installation

```sh
$ npm install --save @cichol/cryptography
```

## Usage

```typescript
// For using default preset.
import { generateKeys, encrypt, decrypt } from '@cichol/cryptography/default'

// For using lightweight preset.
import { generateKeys, encrypt, decrypt } from '@cichol/cryptography/lightweight'

// For using post quantum preset.
import { generateKeys, encrypt, decrypt } from '@cichol/cryptography/post-quantum'

const [ publicKey, privateKey ] = await generateKeys()

const encryptedData = await encrypt('Hello, world!', publicKey)

await decrypt(encryptedData, privateKey) // 'Hello, world!'
```

## IES Presets

| Name | Key Agreement | Key Derivation | Symmetric Encryption |
|------|---------------|----------------|----------------------|
| `default` | [ECDH][spec-ecdh] (P-521) | [HKDF][spec-hkdf] (SHA-512) | [AES-GCM][spec-aes-gcm] (256bit) |
| `lightweight` | [X25519][spec-x25519] | [HKDF][spec-hkdf] (SHA-512) | [ChaCha20-Poly1305][spec-chacha20-poly1305] (256bit) |
| `post-quantum` | [ML-KEM][spec-ml-kem]-1024 | [HKDF][spec-hkdf] (SHA-512) | [ChaCha20-Poly1305][spec-chacha20-poly1305] (256bit) |

## License

[MIT Licensed](../../LICENSE).

[github actions badge]: https://img.shields.io/github/actions/workflow/status/morrighan/packages/default.yml?branch=develop&style=flat-square
[github actions]: https://github.com/morrighan/packages/actions
[coverage badge]: https://img.shields.io/codecov/c/github/morrighan/packages?style=flat-square
[coverage]: https://app.codecov.io/gh/morrighan/packages/tree/develop/packages%2Fcryptography
[license badge]: https://img.shields.io/github/license/morrighan/packages.svg?style=flat-square
[npm package version badge]: https://img.shields.io/npm/v/@cichol/cryptography.svg?style=flat-square
[npm package]: https://www.npmjs.com/package/@cichol/cryptography
[spec-ecdh]: https://www.w3.org/TR/webcrypto-2/#ecdh
[spec-x25519]: https://www.w3.org/TR/webcrypto-2/#x25519
[spec-ml-kem]: https://wicg.github.io/webcrypto-modern-algos/#ml-kem
[spec-hkdf]: https://www.w3.org/TR/webcrypto-2/#hkdf
[spec-aes-gcm]: https://www.w3.org/TR/webcrypto-2/#aes-gcm
[spec-chacha20-poly1305]: https://wicg.github.io/webcrypto-modern-algos/#chacha20-poly1305
