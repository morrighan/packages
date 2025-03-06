// Node.js built-in APIs.
import path from 'path'
import { fileURLToPath } from 'url'

// ESLint-relevant modules.
import defineConfig from '@cichol/eslint-config'

// Constants.
const dirname = import.meta.dirname ?? path.dirname(fileURLToPath(import.meta.url))
const aliasMapper = path.resolve(dirname, 'packages/alias-mapper')

export default defineConfig({
	ignores: [ 'coverage', 'packages/*/dists', 'packages/**/*.d.ts' ],
}, {
	files: [ '**/*.[jt]s?(x)' ],

	languageOptions: {
		parserOptions: {
			project: 'tsconfig.json',
			tsconfigRootDir: '.',
		},
	},
}, {
	files: [ 'packages/*/tests/**/*.ts' ],

	rules: {
		'import/no-extraneous-dependencies': 'off',
		'node/no-extraneous-import': 'off',
	},
}, {
	files: [ 'packages/alias-mapper/tests/examples/**/*.js' ],

	rules: {
		'import/extensions': [ 'error', 'never' ],
	},

	settings: {
		'import/resolver': {
			'@cichol/alias-mapper': {
				basePath: path.resolve(aliasMapper, 'tests/examples'),

				rootDirs: [
					'sources/frontend',
				],

				aliases: {
					common: 'sources/common',
					backend: 'sources/backend',
					models: 'sources/backend/models',
				},

				extensions: [ '.js', '.ts', '.json' ],
			},

			node: { extensions: [ '.js', '.ts', '.json' ] },
		},
	},
}, {
	files: [ 'packages/eslint-config/**/*.js' ],

	rules: {
		'import/extensions': 'off',
	},
}, {
	files: [ 'packages/sass-bridge/tests/artifacts/*.ts' ],

	rules: {
		'@typescript-eslint/class-methods-use-this': 'off',
	},
}, {
	settings: {
		react: {
			version: '19',
		},
	},
})
