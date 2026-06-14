// Utilities.
import { devDependencies } from '#utilities/constants'

/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
	'import/consistent-type-specifier-style': 'off',
	'import/dynamic-import-chunkname': 'off',
	'import/enforce-node-protocol-usage': 'off',
	'import/export': 'error',
	'import/exports-last': 'off',

	'import/extensions': [ 'error', 'ignorePackages', {
		checkTypeImports: true,
		pattern: Object.fromEntries([ 'mjs', 'js', 'jsx', 'ts', 'tsx' ].map(extension => ([ extension, 'never' ]))),
	} ],

	'import/first': 'error',
	'import/group-exports': 'off',
	'import/imports-first': 'off',
	'import/max-dependencies': 'off',
	'import/newline-after-import': 'error',
	'import/no-absolute-path': 'error',
	'import/no-amd': 'error',
	'import/no-anonymous-default-export': 'off',
	'import/no-commonjs': 'off',
	'import/no-cycle': [ 'error', { maxDepth: Number.POSITIVE_INFINITY, ignoreExternal: true } ],
	'import/no-default-export': 'off',
	'import/no-deprecated': 'off',
	'import/no-duplicates': 'error',
	'import/no-dynamic-require': 'off',
	'import/no-empty-named-blocks': 'off',
	'import/no-extraneous-dependencies': [ 'error', { devDependencies, optionalDependencies: false } ],
	'import/no-import-module-exports': [ 'error', { exceptions: [] } ],
	'import/no-internal-modules': 'off',
	'import/no-mutable-exports': 'error',
	'import/no-named-as-default': 'error',
	'import/no-named-default': 'error',
	'import/no-named-export': 'off',
	'import/no-namespace': 'off',
	'import/no-nodejs-modules': 'off',
	'import/no-relative-packages': 'error',
	'import/no-relative-parent-imports': 'off',
	'import/no-restricted-paths': 'off',
	'import/no-self-import': 'error',
	'import/no-unassigned-import': 'off',
	'import/no-unused-modules': 'off',
	'import/no-useless-path-segments': [ 'error', { commonjs: true } ],
	'import/no-webpack-loader-syntax': 'error',
	'import/order': [ 'error', { groups: [ 'builtin', 'external', [ 'internal', 'parent', 'sibling' ], 'index' ] } ],
	'import/prefer-default-export': 'error',
	'import/unambiguous': 'off',

	/** @see {@link https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import} */
	'import/default': 'off',
	'import/named': 'off',
	'import/namespace': 'off',
	'import/no-named-as-default-member': 'off',
	'import/no-unresolved': 'off',
}

export default rules
