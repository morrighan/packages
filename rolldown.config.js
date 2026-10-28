// Node.js built-in APIs.
import path from 'path'

// Rolldown plugins.
import babel from '@rolldown/plugin-babel'

// Local configurations.
import configurateBabel from './babel.config.js'

/**
 * @param {([ packageName: string, extraOutputOptions?: import('rolldown').OutputOptions ][]} definitions
 * @returns {import('rolldown').RolldownOptions[]}
 */
const configurateRolldown = (...definitions) => definitions.map((
	[ packageName, extraOutputOptions ],
) => ({
	input: `./packages/${packageName}/sources/index.ts`,

	output: {
		dir: `./packages/${packageName}/dists`,
		format: 'esm',
		sourcemap: 'inline',

		...extraOutputOptions,
	},

	resolve: {
		extensions: [ '.ts', '.mjs', '.js', '.json', '.node' ],
	},

	plugins: [
		babel(configurateBabel()),
	],

	external: (id, parentId) => [
		(id === '#bindings' && parentId.startsWith(path.resolve(import.meta.dirname, `./packages/${packageName}`))),
		(!path.isAbsolute(id) && !/^[.#]{1}/.test(id)),
		/node_modules|dists/.test(id),
	].some(Boolean),
}))

export default configurateRolldown(
	[ 'cryptography', { preserveModules: true } ],
	[ 'logger' ],
	[ 'sass-bridge' ],
	[ 'shader-compressor' ],
)
