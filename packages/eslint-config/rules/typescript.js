// Local helpers.
const mapExtensionRules = require('../helpers/extension-rules-mapper');

/**
 * ESLint rules for TypeScript files.
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
module.exports = Object.assign(mapExtensionRules({
    /**
     * Forbids empty functions.
     *
     * @see {@link https://eslint.org/docs/rules/no-empty-function}
     */
    'no-empty-function': [ 'error', {
        allow: [ 'arrowFunctions', 'functions', 'methods' ]
    } ],

    /**
     * Forbids unused variables.
     *
     * @see {@link https://eslint.org/docs/rules/no-unused-vars}
     */
    'no-unused-vars': [ 'error', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true
    } ],

    /**
     * Allows async functions which have no await expression.
     *
     * @see {@link https://eslint.org/docs/rules/require-await}
     */
    'require-await': 'off'

}), {

    /**
     * Enforces consistent usage of type assertions.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md}
     */
    '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow'
        }
    ],

    /**
     * Enforces a consistent member delimiter style in interfaces and type literals.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md}
     */
    '@typescript-eslint/member-delimiter-style': [ 'error', {
        multiline: { delimiter: 'semi', requireLast: true },
        singleline: { delimiter: 'semi', requireLast: false },

        overrides: {
            typeLiteral: {
                singleline: { delimiter: 'comma', requireLast: false }
            }
        }
    } ],

    /**
     * Enforces a consistent member declaration order.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md}
     */
    '@typescript-eslint/member-ordering': 'error',

    /**
     * Enforces naming conventions for everything across a codebase.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md}
     */
    '@typescript-eslint/naming-convention': [ 'error', {
        selector: 'interface',
        format: [ 'PascalCase' ],
        custom: { regex: '^I[A-Z]', match: false }
    } ],

    /**
     * Allows the declaration of empty interfaces.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-interface.md}
     */
    '@typescript-eslint/no-empty-interface': 'off',

    /**
     * Allows to use of the `any` type.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md}
     */
    '@typescript-eslint/no-explicit-any': 'off',

    /**
     * Allows to assign `any` to variables and properties.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md}
     */
    '@typescript-eslint/no-unsafe-assignment': 'off',

    /**
     * Allows to call an `any` type value.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md}
     */
    '@typescript-eslint/no-unsafe-call': 'off',

    /**
     * Allows member access on `any` typed variables.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md}
     */
    '@typescript-eslint/no-unsafe-member-access': 'off',

    /**
     * Allows to return `any` from a function.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-return.md}
     */
    '@typescript-eslint/no-unsafe-return': 'off',

    /**
     * Prefers to use concise optional chain expressions instead of chained logical `&&` operators.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md}
     */
    '@typescript-eslint/prefer-optional-chain': 'error',

    /**
     * Prefers to use of the nullish coalescing operator instead of logical chaining.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md}
     */
    '@typescript-eslint/prefer-nullish-coalescing': 'error',

    /**
     * Enforces the use of `String#startsWith` and `String#endsWith` instead of other equivalent methods of checking substrings.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md}
     */
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',

    /**
     * Enforces consistent spacing around type annotations.
     *
     * @see {@link https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/type-annotation-spacing.md}
     */
    '@typescript-eslint/type-annotation-spacing': 'error'
});
