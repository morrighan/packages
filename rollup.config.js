// Rollup plugins.
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

// Constants.
const extensions = [ '.ts', '.mjs', '.js', '.json', '.node' ]

/**
 * @param {([ packageName: string, extraOutputOptions?: import('rollup').OutputOptions ][]} definitions
 * @returns {import('rollup').RollupOptions[]}
 */
const configurateRollup = (...definitions) => definitions.map((
	[ packageName, extraOutputOptions ],
) => ({
	input: `./packages/${packageName}/sources/index.ts`,

	output: {
		file: `./packages/${packageName}/dists/index.js`,
		format: 'esm',
		sourcemap: 'inline',

		...extraOutputOptions,
	},

	plugins: [
		resolve({ extensions }),
		babel({ extensions, babelHelpers: 'runtime' }),
	],

	external: source => /node_modules|dists/.test(source),
}))

export default configurateRollup(
	[ 'cryptography' ],
	[ 'logger' ],
	[ 'sass-bridge' ],
	[ 'shader-compressor' ],
)
