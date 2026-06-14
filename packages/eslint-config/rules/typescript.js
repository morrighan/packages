// Other rules.
import rulesBase from '#rules/base'

/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
	'class-methods-use-this': 'off',
	'@typescript-eslint/class-methods-use-this': rulesBase['class-methods-use-this'],

	'consistent-return': 'off',
	'@typescript-eslint/consistent-return': rulesBase['consistent-return'],

	'default-param-last': 'off',
	'@typescript-eslint/default-param-last': rulesBase['default-param-last'],

	'dot-notation': 'off',
	'@typescript-eslint/dot-notation': rulesBase['dot-notation'],

	'init-declarations': 'off',
	'@typescript-eslint/init-declarations': rulesBase['init-declarations'],

	'max-params': 'off',
	'@typescript-eslint/max-params': rulesBase['max-params'],

	'no-array-constructor': 'off',
	'@typescript-eslint/no-array-constructor': rulesBase['no-array-constructor'],

	'no-dupe-class-members': 'off',
	'@typescript-eslint/no-dupe-class-members': rulesBase['no-dupe-class-members'],

	'no-empty-function': 'off',
	'@typescript-eslint/no-empty-function': rulesBase['no-empty-function'],

	'no-implied-eval': 'off',
	'@typescript-eslint/no-implied-eval': rulesBase['no-implied-eval'],

	'no-invalid-this': 'off',
	'@typescript-eslint/no-invalid-this': rulesBase['no-invalid-this'],

	'no-loop-func': 'off',
	'@typescript-eslint/no-loop-func': rulesBase['no-loop-func'],

	'no-loss-of-precision': 'off',
	'@typescript-eslint/no-loss-of-precision': rulesBase['no-loss-of-precision'],

	'no-magic-numbers': 'off',
	'@typescript-eslint/no-magic-numbers': rulesBase['no-magic-numbers'],

	'no-restricted-imports': 'off',
	'@typescript-eslint/no-restricted-imports': rulesBase['no-restricted-imports'],

	'no-shadow': 'off',
	'@typescript-eslint/no-shadow': rulesBase['no-shadow'],

	'no-unused-expressions': 'off',
	'@typescript-eslint/no-unused-expressions': rulesBase['no-unused-expressions'],

	'no-unused-private-class-members': 'off',
	'@typescript-eslint/no-unused-private-class-members': rulesBase['no-unused-private-class-members'],

	'no-unused-vars': 'off',
	'@typescript-eslint/no-unused-vars': rulesBase['no-unused-vars'],

	'no-use-before-define': 'off',
	'@typescript-eslint/no-use-before-define': rulesBase['no-use-before-define'],

	'no-useless-constructor': 'off',
	'@typescript-eslint/no-useless-constructor': rulesBase['no-useless-constructor'],

	'prefer-destructuring': 'off',
	'@typescript-eslint/prefer-destructuring': rulesBase['prefer-destructuring'],

	'prefer-promise-reject-errors': 'off',
	'@typescript-eslint/prefer-promise-reject-errors': rulesBase['prefer-promise-reject-errors'],

	'require-await': 'off',
	'@typescript-eslint/require-await': rulesBase['require-await'],

	/** @see {@link https://typescript-eslint.io/rules/consistent-type-assertions} */
	'@typescript-eslint/consistent-type-assertions': [ 'error', {
		assertionStyle: 'as',
		objectLiteralTypeAssertions: 'allow',
	} ],

	/** @see {@link https://typescript-eslint.io/rules/member-delimiter-style} */
	'@stylistic/member-delimiter-style': [ 'error', {
		multiline: { delimiter: 'none', requireLast: true },
		singleline: { delimiter: 'semi', requireLast: false },
		overrides: { typeLiteral: { singleline: { delimiter: 'comma', requireLast: false } } },
	} ],

	/** @see {@link https://typescript-eslint.io/rules/member-ordering} */
	'@typescript-eslint/member-ordering': 'error',

	/** @see {@link https://typescript-eslint.io/rules/naming-convention} */
	'@typescript-eslint/naming-convention': [ 'error', {
		selector: 'interface',
		format: [ 'PascalCase' ],
		custom: { regex: '^I[A-Z]', match: false },
	} ],

	/** @see {@link https://typescript-eslint.io/rules/no-empty-interface} */
	'@typescript-eslint/no-empty-interface': 'off',

	/** @see {@link https://typescript-eslint.io/rules/no-explicit-any} */
	'@typescript-eslint/no-explicit-any': 'off',

	/** @see {@link https://typescript-eslint.io/rules/no-redeclare} */
	'@typescript-eslint/no-redeclare': 'off',

	/** @see {@link https://typescript-eslint.io/rules/no-unsafe-assignment} */
	'@typescript-eslint/no-unsafe-assignment': 'off',

	/** @see {@link https://typescript-eslint.io/rules/no-unsafe-call} */
	'@typescript-eslint/no-unsafe-call': 'off',

	/** @see {@link https://typescript-eslint.io/rules/no-unsafe-member-access} */
	'@typescript-eslint/no-unsafe-member-access': 'off',

	/** @see {@link https://typescript-eslint.io/rules/no-unsafe-return} */
	'@typescript-eslint/no-unsafe-return': 'off',

	/** @see {@link https://typescript-eslint.io/rules/prefer-optional-chain} */
	'@typescript-eslint/prefer-optional-chain': 'error',

	/** @see {@link https://typescript-eslint.io/rules/prefer-nullish-coalescing} */
	'@typescript-eslint/prefer-nullish-coalescing': 'error',

	/** @see {@link https://typescript-eslint.io/rules/prefer-string-starts-ends-with} */
	'@typescript-eslint/prefer-string-starts-ends-with': 'error',

	/** @see {@link https://typescript-eslint.io/rules/restrict-template-expressions} */
	'@typescript-eslint/restrict-template-expressions': 'off',

	/** @see {@link https://typescript-eslint.io/rules/type-annotation-spacing} */
	'@stylistic/type-annotation-spacing': 'error',
}

export default rules
