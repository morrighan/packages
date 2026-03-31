// Node.js built-in APIs.
import { globSync as glob } from 'fs'
import path from 'path'
import process from 'process'

// Third-party modules.
import { defineConfig } from 'vitest/config'
import babel from '@rolldown/plugin-babel'

// Local configurations.
import configurateBabel from './babel.config.js'

// Constants.
const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND

export default defineConfig({
	plugins: [
		babel({
			presets: [ {
				preset: () => configurateBabel(),
				rolldown: { filter: { moduleType: [ 'ts' ] } },
			} ],
		}),
	],

	test: {
		coverage: {
			enabled: true,
			include: [ 'packages/**.{js,ts}' ],
			exclude: [ '**/externals' ],
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

		reporters: [ process.env.GITHUB_ACTIONS ? 'github-actions' : 'default' ],
		testTimeout: ONE_MINUTE,
	},
})
