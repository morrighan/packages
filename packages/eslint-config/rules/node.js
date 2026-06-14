/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
	/** @see {@link https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/exports-style.md} */
	'node/exports-style': [ 'error', 'module.exports' ],

	/** @see {@link https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-missing-import.md} */
	'node/no-missing-import': 'off',

	/** @see {@link https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-missing-require.md} */
	'node/no-missing-require': 'off',

	/** @see {@link https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unsupported-features/es-syntax.md} */
	'node/no-unsupported-features/es-syntax': 'off',

	/** @see {@link https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/buffer.md} */
	'node/prefer-global/buffer': [ 'error', 'never' ],

	/** @see {@link https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/console.md} */
	'node/prefer-global/console': [ 'error', 'never' ],

	/** @see {@link https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/process.md} */
	'node/prefer-global/process': [ 'error', 'never' ],

	/** @see {@link https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/text-decoder.md} */
	'node/prefer-global/text-decoder': [ 'error', 'never' ],

	/** @see {@link https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/text-encoder.md} */
	'node/prefer-global/text-encoder': [ 'error', 'never' ],

	/** @see {@link https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/url.md} */
	'node/prefer-global/url': [ 'error', 'never' ],

	/** @see {@link https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/url-search-params.md} */
	'node/prefer-global/url-search-params': [ 'error', 'never' ],
}

export default rules
