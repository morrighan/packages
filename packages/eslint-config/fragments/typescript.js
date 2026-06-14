// ESLint-relevant modules.
import TSESLint from 'typescript-eslint'

// Local helpers.
import configurate from '#helpers/configurator'
import { mapExtensionRules } from '#helpers/extension-rules-mapper'

export default configurate({
	files: [ '**/*.ts?(x)' ],

	extends: [
		TSESLint.configs.eslintRecommended,
		...TSESLint.configs.recommended,
		...TSESLint.configs.recommendedTypeChecked,
	],

	plugins: {
		'@typescript-eslint': TSESLint.plugin,
	},

	rules: Object.assign(mapExtensionRules({
		/** @see {@link https://eslint.org/docs/rules/no-empty-function} */
		'no-empty-function': [ 'error', {
			allow: [ 'arrowFunctions', 'functions', 'methods' ],
		} ],

		/** @see {@link https://eslint.org/docs/rules/no-unused-vars} */
		'no-unused-vars': [ 'error', {
			vars: 'all',
			args: 'after-used',
			ignoreRestSiblings: true,
		} ],

		/** @see {@link https://eslint.org/docs/rules/no-shadow} */
		'no-shadow': 'error',

		/** @see {@link https://eslint.org/docs/rules/require-await} */
		'require-await': 'off',

	}), {

		/** @see {@link https://typescript-eslint.io/rules/consistent-type-assertions} */
		'@typescript-eslint/consistent-type-assertions': [
			'error',
			{
				assertionStyle: 'as',
				objectLiteralTypeAssertions: 'allow',
			},
		],

		/** @see {@link https://typescript-eslint.io/rules/member-delimiter-style} */
		'@typescript-eslint/member-delimiter-style': [ 'error', {
			multiline: { delimiter: 'none', requireLast: true },
			singleline: { delimiter: 'semi', requireLast: false },

			overrides: {
				typeLiteral: {
					singleline: { delimiter: 'comma', requireLast: false },
				},
			},
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

		/** @see {@link https://typescript-eslint.io/rules/no-unnecessary-type-assertion} */
		'@typescript-eslint/restrict-template-expressions': 'off',

		/** @see {@link https://typescript-eslint.io/rules/type-annotation-spacing} */
		'@typescript-eslint/type-annotation-spacing': 'error',
	}),
})
