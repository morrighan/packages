// Configuration fragments.
import fragmentForJavaScript from '#fragments/javascript'
import fragmentForJSX from '#fragments/javascript-react'
import fragmentForTypeScript from '#fragments/typescript'
import fragmentForTSX from '#fragments/typescript-react'

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
