// Local helpers.
import { configurate } from '../helpers/configurator.js'

export const configuration = configurate({
	files: [ '**/*.[jt]sx' ],

	languageOptions: {
		parserOptions: {
			ecmaFeatures: { jsx: true },
		},
	},

	rules: {
		/**
         * Enforces consistent indentation.
         *
         * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md}
         */
		'react/jsx-indent-props': [ 'error', 'tab' ],

		/**
         * Enforces consistent indentation.
         *
         * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md}
         */
		'react/jsx-indent': [ 'error', 'tab' ],

		/**
         * Restricts file extensions that may contain JSX.
         *
         * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md}
         */
		'react/jsx-filename-extension': [ 'error', { extensions: [ '.jsx', '.tsx' ] } ],

		/**
         * Prefers to use automatic runtime instead of classic runtime.
         *
         * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md}
         */
		'react/jsx-uses-react': 'off',

		/**
         * Prevents multiple class component definition per file.
         *
         * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md}
         */
		'react/no-multi-comp': [ 'error', { ignoreStateless: true } ],

		/**
         * Prefers to use automatic runtime instead of classic runtime.
         *
         * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md}
         */
		'react/react-in-jsx-scope': 'off',

		/**
         * Prefers to use default parameters instead of `defaultProps` definition.
         *
         * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md}
         */
		'react/require-default-props': 'off',

		/**
         * Enforces the state initialization style to be with a class property.
         *
         * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md}
         */
		'react/state-in-constructor': [ 'error', 'never' ],

		/**
         * Enforces where React component static properties should be positioned.
         *
         * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md}
         */
		'react/static-property-placement': [ 'error', 'static public field' ],
	},
})

export default configuration
