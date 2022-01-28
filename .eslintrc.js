/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    extends: './packages/eslint-config/index.js',

    parserOptions: {
        project: 'tsconfig.lint.json',
        tsconfigRootDir: '.'
    },

    rules: {
        'no-restricted-exports': 'off',
        'no-shadow': 'off'
    },

    overrides: [ {
        files: [ './packages/*/tests/*.ts' ],

        rules: {
            'import/no-extraneous-dependencies': 'off',
            'node/no-extraneous-import': 'off'
        }
    }, {
        files: [ 'rollup.config.js', './scripts/register.js' ],

        rules: {
            'node/no-unpublished-require': 'off'
        }
    } ]
};
