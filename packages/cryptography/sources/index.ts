// Third-party modules.
import invariant from 'tiny-invariant'

import {
	encode as encodeFn,
	decode as decodeFn,
	Encoder,
	Decoder,
} from '@msgpack/msgpack'

// Local helpers.
import { ByteSize, Algorithm } from '#constants'
import { splitByChunkSizes, concatBuffers, base64FromBuffer, computeSecret, calculateHash } from '#utilities'

export async function generateKeys(): Promise<[ publicKey: ArrayBuffer, privateKey: ArrayBuffer ]> {
	invariant(!!crypto.subtle)

	const { publicKey, privateKey } = await (
		crypto.subtle.generateKey(Algorithm.ECDH, true, [ 'deriveBits' ])
	)

	return Promise.all([
		crypto.subtle.exportKey('spki', publicKey),
		crypto.subtle.exportKey('pkcs8', privateKey),
	])
}

export async function encrypt(
	data: unknown,
	publicKey: ArrayBuffer,
	encode: typeof encodeFn | Encoder = encodeFn,
): Promise<string> {
	invariant(!!crypto.subtle)
	invariant(publicKey instanceof ArrayBuffer)
	invariant(publicKey.byteLength === ByteSize.SECP521R1_SPKI)

	const [ shareableKey, ephemeralKey ] = await generateKeys()
	const salt = crypto.getRandomValues(new Uint8Array(ByteSize.SALT))

	const [ iv, encryptionKey ] = await computeSecret(publicKey, ephemeralKey)
		.then(sharedSecret => calculateHash(sharedSecret, salt))
		.then(hashOfSecret => splitByChunkSizes(hashOfSecret, ByteSize.IV, ByteSize.ENCRYPTION_KEY))

	const encodedData = encode instanceof Encoder ? encode.encode(data) : encode(data)

	const encrypted = await crypto.subtle.importKey('raw', encryptionKey, Algorithm.AES_GCM, false, [ 'encrypt' ])
		.then(cipherKey => crypto.subtle.encrypt({ ...Algorithm.AES_GCM, iv }, cipherKey, encodedData))

	return base64FromBuffer(concatBuffers(shareableKey, salt.buffer, encrypted))
}

export async function decrypt(
	data: string,
	privateKey: ArrayBuffer,
	decode: typeof decodeFn | Decoder = decodeFn,
): Promise<unknown> {
	invariant(!!crypto.subtle)
	invariant(typeof data === 'string')
	invariant(privateKey instanceof ArrayBuffer)
	invariant(privateKey.byteLength === ByteSize.SECP521R1_PKCS8)

	const [ shareableKey, salt, encrypted ] = splitByChunkSizes(data, ByteSize.SECP521R1_SPKI, ByteSize.SALT)

	const [ iv, decryptionKey ] = await computeSecret(shareableKey, privateKey)
		.then(sharedSecret => calculateHash(sharedSecret, salt))
		.then(hashOfSecret => splitByChunkSizes(hashOfSecret, ByteSize.IV, ByteSize.ENCRYPTION_KEY))

	const decrypted = await crypto.subtle.importKey('raw', decryptionKey, Algorithm.AES_GCM, false, [ 'decrypt' ])
		.then(cipherKey => crypto.subtle.decrypt({ ...Algorithm.AES_GCM, iv }, cipherKey, encrypted))

	return decode instanceof Decoder ? decode.decode(decrypted) : decode(decrypted)
}
