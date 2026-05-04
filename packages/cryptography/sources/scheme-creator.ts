import type { webcrypto } from 'crypto'

// Third-party modules.
import { assert } from '@std/assert'
import { encodeBase64Url } from '@std/encoding'
import { encode as encodeFn, decode as decodeFn, Encoder, Decoder } from '@msgpack/msgpack'

// Local helpers.
import { ByteSize, Algorithm, type AlgorithmKind, isEncapsulatable } from '#constants'
import { splitByChunkSizes, concatBuffers, computeSecret, calculateHash } from '#utilities'

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
	encode?: typeof encodeFn | Encoder,
) => Promise<string> => async (data, publicKey, encode = encodeFn): Promise<string> => {
	assert(!!crypto.subtle)
	assert(publicKey instanceof ArrayBuffer)
	assert(publicKey.byteLength === ByteSize[KEM].SPKI)

	const salt = crypto.getRandomValues(new Uint8Array(ByteSize.SALT))
	const [ sharedSecret, shareableKey ] = await computeSecret(KEM, publicKey, generateKeys!)

	const [ iv, encryptionKey ] = await calculateHash(sharedSecret, salt)
		.then(hashOfSecret => splitByChunkSizes(hashOfSecret, ByteSize.IV, ByteSize.ENCRYPTION_KEY))

	const encodedData = encode instanceof Encoder ? encode.encode(data) : encode(data)

	const encrypted = await crypto.subtle.importKey('raw-secret', encryptionKey, Algorithm[DEM], false, [ 'encrypt' ])
		.then(cipherKey => crypto.subtle.encrypt({ ...Algorithm[DEM], iv }, cipherKey, encodedData))

	return encodeBase64Url(concatBuffers(shareableKey, salt.buffer, encrypted))
}

const createDecryptFn = (
	KEM: AlgorithmKind<'KEM'>,
	DEM: AlgorithmKind<'DEM'>,
): (
	data: string,
	privateKey: ArrayBuffer,
	decode?: typeof decodeFn | Decoder,
) => Promise<unknown> => async (data, privateKey, decode = decodeFn) => {
	assert(!!crypto.subtle)
	assert(typeof data === 'string')
	assert(privateKey instanceof ArrayBuffer)
	assert(privateKey.byteLength === ByteSize[KEM].PKCS8)

	const [ shareableKey, salt, encrypted ] = splitByChunkSizes(data, ByteSize[KEM].SHAREABLE_KEY, ByteSize.SALT)
	const [ sharedSecret ] = await computeSecret(KEM, shareableKey, privateKey)

	const [ iv, decryptionKey ] = await calculateHash(sharedSecret, salt)
		.then(hashOfSecret => splitByChunkSizes(hashOfSecret, ByteSize.IV, ByteSize.ENCRYPTION_KEY))

	const decrypted = await crypto.subtle.importKey('raw-secret', decryptionKey, Algorithm[DEM], false, [ 'decrypt' ])
		.then(cipherKey => crypto.subtle.decrypt({ ...Algorithm[DEM], iv }, cipherKey, encrypted))

	return decode instanceof Decoder ? decode.decode(decrypted) : decode(decrypted)
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
