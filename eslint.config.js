// ESLint-relevant modules.
import defineConfig from '@cichol/eslint-config'

export default defineConfig({
	ignores: [ '.*', 'coverage', 'legacies', 'packages/*/externals', 'packages/*/dists', 'packages/**/*.d.ts' ],
}, {
	files: [ '**/*.[jt]s?(x)' ],

	languageOptions: {
		parserOptions: {
			projectService: true,
			tsconfigRootDir: import.meta.dirname,
		},
	},
}, {
	files: [ 'packages/*/tests/**/*.ts' ],

	rules: {
		'import/no-extraneous-dependencies': 'off',
		'node/no-extraneous-import': 'off',
	},
}, {
	files: [ 'packages/cryptography/sources/**/*.ts' ],

	rules: {
		'node/no-unsupported-features/node-builtins': 'off',
	},
}, {
	files: [ '*.config.js' ],

	rules: {
		'import/extensions': [ 'error', 'ignorePackages' ],
	},
}, {
	files: [ 'packages/sass-bridge/tests/artifacts/*.ts' ],

	rules: {
		'@typescript-eslint/class-methods-use-this': 'off',
	},
}, {
	files: [ 'packages/shader-compressor/sources/**/*.ts' ],

	rules: {
		'@typescript-eslint/no-unnecessary-type-assertion': 'off',
	},
}, {
	settings: {
		react: {
			version: '19',
		},
	},
})
