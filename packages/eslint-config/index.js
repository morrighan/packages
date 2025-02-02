// Configuration fragments.
import { configuration as fragmentForJavaScript } from './fragments/javascript.js'
import { configuration as fragmentForJSX } from './fragments/javascript-react.js'
import { configuration as fragmentForTypeScript } from './fragments/typescript.js'
import { configuration as fragmentForTSX } from './fragments/typescript-react.js'

/**
 * @param {import('eslint').Linter.Config[]} extraConfigs
 * @returns {import('eslint').Linter.Config[]}
 */
export default function defineConfig(...extraConfigs) {
	const baseConfiguration = [
		...fragmentForJavaScript,
		...fragmentForJSX,
		...fragmentForTypeScript,
		...fragmentForTSX,
	]

	return [ ...baseConfiguration, ...extraConfigs ]
}

export { plugin as TSESLintPlugin } from 'typescript-eslint'
export { default as promisePlugin } from 'eslint-plugin-promise'
export { default as nodePlugin } from 'eslint-plugin-n'
export { default as commentsPlugin } from '@eslint-community/eslint-plugin-eslint-comments'
export { default as stylisticPlugin } from '@stylistic/eslint-plugin'
