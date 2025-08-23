// Node.js built-in APIs.
import path from 'path'

// Third-party modules.
import { defineConfig } from 'vitest/config'
import { globSync as glob } from 'glob'

// Constants.
const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND

export default defineConfig({
	test: {
		coverage: {
			enabled: true,
			include: [ 'packages' ],
			reporter: [ 'lcov' ],
		},

		include: [ 'tests/**/*.ts', 'sources/**/*.spec.ts' ],
		exclude: [ 'tests/(artifacts|examples)/**/*.ts' ],

		projects: glob('packages/*')
			.map(projectFolder => /** @type {import('vitest/config').TestProjectConfiguration} */ ({
				extends: true,

				test: {
					name: `@cichol/${path.basename(projectFolder)}`,
					dir: projectFolder,
				},
			})),

		reporters: [ 'verbose' ],
		testTimeout: ONE_MINUTE,
	},
})
