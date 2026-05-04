// Third-party modules.
import { decodeBase64Url } from '@std/encoding'

// Local helpers.
import { Algorithm, type AlgorithmKind, isEncapsulatable } from '#constants'

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

function asPublicKey(
	KEM: AlgorithmKind<'KEM'>,
	publicKeySource: ArrayBuffer,
) {
	return crypto.subtle.importKey('spki', publicKeySource, Algorithm[KEM], false, isEncapsulatable(KEM) ? [ 'encapsulateBits' ] : [])
}

function asPrivateKey(
	KEM: AlgorithmKind<'KEM'>,
	privateKeySource: ArrayBuffer,
) {
	return crypto.subtle.importKey('pkcs8', privateKeySource, Algorithm[KEM], false, isEncapsulatable(KEM) ? [ 'decapsulateBits' ] : [ 'deriveBits' ])
}

export async function computeSecret(
	KEM: AlgorithmKind<'KEM'>,
	publicKeySource: ArrayBuffer,
): Promise<[ sharedSecret: ArrayBuffer, shareableKey: ArrayBuffer ]>

export async function computeSecret(
	KEM: AlgorithmKind<'KEM'>,
	publicKeySource: ArrayBuffer,
	privateKeySource: ArrayBuffer,
): Promise<[ sharedSecret: ArrayBuffer ]>

export async function computeSecret(
	KEM: AlgorithmKind<'KEM'>,
	publicKeySource: ArrayBuffer,
	generateKeys: () => Promise<[ publicKey: ArrayBuffer, privateKey: ArrayBuffer ]>,
): Promise<[ sharedSecret: ArrayBuffer, shareableKey: ArrayBuffer ]>

export async function computeSecret(
	KEM: AlgorithmKind<'KEM'>,
	publicKeySource: ArrayBuffer,
	additionalParameter?: ArrayBuffer | (() => Promise<[ publicKey: ArrayBuffer, privateKey: ArrayBuffer ]>) | null,
): Promise<[ sharedSecret: ArrayBuffer ] | [ sharedSecret: ArrayBuffer, shareableKey: ArrayBuffer ]> {
	const generateKeys = typeof additionalParameter === 'function' ? additionalParameter : null
	const algorithm = Algorithm[KEM]
	let ephemeralKey = additionalParameter instanceof ArrayBuffer ? additionalParameter : null
	let sharedSecret: ArrayBuffer
	let shareableKey: ArrayBuffer | null = null

	if (generateKeys) {
		[ shareableKey, ephemeralKey ] = await generateKeys()
	}

	if (ephemeralKey) {
		sharedSecret = await asPrivateKey(KEM, ephemeralKey)
			.then(privateKey => (
				privateKey.usages.includes('decapsulateBits')
					? crypto.subtle.decapsulateBits(algorithm, privateKey, publicKeySource)
					: asPublicKey(KEM, publicKeySource).then(publicKey => (
						crypto.subtle.deriveBits({ ...algorithm, public: publicKey }, privateKey, null)
					))
			))
	} else {
		({ ciphertext: shareableKey, sharedKey: sharedSecret } = await asPublicKey(KEM, publicKeySource)
			.then(publicKey => crypto.subtle.encapsulateBits(algorithm, publicKey)))
	}

	return shareableKey ? [ sharedSecret, shareableKey ] : [ sharedSecret ]
}

export function calculateHash(
	buffer: ArrayBuffer,
	salt: ArrayBuffer | ArrayBufferView<ArrayBuffer>,
): Promise<ArrayBuffer> {
	return crypto.subtle.importKey('raw', buffer, Algorithm.HKDF, false, [ 'deriveBits' ]).then(secretKey => (
		crypto.subtle.deriveBits({ ...Algorithm.HKDF, info: new Uint8Array(), salt: 'buffer' in salt ? salt.buffer : salt }, secretKey, 512)
	))
}
