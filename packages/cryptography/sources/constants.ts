const _ = Object.freeze

export const ByteSize = _({
	SECP521R1_SPKI: 158,
	SECP521R1_PKCS8: 241,
	SALT: 16,
	IV: 12,
	ENCRYPTION_KEY: 32,
})

export const Algorithm = _({
	ECDH: _({ name: 'ECDH', namedCurve: 'P-521' }),
	AES_GCM: _({ name: 'AES-GCM' }),
	HKDF: _({ name: 'HKDF', hash: 'SHA-512' }),
})
