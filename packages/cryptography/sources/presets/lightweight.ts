import { createIntegratedEncryptionScheme } from '#scheme-creator'

export const { generateKeys, encrypt, decrypt } = createIntegratedEncryptionScheme(
	'X25519',
	'CHACHA20_POLY1305',
)
