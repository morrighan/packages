// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-await-in-loop */

// Third-party modules.
import { test, expect, beforeAll } from 'vitest'

// Testing target.
import { generateKeys, encrypt as encryptBase, decrypt as decryptBase } from '@cichol/cryptography'

let encrypt: (data: unknown) => Promise<string>
let decrypt: (data: any) => Promise<unknown>

beforeAll(async () => {
	const [ publicKey, privateKey ] = await generateKeys()

	encrypt = (data: unknown) => encryptBase(data, publicKey)
	decrypt = (data: any) => decryptBase(data as string, privateKey)
})

test('should handle various strings correctly', async () => {
	const strings = [ '', 'Hello, world!', '!@#$%^&*()_+-=[]{}|;:,.<>?', '你好世界😀🌍', 'a'.repeat(1000) ]

	for (const string of strings) {
		const encrypted = await encrypt(string)
		const decrypted = await decrypt(encrypted)

		expect(decrypted).to.equal(string)
	}
})

test('should handle various primitives correctly', async () => {
	const primitives = [ null, true, false, 0 ]

	for (const primitive of primitives) {
		const encrypted = await encrypt(primitive)
		const decrypted = await decrypt(encrypted)

		expect(decrypted).to.equal(primitive)
	}
})

test('should handle various objects correctly', async () => {
	const objects = [ [ 1 ], { string: 'value', number: 1, boolean: true } ]

	for (const object of objects) {
		const encrypted = await encrypt(object)
		const decrypted = await decrypt(encrypted)

		expect(decrypted).to.deep.equal(object)
	}
})

test('should throw error for malformed encrypted data', async () => {
	await expect(decrypt(null)).rejects.toThrow()
	await expect(decrypt('not-valid-encrypted-data')).rejects.toThrow()
})
