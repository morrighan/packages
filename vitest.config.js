// Node.js built-in APIs.
import path from 'path'

// Third-party modules.
import { defineConfig } from 'vitest/config'
import { globSync as glob } from 'glob'

export default defineConfig({
	test: {
		coverage: {
			enabled: true,
			include: [ 'packages' ],
			reporter: [ 'lcov' ],
		},

		workspace: glob('packages/*')
			.map(projectFolder => /** @type {import('vitest/config').TestProjectConfiguration} */ ({
				extends: true,

				test: {
					name: `@cichol/${path.basename(projectFolder)}`,
					include: [ path.resolve(projectFolder, 'tests/*.ts') ],
				},
			})),

		reporters: [ 'verbose' ],
		testTimeout: 10000,
	},
})
