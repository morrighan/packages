// ESLint-relevant modules.
import { defineConfig } from 'eslint/config'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'

// Other rules.
import rulesBase from '#rules/base'
import rulesReact from '#rules/react'
import rulesReactStylistic from '#rules/react-stylistic'
import rulesJsxA11y from '#rules/jsx-a11y'

export default defineConfig({
	files: [ '**/*.[jt]sx' ],

	extends: [
		pluginReact.configs.flat.recommended,
		pluginReactHooks.configs.flat.recommended,
		pluginJsxA11y.flatConfigs.recommended,
	],

	languageOptions: {
		parserOptions: {
			ecmaFeatures: { jsx: true },
		},
	},

	plugins: {
		react: pluginReact,
	},

	rules: {
		'no-underscore-dangle': [ rulesBase['no-underscore-dangle'][0], {
			...rulesBase['no-underscore-dangle'][1],
			allow: rulesBase['no-underscore-dangle'][1].allow.concat([ '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' ]),
		} ],

		'class-methods-use-this': [ 'error', {
			exceptMethods: [
				'render',
				'getInitialState',
				'getDefaultProps',
				'getChildContext',
				'componentWillMount',
				'UNSAFE_componentWillMount',
				'componentDidMount',
				'componentWillReceiveProps',
				'UNSAFE_componentWillReceiveProps',
				'shouldComponentUpdate',
				'componentWillUpdate',
				'UNSAFE_componentWillUpdate',
				'componentDidUpdate',
				'componentWillUnmount',
				'componentDidCatch',
				'getSnapshotBeforeUpdate',
			],
		} ],

		...rulesReact,
		...rulesReactStylistic,
		...rulesJsxA11y,
	},
})
