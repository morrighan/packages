// Local helpers.
import configurate from '#helpers/configurator'

export default configurate({
	files: [ '**/*.tsx' ],

	rules: {
		/** @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md} */
		'react/prop-types': 'off',
	},
})
