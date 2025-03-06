// Constants.
const { default: { version: CORE_JS_VERSION } } = await import('core-js-pure/package.json', { with: { type: 'json' } })
const { default: { version: RUNTIME_VERSION } } = await import('@babel/runtime-corejs3/package.json', { with: { type: 'json' } })

/**
 * @param {import('@babel/core').ConfigAPI} API
 * @returns {import('@babel/core').TransformOptions}
 */
export default function configurateBabel(API) {
	API.assertVersion('^7.26.9')
	API.cache.never()

	return {
		presets: Object.entries({
			'@babel/preset-env': { bugfixes: true, targets: { node: 'current' }, modules: false },
			'@babel/preset-typescript': {},
		}),

		plugins: Object.entries({
			'babel-plugin-polyfill-corejs3': { method: 'usage-pure', version: CORE_JS_VERSION, proposals: true },
			'@babel/plugin-proposal-decorators': { version: '2023-11' },
			'@babel/plugin-transform-runtime': { regenerator: false, version: RUNTIME_VERSION },
		}),
	}
}
