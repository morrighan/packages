// Configuration fragments.
const rulesForJavaScript = require('./rules/javascript');
const rulesForTypeScript = require('./rules/typescript');
const rulesForJSX = require('./rules/javascript-react');
const rulesForTSX = require('./rules/typescript-react');

// Constants.
const extensions = [ '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json' ];

/** @type {import('eslint').Linter.Config} */
module.exports = {
    env: {
        es2024: true
    },

    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module'
    },

    plugins: [ 'import', 'promise' ],

    extends: [
        'airbnb',
        'airbnb/hooks',

        'plugin:node/recommended',
        'plugin:promise/recommended',
        'plugin:eslint-comments/recommended'
    ],

    rules: rulesForJavaScript,

    overrides: [ {
        files: [ '*.jsx', '*.tsx' ],

        parserOptions: {
            ecmaFeatures: { jsx: true }
        },

        rules: rulesForJSX
    }, {
        files: [ '*.ts', '*.tsx' ],
        plugins: [ '@typescript-eslint' ],

        extends: [
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-requiring-type-checking'
        ],

        rules: rulesForTypeScript
    }, {
        files: [ '*.tsx' ],
        rules: rulesForTSX
    } ],

    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': [ '.ts', '.tsx' ]
        },

        'import/extensions': extensions,
        'import/ignore': [ 'node_modules', '\\.(scss|css|svg|json)$' ],
        'import/core-modules': [],

        'import/resolver': {
            typescript: { extensions },
            node: { extensions }
        }
    }
};
