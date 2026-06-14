// ESLint-relevant modules.
import { defineConfig } from 'eslint/config'
import pluginImport from 'eslint-plugin-import-x'
import pluginNode from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginComments from '@eslint-community/eslint-plugin-eslint-comments'
import pluginStylistic from '@stylistic/eslint-plugin'

// Utilities.
import { extensions } from '#utilities/constants'
import getConfigWithAliasedPluginName from '#utilities/aliased-config-getter'

// Other rules.
import rulesBase from '#rules/base'
import rulesBaseStylistic from '#rules/base-stylistic'
import rulesImport from '#rules/import'
import rulesNode from '#rules/node'

export default defineConfig({
	files: [ '**/*.[jt]s?(x)' ],

	extends: [
		pluginPromise.configs['flat/recommended'],

		getConfigWithAliasedPluginName(
			pluginNode.configs['flat/recommended'],
			{ originalName: 'n', aliasedName: 'node' },
		),

		getConfigWithAliasedPluginName(
			pluginComments.configs.recommended,
			{ originalName: '@eslint-community/eslint-comments', aliasedName: 'eslint-comments' },
			pluginComments,
		),
	],

	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},

	plugins: {
		import: pluginImport,
		'@stylistic': pluginStylistic,
	},

	rules: {
		...rulesBase,
		...rulesBaseStylistic,
		...rulesImport,
		...rulesNode,
	},

	settings: {
		'import/extensions': extensions,
		'import/ignore': [ 'node_modules', '\\.(scss|css|svg|json)$' ],
		'import/core-modules': [],
		'import/resolver': { node: { extensions } },
	},
})
