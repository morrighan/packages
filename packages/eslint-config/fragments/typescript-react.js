// ESLint-relevant modules.
import { defineConfig } from 'eslint/config'

// Other rules.
import rulesReact from '#rules/react'

export default defineConfig({
	files: [ '**/*.tsx' ],

	rules: {
		'class-methods-use-this': 'off',
		'@typescript-eslint/class-methods-use-this': rulesReact['class-methods-use-this'],

		/** @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md} */
		'react/prop-types': 'off',
	},
})
