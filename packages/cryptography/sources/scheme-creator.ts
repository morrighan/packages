import type { webcrypto } from 'crypto'

// Third-party modules.
import { assert } from '@std/assert'
import { encodeBase64 } from '@std/encoding'
import { encode as encodeFn, decode as decodeFn, Encoder, Decoder } from '@msgpack/msgpack'

// Local helpers.
import { ByteSize, Algorithm, type AlgorithmKind } from '#constants'
import { splitByChunkSizes, concatBuffers, computeSecret, calculateHash } from '#utilities'

const createGenerateKeysFn = (
	keyExchangeAlgorithm: AlgorithmKind<'keyExchange'>,
): () => Promise<[ publicKey: ArrayBuffer, privateKey: ArrayBuffer ]> => async () => {
	assert(!!crypto.subtle)

	const { publicKey, privateKey } = await (
		crypto.subtle.generateKey(Algorithm[keyExchangeAlgorithm], true, [ 'deriveBits' ])
	) as webcrypto.CryptoKeyPair

	return Promise.all([
		crypto.subtle.exportKey('spki', publicKey),
		crypto.subtle.exportKey('pkcs8', privateKey),
	])
}

const createEncryptFn = (
	keyExchangeAlgorithm: AlgorithmKind<'keyExchange'>,
	encryptionAlgorithm: AlgorithmKind<'encryption'>,
	generateKeys: ReturnType<typeof createGenerateKeysFn>,
): (
	data: unknown,
	publicKey: ArrayBuffer,
	encode?: typeof encodeFn | Encoder,
) => Promise<string> => async (data, publicKey, encode = encodeFn): Promise<string> => {
	assert(!!crypto.subtle)
	assert(publicKey instanceof ArrayBuffer)
	assert(publicKey.byteLength === ByteSize[keyExchangeAlgorithm].SPKI)

	const [ shareableKey, ephemeralKey ] = await generateKeys()
	const salt = crypto.getRandomValues(new Uint8Array(ByteSize.SALT))

	const [ iv, encryptionKey ] = await computeSecret(publicKey, ephemeralKey, Algorithm[keyExchangeAlgorithm])
		.then(sharedSecret => calculateHash(sharedSecret, salt))
		.then(hashOfSecret => splitByChunkSizes(hashOfSecret, ByteSize.IV, ByteSize.ENCRYPTION_KEY))

	const encodedData = encode instanceof Encoder ? encode.encode(data) : encode(data)

	const encrypted = await crypto.subtle.importKey('raw-secret', encryptionKey, Algorithm[encryptionAlgorithm], false, [ 'encrypt' ])
		.then(cipherKey => crypto.subtle.encrypt({ ...Algorithm[encryptionAlgorithm], iv }, cipherKey, encodedData))

	return encodeBase64(concatBuffers(shareableKey, salt.buffer, encrypted))
}

const createDecryptFn = (
	keyExchangeAlgorithm: AlgorithmKind<'keyExchange'>,
	encryptionAlgorithm: AlgorithmKind<'encryption'>,
): (
	data: string,
	privateKey: ArrayBuffer,
	decode?: typeof decodeFn | Decoder,
) => Promise<unknown> => async (data, privateKey, decode = decodeFn) => {
	assert(!!crypto.subtle)
	assert(typeof data === 'string')
	assert(privateKey instanceof ArrayBuffer)
	assert(privateKey.byteLength === ByteSize[keyExchangeAlgorithm].PKCS8)

	const [ shareableKey, salt, encrypted ] = splitByChunkSizes(data, ByteSize[keyExchangeAlgorithm].SPKI, ByteSize.SALT)

	const [ iv, decryptionKey ] = await computeSecret(shareableKey, privateKey, Algorithm[keyExchangeAlgorithm])
		.then(sharedSecret => calculateHash(sharedSecret, salt))
		.then(hashOfSecret => splitByChunkSizes(hashOfSecret, ByteSize.IV, ByteSize.ENCRYPTION_KEY))

	const decrypted = await crypto.subtle.importKey('raw-secret', decryptionKey, Algorithm[encryptionAlgorithm], false, [ 'decrypt' ])
		.then(cipherKey => crypto.subtle.decrypt({ ...Algorithm[encryptionAlgorithm], iv }, cipherKey, encrypted))

	return decode instanceof Decoder ? decode.decode(decrypted) : decode(decrypted)
}

export function createIntegratedEncryptionScheme(
	keyExchangeAlgorithm: AlgorithmKind<'keyExchange'>,
	encryptionAlgorithm: AlgorithmKind<'encryption'>,
) {
	const generateKeys = createGenerateKeysFn(keyExchangeAlgorithm)
	const encrypt = createEncryptFn(keyExchangeAlgorithm, encryptionAlgorithm, generateKeys)
	const decrypt = createDecryptFn(keyExchangeAlgorithm, encryptionAlgorithm)

	return { generateKeys, encrypt, decrypt }
}

export default createIntegratedEncryptionScheme
