// Third-party modules.
const lodash = require('lodash');

// Local helpers.
const { getOptionsOfBaseRule } = require('../helpers/base-rule-options-getter');

/**
 * ESLint rules for JavaScript files.
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
module.exports = {
    /**
     * Enforces spaces inside of brackets.
     *
     * @see {@link https://eslint.org/docs/rules/array-bracket-spacing}
     */
    'array-bracket-spacing': [ 'error', 'always' ],

    /**
     * Enforces parenthesis in arrow function arguments where they can't be omitted.
     *
     * @see {@link https://eslint.org/docs/rules/arrow-parens}
     */
    'arrow-parens': [ 'error', 'as-needed', {
        requireForBlockBody: false
    } ],

    /**
     * @see {@link https://eslint.org/docs/rules/camelcase}
     */
    camelcase: [ 'error', {
        properties: 'never'
    } ],

    /**
     * Forbids trailing commas.
     *
     * @see {@link https://eslint.org/docs/rules/comma-dangle}
     */
    'comma-dangle': [ 'error', 'never' ],

    /**
     * Enforces the consistent use of function declarations.
     *
     * @see {@link https://eslint.org/docs/rules/func-style}
     */
    'func-style': [ 'error', 'declaration', {
        allowArrowFunctions: true
    } ],

    /**
     * Enforces consistent use of file extension within the import path.
     *
     * @see {@link https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md}
     */
    'import/extensions': [ 'error', 'ignorePackages', {
        mjs: 'never',
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
    } ],

    /**
     * Allows modules to have too many dependencies.
     *
     * @see {@link https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/max-dependencies.md}
     */
    'import/max-dependencies': 'off',

    /**
     * Forbids `require()` calls with expressions.
     *
     * @see {@link https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md}
     */
    'import/no-dynamic-require': 'off',

    /**
     * Forbids the import of external modules that are not declared in the `package.json`.
     *
     * @see {@link https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md}
     */
    'import/no-extraneous-dependencies': [ 'error', {
        devDependencies: [
            ...getOptionsOfBaseRule('import/no-extraneous-dependencies').devDependencies,

            'configs/**',
            'scripts/**',
            'tests/**',

            '**/babel.config.js'
        ],

        optionalDependencies: false
    } ],

    /**
     * Enforces a convention in module import order.
     *
     * @see {@link https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md}
     */
    'import/order': [ 'error', {
        groups: [ 'builtin', 'external', [ 'internal', 'parent', 'sibling' ], 'index' ]
    } ],

    /**
     * Enforces consistent indentation.
     *
     * @see {@link https://eslint.org/docs/rules/indent}
     */
    indent: [ 'error', 4, {
        ...getOptionsOfBaseRule('indent'),

        SwitchCase: 0
    } ],

    /**
     * Enforces a maximum line length.
     *
     * @see {@link https://eslint.org/docs/rules/max-len}
     */
    'max-len': [ 'error', 120, 4, {
        ...getOptionsOfBaseRule('max-len'),

        ignoreComments: true,
        ignoreTrailingComments: true
    } ],

    /**
     * @see {@link https://eslint.org/docs/rules/max-statements}
     */
    'max-statements': [ 'error', 100, {
        ignoreTopLevelFunctions: true
    } ],

    /**
     * Allows `continue` statements.
     *
     * @see {@link https://eslint.org/docs/rules/no-continue}
     */
    'no-continue': 'off',

    /**
     * Forbids reassignment of function parameters.
     *
     * @see {@link https://eslint.org/docs/rules/no-param-reassign}
     */
    'no-param-reassign': [ 'error', {
        ignorePropertyModificationsFor: lodash.union([
            ...getOptionsOfBaseRule('no-param-reassign').ignorePropertyModificationsFor,

            // For non-abbreviated naming style.
            'event',
            'context',

            // For Fastify.
            'reply'
        ]),

        props: true
    } ],

    /**
     * Forbids certain object properties.
     *
     * @see {@link https://eslint.org/docs/rules/no-restricted-properties}
     */
    'no-restricted-properties': [ 'error',
        ...getOptionsOfBaseRule('no-restricted-properties'),

        {
            object: 'document',
            property: 'cookie',
            message: 'Do not use cookies.'
        },

        {
            property: 'forEach',
            message: 'Please use for..of loops instead.'
        }
    ],

    /**
     * Forbids specified syntax.
     *
     * @see {@link https://eslint.org/docs/rules/no-restricted-syntax}
     */
    'no-restricted-syntax': [ 'error',
        ...getOptionsOfBaseRule('no-restricted-syntax')
            .filter(({ selector }) => selector !== 'ForOfStatement'),

        {
            message: 'Do not use the execScript functions.',
            selector: 'CallExpression[name="execScript"]'
        }
    ],

    /**
     * Forbids self assignment.
     *
     * @see {@link https://eslint.org/docs/rules/no-self-assign}
     */
    'no-self-assign': [ 'error', {
        props: false
    } ],

    /**
     * Forbids warning comments.
     *
     * @see {@link https://eslint.org/docs/rules/no-warning-comments}
     */
    'no-warning-comments': [ 'warn', {
        location: 'anywhere',
        terms: [ 'BUG', 'HACK', 'FIXME', 'LATER', 'LATER2', 'TODO' ]
    } ],

    /**
     * Enforces to export with `module.exports`.
     *
     * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/exports-style.md}
     */
    'node/exports-style': [ 'error', 'module.exports' ],

    /**
     * Forbids import declarations which import non-existence modules.
     *
     * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-missing-import.md}
     */
    'node/no-missing-import': 'off',

    /**
     * Forbids unsupported ECMAScript syntax on the specified version.
     *
     * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-syntax.md}
     */
    'node/no-unsupported-features/es-syntax': 'off',

    /**
     * Enforces to use `Buffer` with `require('buffer')`.
     *
     * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/buffer.md}
     */
    'node/prefer-global/buffer': [ 'error', 'never' ],

    /**
     * Enforces to use `console` with `require('console')`.
     *
     * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/console.md}
     */
    'node/prefer-global/console': [ 'error', 'never' ],

    /**
     * Enforces to use `process` with `require('process')`.
     *
     * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/process.md}
     */
    'node/prefer-global/process': [ 'error', 'never' ],

    /**
     * Enforces to use `TextDecoder` with `require('util')`.
     *
     * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/text-decoder.md}
     */
    'node/prefer-global/text-decoder': [ 'error', 'never' ],

    /**
     * Enforces to use `TextEncoder` with `require('util')`.
     *
     * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/text-encoder.md}
     */
    'node/prefer-global/text-encoder': [ 'error', 'never' ],

    /**
     * Enforces to use `URL` with `require('url')`.
     *
     * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url.md}
     */
    'node/prefer-global/url': [ 'error', 'never' ],

    /**
     * Enforces to use `URLSearchParams` with `require('url')`.
     *
     * @see {@link https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url-search-params.md}
     */
    'node/prefer-global/url-search-params': [ 'error', 'never' ],

    /**
     * Enforce consistent line breaks after opening and before closing braces.
     *
     * @see {@link https://eslint.org/docs/rules/object-curly-newline}
     */
    'object-curly-newline': [ 'error', {
        ExportDeclaration: { consistent: true, minProperties: Infinity, multiline: true },
        ImportDeclaration: { consistent: true, minProperties: Infinity, multiline: true },
        ObjectExpression: { consistent: true, minProperties: Infinity, multiline: true },
        ObjectPattern: { consistent: true, minProperties: Infinity, multiline: true }
    } ],

    /**
     * Prefers destructuring from arrays and objects.
     *
     * @see {@link https://eslint.org/docs/rules/prefer-destructuring}
     */
    'prefer-destructuring': [ 'error', {
        AssignmentExpression: { array: true, object: true },
        VariableDeclarator: { array: false, object: true }
    }, {
        enforceForRenamedProperties: false
    } ],

    /**
     * Requires a whitespace on comment.
     *
     * @see {@link https://eslint.org/docs/rules/spaced-comment}
     */
    'spaced-comment': [ 'error', 'always', {
        block: {
            balanced: true,
            exceptions: [ '-', '+' ],
            markers: [ '=', '!' ]
        },

        line: {
            exceptions: [ '-', '+' ],
            markers: [ '/', '=', '!' ]
        }
    } ]
};
