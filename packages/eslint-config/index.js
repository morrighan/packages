// Configuration fragments.
import fragmentForJavaScript from '#fragments/javascript'
import fragmentForTypeScript from '#fragments/typescript'
import fragmentForJavaScriptReact from '#fragments/javascript-react'
import fragmentForTypeScriptReact from '#fragments/typescript-react'

/**
 * @param {import('eslint').Linter.Config[]} extraConfigs
 * @returns {import('eslint').Linter.Config[]}
 */
export default function defineConfig(...extraConfigs) {
	const baseConfiguration = [
		...fragmentForJavaScript,
		...fragmentForTypeScript,
		...fragmentForJavaScriptReact,
		...fragmentForTypeScriptReact,
	]

	return [ ...baseConfiguration, ...extraConfigs ]
}
