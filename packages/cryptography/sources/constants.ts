// Helper functions.
const _ = Object.freeze
const $ = <T, const U extends string = ''>(
	X: T,
	$brand?: U, // eslint-disable-line @typescript-eslint/no-unused-vars
) => _(X) as Readonly<T> & { $brand: U }

// Type definitions.
type Algorithm = typeof Algorithm

export type AlgorithmKind<Brand extends string> =
	| { [P in keyof Algorithm]: Algorithm[P] extends { $brand: Brand } ? P : never }[keyof Algorithm]

// Constants.
export const ByteSize = _({
	ECDH_P521: _({ SPKI: 158, PKCS8: 241 }),
	X25519: _({ SPKI: 44, PKCS8: 48 }),
	SALT: 16,
	IV: 12,
	ENCRYPTION_KEY: 32,
})

export const Algorithm = _({
	ECDH_P521: $({ name: 'ECDH', namedCurve: 'P-521' }, 'keyExchange'),
	X25519: $({ name: 'X25519' }, 'keyExchange'),
	AES_GCM: $({ name: 'AES-GCM' }, 'encryption'),
	CHACHA20_POLY1305: $({ name: 'ChaCha20-Poly1305' }, 'encryption'),
	HKDF: $({ name: 'HKDF', hash: 'SHA-512' }, 'keyDerivation'),
})
