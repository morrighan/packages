import { createIntegratedEncryptionScheme } from '#scheme-creator'

export const { generateKeys, encrypt, decrypt } = createIntegratedEncryptionScheme(
	'ML_KEM_1024',
	'CHACHA20_POLY1305',
)
