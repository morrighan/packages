import type { webcrypto } from 'crypto'

// Third-party modules.
import { assert } from '@std/assert'
import { encodeBase64Url } from '@std/encoding'
import { encode as serializeFn, decode as deserializeFn, Encoder, Decoder } from '@msgpack/msgpack'

// Local helpers.
import { ByteSize, Algorithm, type AlgorithmKind, isEncapsulatable } from '#constants'
import { splitByChunkSizes, concatBuffers, computeSecret, deriveSymmetricKeys } from '#utilities'

const createGenerateKeysFn = (
	KEM: AlgorithmKind<'KEM'>,
): () => Promise<[ publicKey: ArrayBuffer, privateKey: ArrayBuffer ]> => async () => {
	assert(!!crypto.subtle)

	const { publicKey, privateKey } = await (
		crypto.subtle.generateKey(Algorithm[KEM], true, isEncapsulatable(KEM) ? [ 'encapsulateBits', 'decapsulateBits' ] : [ 'deriveBits' ])
	) as webcrypto.CryptoKeyPair

	return Promise.all([
		crypto.subtle.exportKey('spki', publicKey),
		crypto.subtle.exportKey('pkcs8', privateKey),
	])
}

const createEncryptFn = (
	KEM: AlgorithmKind<'KEM'>,
	DEM: AlgorithmKind<'DEM'>,
	generateKeys?: ReturnType<typeof createGenerateKeysFn> | null,
): (
	data: unknown,
	publicKey: ArrayBuffer,
	serialize?: typeof serializeFn | Encoder,
) => Promise<string> => async (data, publicKey, serialize = serializeFn): Promise<string> => {
	assert(!!crypto.subtle)
	assert(publicKey instanceof ArrayBuffer)
	assert(publicKey.byteLength === ByteSize[KEM].SPKI)

	const [ sharedSecret, shareableKey ] = await computeSecret(KEM, publicKey, generateKeys!)
	const [ iv, encryptionKey ] = await deriveSymmetricKeys(KEM, DEM, sharedSecret)
	const serialized = serialize instanceof Encoder ? serialize.encode(data) : serialize(data)

	return crypto.subtle.importKey('raw-secret', encryptionKey, Algorithm[DEM], false, [ 'encrypt' ])
		.then(cipherKey => crypto.subtle.encrypt({ ...Algorithm[DEM], iv }, cipherKey, serialized))
		.then(encrypted => encodeBase64Url(concatBuffers(shareableKey, encrypted)))
}

const createDecryptFn = (
	KEM: AlgorithmKind<'KEM'>,
	DEM: AlgorithmKind<'DEM'>,
): (
	data: string,
	privateKey: ArrayBuffer,
	deserialize?: typeof deserializeFn | Decoder,
) => Promise<unknown> => async (data, privateKey, deserialize = deserializeFn) => {
	assert(!!crypto.subtle)
	assert(typeof data === 'string')
	assert(privateKey instanceof ArrayBuffer)
	assert(privateKey.byteLength === ByteSize[KEM].PKCS8)

	const [ shareableKey, encrypted ] = splitByChunkSizes(data, ByteSize[KEM].SHAREABLE_KEY)
	const [ sharedSecret ] = await computeSecret(KEM, shareableKey, privateKey)
	const [ iv, decryptionKey ] = await deriveSymmetricKeys(KEM, DEM, sharedSecret)

	return crypto.subtle.importKey('raw-secret', decryptionKey, Algorithm[DEM], false, [ 'decrypt' ])
		.then(cipherKey => crypto.subtle.decrypt({ ...Algorithm[DEM], iv }, cipherKey, encrypted))
		.then(decrypted => (deserialize instanceof Decoder ? deserialize.decode(decrypted) : deserialize(decrypted)))
}

export function createIntegratedEncryptionScheme(
	KEM: AlgorithmKind<'KEM'>,
	DEM: AlgorithmKind<'DEM'>,
) {
	const generateKeys = createGenerateKeysFn(KEM)
	const encrypt = createEncryptFn(KEM, DEM, isEncapsulatable(KEM) ? null : generateKeys)
	const decrypt = createDecryptFn(KEM, DEM)

	return { generateKeys, encrypt, decrypt }
}

export default createIntegratedEncryptionScheme
