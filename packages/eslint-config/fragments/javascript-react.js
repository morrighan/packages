// ESLint-relevant modules.
import reactHooksPlugin from 'eslint-plugin-react-hooks'

// Local helpers.
import configurate from '#helpers/configurator'

export default configurate({
	files: [ '**/*.[jt]sx' ],

	extends: [
		reactHooksPlugin.configs.flat.recommended,
	],

	languageOptions: {
		parserOptions: {
			ecmaFeatures: { jsx: true },
		},
	},

	rules: {
		/** @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md} */
		'react/jsx-indent-props': [ 'error', 'tab' ],

		/** @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md} */
		'react/jsx-indent': [ 'error', 'tab' ],

		/** @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md} */
		'react/jsx-filename-extension': [ 'error', { extensions: [ '.jsx', '.tsx' ] } ],

		/** @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md} */
		'react/jsx-uses-react': 'off',

		/** @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md} */
		'react/no-multi-comp': [ 'error', { ignoreStateless: true } ],

		/** @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md} */
		'react/react-in-jsx-scope': 'off',

		/** @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md} */
		'react/require-default-props': 'off',

		/** @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md} */
		'react/state-in-constructor': [ 'error', 'never' ],

		/** @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md} */
		'react/static-property-placement': [ 'error', 'static public field' ],
	},
})
