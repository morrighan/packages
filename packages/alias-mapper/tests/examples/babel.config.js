/**
 * @param {import('@babel/core').ConfigAPI} API
 * @returns {import('@babel/core').TransformOptions}
 */
export default function configurateBabel(API) {
	API.assertVersion('^7.26.9')
	API.cache.forever()

	// Configuration fragments.
	const corejs = { version: 3, proposals: true }

	const presets = Object.entries({
		'@babel/preset-env': { bugfixes: true, useBuiltIns: 'usage', targets: { node: 'current' }, modules: false, corejs },
	})

	const plugins = Object.entries({
		[import.meta.resolve('@cichol/alias-mapper')]: {
			basePath: import.meta.dirname,

			rootDirs: [
				'sources/frontend',
			],

			aliases: {
				common: 'sources/common',
				backend: 'sources/backend',
				models: 'sources/backend/models',
			},
		},

		'@babel/plugin-transform-runtime': { regenerator: false, corejs },
	})

	return { presets, plugins }
}
