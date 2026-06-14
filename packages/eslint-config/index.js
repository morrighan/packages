// Configuration fragments.
import fragmentForJavaScript from '#fragments/javascript'
import fragmentForTypeScript from '#fragments/typescript'
import fragmentForJSX from '#fragments/javascript-react'
import fragmentForTSX from '#fragments/typescript-react'

/**
 * @param {import('eslint').Linter.Config[]} extraConfigs
 * @returns {import('eslint').Linter.Config[]}
 */
export default function defineConfig(...extraConfigs) {
	const baseConfiguration = [
		...fragmentForJavaScript,
		...fragmentForTypeScript,
		...fragmentForJSX,
		...fragmentForTSX,
	]

	return [ ...baseConfiguration, ...extraConfigs ]
}
