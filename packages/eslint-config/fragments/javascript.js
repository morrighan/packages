// Node.js built-in APIs.
import path from 'path'
import { fileURLToPath } from 'url'

// ESLint-relevant modules.
import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import TSESLint from 'typescript-eslint'
import promisePlugin from 'eslint-plugin-promise'
import nodePlugin from 'eslint-plugin-n'
import commentsPlugin from '@eslint-community/eslint-plugin-eslint-comments'
import stylisticPlugin from '@stylistic/eslint-plugin'

// Local helpers.
import { configurate, getConfigWithAliasedPluginName } from '../helpers/configurator.js'
import { extendsBaseRule } from '../helpers/base-rule-extender.js'

// Constants.
const extensions = [ '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json' ]

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname ?? path.dirname(fileURLToPath(import.meta.url)),
})

export const configuration = configurate({
	files: [ '**/*.[jt]s?(x)' ],

	extends: [
		...fixupConfigRules(
			compat.extends('airbnb', 'airbnb/hooks'),
		),

		promisePlugin.configs['flat/recommended'],

		getConfigWithAliasedPluginName(
			nodePlugin.configs['flat/recommended'],
			{ originalName: 'n', aliasedName: 'node' },
		),

		getConfigWithAliasedPluginName(
			commentsPlugin.configs.recommended,
			{ originalName: '@eslint-community/eslint-comments', aliasedName: 'eslint-comments' },
			commentsPlugin,
		),
	],

	languageOptions: {
		parser: TSESLint.parser,
		ecmaVersion: 'latest',
		sourceType: 'module',
	},

	plugins: {
		'@stylistic': stylisticPlugin,
	},

	rules: {
		/**
		 * Enforces spaces inside of brackets.
		 *
		 * @see {@link https://eslint.org/docs/rules/array-bracket-spacing}
		 */
		'array-bracket-spacing': [ 'error', 'always' ],

		/**
		 * Enforces parenthesis in arrow function arguments where they can't be omitted.
		 *
		 * @see {@link https://eslint.org/docs/rules/arrow-parens}
		 */
		'arrow-parens': [ 'error', 'as-needed', {
			requireForBlockBody: false,
		} ],

		/**
		 * @see {@link https://eslint.org/docs/rules/camelcase}
		 */
		camelcase: [ 'error', {
			properties: 'never',
		} ],

		/**
		 * Allows trailing commas.
		 *
		 * @see {@link https://eslint.org/docs/rules/comma-dangle}
		 */
		'comma-dangle': [ 'error', 'always-multiline' ],

		/**
		 * Enforces the consistent use of function declarations.
		 *
		 * @see {@link https://eslint.org/docs/rules/func-style}
		 */
		'func-style': [ 'error', 'declaration', {
			allowArrowFunctions: true,
		} ],

		/**
		 * @see {@link https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import}
		 */
		'import/named': 'off',
		'import/namespace': 'off',
		'import/default': 'off',
		'import/no-named-as-default-member': 'off',
		'import/no-unresolved': 'off',

		/**
		 * Enforces consistent use of file extension within the import path.
		 *
		 * @see {@link https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/extensions.md}
		 */
		'import/extensions': [ 'error', 'ignorePackages', {
			checkTypeImports: true,

			pattern: {
				mjs: 'never',
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		} ],

		/**
		 * Allows modules to have too many dependencies.
		 *
		 * @see {@link https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/max-dependencies.md}
		 */
		'import/max-dependencies': 'off',

		/**
		 * Forbids `require()` calls with expressions.
		 *
		 * @see {@link https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md}
		 */
		'import/no-dynamic-require': 'off',

		/**
		 * Forbids the import of external modules that are not declared in the `package.json`.
		 *
		 * @see {@link https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md}
		 */
		'import/no-extraneous-dependencies': [ 'error', extendsBaseRule('import/no-extraneous-dependencies', {
			devDependencies: [
				'configs/**',
				'scripts/**',
				'tests/**',

				'**/*.config.js',
			],

			optionalDependencies: false,
		}) ],

		/**
		 * Enforces a convention in module import order.
		 *
		 * @see {@link https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/order.md}
		 */
		'import/order': [ 'error', {
			groups: [ 'builtin', 'external', [ 'internal', 'parent', 'sibling' ], 'index' ],
		} ],

		/**
		 * Enforces consistent indentation.
		 *
		 * @see {@link https://eslint.org/docs/rules/indent}
		 */
		indent: [ 'error', 'tab', extendsBaseRule('indent', {
			SwitchCase: 0,
			VariableDeclarator: 'first',
		}) ],

		/**
		 * Enforces a maximum line length.
		 *
		 * @see {@link https://eslint.org/docs/rules/max-len}
		 */
		'max-len': [ 'error', 120, 3, extendsBaseRule('max-len', {
			ignoreComments: true,
			ignoreTrailingComments: true,
		}) ],

		/**
		 * @see {@link https://eslint.org/docs/rules/max-statements}
		 */
		'max-statements': [ 'error', 100, {
			ignoreTopLevelFunctions: true,
		} ],

		/**
		 * Allows `continue` statements.
		 *
		 * @see {@link https://eslint.org/docs/rules/no-continue}
		 */
		'no-continue': 'off',

		/**
		 * Forbids reassignment of function parameters.
		 *
		 * @see {@link https://eslint.org/docs/rules/no-param-reassign}
		 */
		'no-param-reassign': [ 'error', extendsBaseRule('no-param-reassign', {
			ignorePropertyModificationsFor: [
				// For non-abbreviated naming style.
				'event',
				'context',

				// For Fastify.
				'reply',
			],
		}, options => {
			// eslint-disable-next-line no-param-reassign
			options.ignorePropertyModificationsFor = [ ...new Set(options.ignorePropertyModificationsFor) ]
		}) ],

		/**
		 * Forbids certain object properties.
		 *
		 * @see {@link https://eslint.org/docs/rules/no-restricted-properties}
		 */
		'no-restricted-properties': [ 'error', ...extendsBaseRule('no-restricted-properties', [
			{
				object: 'document',
				property: 'cookie',
				message: 'Do not use cookies.',
			},

			{
				property: 'forEach',
				message: 'Please use for..of loops instead.',
			},
		]) ],

		/**
		 * Forbids specified syntax.
		 *
		 * @see {@link https://eslint.org/docs/rules/no-restricted-syntax}
		 */
		'no-restricted-syntax': [ 'error', ...extendsBaseRule('no-restricted-syntax', [
			{
				message: 'Do not use the execScript functions.',
				selector: 'CallExpression[name="execScript"]',
			},
		], options => (
			options.filter(({ selector }) => selector !== 'ForOfStatement')
		)),

		],

		/**
		 * Allows to use tabs.
		 *
		 * @see {@link https://eslint.org/docs/rules/no-tabs}
		 */
		'no-tabs': 'off',

		/**
		 * Forbids self assignment.
		 *
		 * @see {@link https://eslint.org/docs/rules/no-self-assign}
		 */
		'no-self-assign': [ 'error', {
			props: false,
		} ],

		/**
		 * Forbids warning comments.
		 *
		 * @see {@link https://eslint.org/docs/rules/no-warning-comments}
		 */
		'no-warning-comments': [ 'warn', {
			location: 'anywhere',
			terms: [ 'BUG', 'HACK', 'FIXME', 'LATER', 'LATER2', 'TODO' ],
		} ],

		/**
		 * Enforces to export with `module.exports`.
		 *
		 * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/exports-style.md}
		 */
		'node/exports-style': [ 'error', 'module.exports' ],

		/**
		 * Forbids import declarations which import non-existence modules.
		 *
		 * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-missing-import.md}
		 */
		'node/no-missing-import': 'off',

		/**
		 * Forbids import declarations which import non-existence modules.
		 *
		 * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-missing-require.md}
		 */
		'node/no-missing-require': 'off',

		/**
		 * Forbids unsupported ECMAScript syntax on the specified version.
		 *
		 * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-syntax.md}
		 */
		'node/no-unsupported-features/es-syntax': 'off',

		/**
		 * Enforces to use `Buffer` with `require('buffer')`.
		 *
		 * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/buffer.md}
		 */
		'node/prefer-global/buffer': [ 'error', 'never' ],

		/**
		 * Enforces to use `console` with `require('console')`.
		 *
		 * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/console.md}
		 */
		'node/prefer-global/console': [ 'error', 'never' ],

		/**
		 * Enforces to use `process` with `require('process')`.
		 *
		 * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/process.md}
		 */
		'node/prefer-global/process': [ 'error', 'never' ],

		/**
		 * Enforces to use `TextDecoder` with `require('util')`.
		 *
		 * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/text-decoder.md}
		 */
		'node/prefer-global/text-decoder': [ 'error', 'never' ],

		/**
		 * Enforces to use `TextEncoder` with `require('util')`.
		 *
		 * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/text-encoder.md}
		 */
		'node/prefer-global/text-encoder': [ 'error', 'never' ],

		/**
		 * Enforces to use `URL` with `require('url')`.
		 *
		 * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url.md}
		 */
		'node/prefer-global/url': [ 'error', 'never' ],

		/**
		 * Enforces to use `URLSearchParams` with `require('url')`.
		 *
		 * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url-search-params.md}
		 */
		'node/prefer-global/url-search-params': [ 'error', 'never' ],

		/**
		 * Enforce consistent line breaks after opening and before closing braces.
		 *
		 * @see {@link https://eslint.org/docs/rules/object-curly-newline}
		 */
		'object-curly-newline': [ 'error', {
			ExportDeclaration: { consistent: true, minProperties: Infinity, multiline: true },
			ImportDeclaration: { consistent: true, minProperties: Infinity, multiline: true },
			ObjectExpression: { consistent: true, minProperties: Infinity, multiline: true },
			ObjectPattern: { consistent: true, minProperties: Infinity, multiline: true },
		} ],

		/**
		 * Enforce consistent linebreak style for operators.
		 *
		 * @see {@link https://eslint.org/docs/rules/operator-linebreak}
		 */
		'operator-linebreak': [ 'error', 'before', ...extendsBaseRule('operator-linebreak', [
			{ overrides: { '=': 'ignore' } },
		]) ],

		// /**
		//  * Allows just one var statement per function.
		//  *
		//  * @see {@link https://eslint.org/docs/rules/one-var}
		//  */
		// 'one-var': [ 'error', 'consecutive' ],

		/**
		 * Prefers destructuring from arrays and objects.
		 *
		 * @see {@link https://eslint.org/docs/rules/prefer-destructuring}
		 */
		'prefer-destructuring': [ 'error', {
			AssignmentExpression: { array: true, object: true },
			VariableDeclarator: { array: false, object: true },
		}, {
			enforceForRenamedProperties: false,
		} ],

		/**
		 * Forbids to use of semicolons instead of ASI
		 *
		 * @see {@link https://eslint.org/docs/rules/semi}
		 */
		semi: [ 'error', 'never' ],

		/**
		 * Requires a whitespace on comment.
		 *
		 * @see {@link https://eslint.org/docs/rules/spaced-comment}
		 **/
		'spaced-comment': [ 'error', 'always', extendsBaseRule('spaced-comment', {
			block: {
				exceptions: [ '*' ],
			},
		}) ],
	},

	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': [ '.ts', '.tsx' ],
		},

		'import/extensions': extensions,
		'import/ignore': [ 'node_modules', '\\.(scss|css|svg|json)$' ],
		'import/core-modules': [],

		'import/resolver': {
			typescript: { extensions },
			node: { extensions },
		},
	},
})

export default configuration
