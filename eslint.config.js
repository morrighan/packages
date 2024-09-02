// Node.js built-in APIs.
import path from 'path';
import { fileURLToPath } from 'url';

// ESLint-relevant modules.
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

// Constants.
const dirname = import.meta.dirname ?? path.dirname(fileURLToPath(import.meta.url));
const aliasMapper = path.resolve(dirname, 'packages/alias-mapper');
const compat = new FlatCompat({ baseDirectory: dirname });

/** @type {import('eslint').Linter.FlatConfig} */
export default [ {
    files: [ '**/*.{js,ts}' ],

    languageOptions: {
        parserOptions: {
            project: 'tsconfig.json',
            tsconfigRootDir: '.'
        }
    }
}, {
    ignores: [ 'packages/**/releases', 'packages/**/*.d.ts' ]
}, ...compat.extends('@cichol'), {
    rules: {
        'no-restricted-exports': 'off',
        'no-shadow': 'off'
    }
}, {
    files: [ 'packages/*/tests/*.ts' ],

    rules: {
        'import/no-extraneous-dependencies': 'off',
        'node/no-extraneous-import': 'off'
    }
}, {
    files: [ 'packages/alias-mapper/tests/examples/**/*.js' ],

    rules: {
        'import/extensions': [ 'error', 'never' ]
    },

    settings: {
        'import/resolver': {
            [aliasMapper]: {
                basePath: path.resolve(aliasMapper, 'tests/examples'),

                rootDirs: [
                    'sources/frontend'
                ],

                aliases: {
                    common: 'sources/common',
                    backend: 'sources/backend',
                    models: 'sources/backend/models'
                },

                extensions: [ '.js', '.ts', '.json' ]
            },

            node: { extensions: [ '.js', '.ts', '.json' ] }
        }
    }
}, {
    files: [ 'packages/alias-mapper/tests/examples/babel.config.js', 'packages/eslint-config/**/*.js' ],

    languageOptions: {
        globals: { ...globals.commonjs, ...globals.node }
    }
}, {
    files: [ '*.config.js', 'scripts/register.js' ],

    rules: {
        'node/no-unpublished-import': 'off'
    }
} ];
