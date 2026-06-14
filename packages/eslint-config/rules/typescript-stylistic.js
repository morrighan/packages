/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
	/** @see {@link https://eslint.style/rules/member-delimiter-style} */
	'@stylistic/member-delimiter-style': [ 'error', {
		multiline: { delimiter: 'none', requireLast: true },
		singleline: { delimiter: 'semi', requireLast: false },
		overrides: { typeLiteral: { singleline: { delimiter: 'comma', requireLast: false } } },
	} ],

	/** @see {@link https://eslint.style/rules/type-annotation-spacing} */
	'@stylistic/type-annotation-spacing': 'error',
}

export default rules
