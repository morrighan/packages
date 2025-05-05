import type { webcrypto } from 'crypto'

// Local helpers.
import { Algorithm } from './constants'

// Type definitions.
type CryptoKey = webcrypto.CryptoKey
type HkdfParams = webcrypto.AlgorithmIdentifier & webcrypto.HkdfParams

export function base64FromBuffer(buffer: ArrayBuffer): string {
	let binary = ''
	const bytes = new Uint8Array(buffer)
	const length = bytes.byteLength

	for (let index = 0; index < length; index += 1) {
		binary += String.fromCharCode(bytes[index])
	}

	return btoa(binary)
}

export function bufferFromBase64(base64: string): ArrayBuffer {
	const binary = atob(base64)
	const { length } = binary
	const bytes = new Uint8Array(length)

	for (let index = 0; index < length; index += 1) {
		bytes[index] = binary.charCodeAt(index)
	}

	return bytes.buffer
}

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
	const buffer = typeof data === 'string' ? bufferFromBase64(data) : data

	return [ ...sizes, buffer.byteLength ]
		.reduce((array, size, index) => array.concat((array[index - 1] ?? 0) + size), [] as number[])
		.map((pivot, index, array) => [ (array[index - 1] ?? 0), pivot ] as const)
		.map(([ begin, end ]) => buffer.slice(begin, end))
}

async function asPublicKey(publicKey: ArrayBuffer | CryptoKey): Promise<CryptoKey> {
	return publicKey instanceof ArrayBuffer
		? crypto.subtle.importKey('spki', publicKey, Algorithm.ECDH, false, [])
		: publicKey
}

async function asPrivateKey(privateKey: ArrayBuffer | CryptoKey): Promise<CryptoKey> {
	return privateKey instanceof ArrayBuffer
		? crypto.subtle.importKey('pkcs8', privateKey, Algorithm.ECDH, false, [ 'deriveBits' ])
		: privateKey
}

export async function computeSecret(
	maybePublicKey: ArrayBuffer | CryptoKey,
	maybePrivateKey: ArrayBuffer | CryptoKey,
): Promise<ArrayBuffer> {
	const [ publicKey, privateKey ] = await Promise.all([ asPublicKey(maybePublicKey), asPrivateKey(maybePrivateKey) ])

	return crypto.subtle.deriveBits({ ...Algorithm.ECDH, public: publicKey }, privateKey, null)
}

export async function calculateHash(
	buffer: ArrayBuffer,
	salt: ArrayBuffer | ArrayBufferView<ArrayBuffer>,
): Promise<ArrayBuffer> {
	const algorithm: HkdfParams = { ...Algorithm.HKDF, info: new Uint8Array(), salt: 'buffer' in salt ? salt.buffer : salt }
	const secretKey: CryptoKey = await crypto.subtle.importKey('raw', buffer, Algorithm.HKDF, false, [ 'deriveBits' ])

	return crypto.subtle.deriveBits(algorithm, secretKey, 512)
}
