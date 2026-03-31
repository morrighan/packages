import CORE_JS_PACKAGE_JSON from 'core-js-pure/package.json' with { type: 'json' }
import RUNTIME_PACKAGE_JSON from '@babel/runtime-corejs3/package.json' with { type: 'json' }

// Constants.
const { version: CORE_JS_VERSION } = CORE_JS_PACKAGE_JSON
const { version: RUNTIME_VERSION } = RUNTIME_PACKAGE_JSON

/**
 * @param {import('@babel/core').ConfigAPI} [API]
 * @returns {import('@babel/core').TransformOptions}
 */
export default function configurateBabel(API) {
	API?.assertVersion('^7.29.0')
	API?.cache.never()

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
