// ESLint-relevant modules.
import { defineConfig } from 'eslint/config'
import TSESLint from 'typescript-eslint'

// Utilities.
import { extensions } from '#utilities/constants'

// Other rules.
import rulesTypeScript from '#rules/typescript'
import rulesTypeScriptStylistic from '#rules/typescript-stylistic'

export default defineConfig({
	files: [ '**/*.ts?(x)' ],

	extends: [
		TSESLint.configs.eslintRecommended,
		...TSESLint.configs.recommended,
		...TSESLint.configs.recommendedTypeChecked,
	],

	languageOptions: {
		parser: TSESLint.parser,
	},

	plugins: {
		'@typescript-eslint': TSESLint.plugin,
	},

	rules: {
		...rulesTypeScript,
		...rulesTypeScriptStylistic,
	},

	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': [ '.ts', '.tsx' ],
		},

		'import/resolver': { typescript: { extensions } },
	},
})
