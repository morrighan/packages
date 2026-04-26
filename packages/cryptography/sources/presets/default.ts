import { createIntegratedEncryptionScheme } from '#scheme-creator'

export const { generateKeys, encrypt, decrypt } = createIntegratedEncryptionScheme(
	'ECDH_P521',
	'AES_GCM',
)
