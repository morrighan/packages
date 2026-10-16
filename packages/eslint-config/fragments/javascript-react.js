// ESLint-relevant modules.
import { defineConfig } from 'eslint/config'
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y-x'

// Utilities.
import getConfigWithAliasedPluginName from '#utilities/aliased-config-getter'

// Other rules.
import rulesBase from '#rules/base'
import rulesReact from '#rules/react'
import rulesReactStylistic from '#rules/react-stylistic'
import rulesJsxA11y from '#rules/jsx-a11y'

export default defineConfig({
	files: [ '**/*.[jt]sx' ],

	extends: [
		fixupConfigRules(
			pluginReact.configs.flat.recommended,
		),

		pluginReactHooks.configs.flat.recommended,

		getConfigWithAliasedPluginName(
			pluginJsxA11y.configs.recommended,
			{ originalName: 'jsx-a11y-x', aliasedName: 'jsx-a11y' },
		),
	],

	languageOptions: {
		parserOptions: {
			ecmaFeatures: { jsx: true },
		},
	},

	plugins: {
		react: fixupPluginRules(pluginReact),
	},

	rules: {
		'no-underscore-dangle': [ rulesBase['no-underscore-dangle'][0], {
			...rulesBase['no-underscore-dangle'][1],
			allow: rulesBase['no-underscore-dangle'][1].allow.concat([ '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' ]),
		} ],

		...rulesReact,
		...rulesReactStylistic,
		...rulesJsxA11y,
	},
})
