import type { webcrypto } from 'crypto'

// Third-party modules.
import { decodeBase64Url } from '@std/encoding'

// Local helpers.
import { Algorithm } from '#constants'

export function concatBuffers(...buffers: ArrayBuffer[]): ArrayBuffer {
	const length = buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0)
	const result = new Uint8Array(length)
	let offset = 0

	for (const buffer of buffers) {
		result.set(new Uint8Array(buffer), offset)

		offset += buffer.byteLength
	}

	return result.buffer
}

export function splitByChunkSizes(data: string | ArrayBuffer, ...sizes: number[]): ArrayBuffer[] {
	const buffer = typeof data === 'string' ? decodeBase64Url(data).buffer : data

	return [ ...sizes, buffer.byteLength ]
		.reduce((array, size, index) => array.concat((array[index - 1] ?? 0) + size), [] as number[])
		.map((pivot, index, array) => [ (array[index - 1] ?? 0), pivot ] as const)
		.map(([ begin, end ]) => buffer.slice(begin, end))
}

export function computeSecret(
	maybePublicKey: ArrayBuffer | webcrypto.CryptoKey,
	maybePrivateKey: ArrayBuffer | webcrypto.CryptoKey,
	algorithm: webcrypto.Algorithm,
): Promise<ArrayBuffer> {
	return Promise.all([
		maybePublicKey instanceof ArrayBuffer
			? crypto.subtle.importKey('spki', maybePublicKey, algorithm, false, [])
			: maybePublicKey,

		maybePrivateKey instanceof ArrayBuffer
			? crypto.subtle.importKey('pkcs8', maybePrivateKey, algorithm, false, [ 'deriveBits' ])
			: maybePrivateKey,
	]).then(([ publicKey, privateKey ]) => (
		crypto.subtle.deriveBits({ ...algorithm, public: publicKey }, privateKey, null)
	))
}

export function calculateHash(
	buffer: ArrayBuffer,
	salt: ArrayBuffer | ArrayBufferView<ArrayBuffer>,
): Promise<ArrayBuffer> {
	return crypto.subtle.importKey('raw', buffer, Algorithm.HKDF, false, [ 'deriveBits' ]).then(secretKey => (
		crypto.subtle.deriveBits({ ...Algorithm.HKDF, info: new Uint8Array(), salt: 'buffer' in salt ? salt.buffer : salt }, secretKey, 512)
	))
}
