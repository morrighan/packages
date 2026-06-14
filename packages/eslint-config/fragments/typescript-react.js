// ESLint-relevant modules.
import { defineConfig } from 'eslint/config'

export default defineConfig({
	files: [ '**/*.tsx' ],

	rules: {
		/** @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md} */
		'react/prop-types': 'off',
	},
})
