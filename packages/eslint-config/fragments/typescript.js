// ESLint-relevant modules.
import TSESLint from 'typescript-eslint'

// Local helpers.
import { configurate } from '../helpers/configurator.js'
import { mapExtensionRules } from '../helpers/extension-rules-mapper.js'

export const configuration = configurate({
    files: [ '**/*.ts?(x)' ],

    extends: [
        TSESLint.configs.eslintRecommended,
        ...TSESLint.configs.recommended,
        ...TSESLint.configs.recommendedTypeChecked,
    ],

    plugins: {
        '@typescript-eslint': TSESLint.plugin,
    },

    rules: Object.assign(mapExtensionRules({
        /**
         * Forbids empty functions.
         *
         * @see {@link https://eslint.org/docs/rules/no-empty-function}
         */
        'no-empty-function': [ 'error', {
            allow: [ 'arrowFunctions', 'functions', 'methods' ],
        } ],

        /**
         * Forbids unused variables.
         *
         * @see {@link https://eslint.org/docs/rules/no-unused-vars}
         */
        'no-unused-vars': [ 'error', {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true,
        } ],

        /**
         * Allows async functions which have no await expression.
         *
         * @see {@link https://eslint.org/docs/rules/require-await}
         */
        'require-await': 'off',

    }), {

        /**
         * Enforces consistent usage of type assertions.
         *
         * @see {@link https://typescript-eslint.io/rules/consistent-type-assertions}
         */
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            {
                assertionStyle: 'as',
                objectLiteralTypeAssertions: 'allow',
            },
        ],

        /**
         * Enforces a consistent member delimiter style in interfaces and type literals.
         *
         * @see {@link https://typescript-eslint.io/rules/member-delimiter-style}
         */
        '@typescript-eslint/member-delimiter-style': [ 'error', {
            multiline: { delimiter: 'none', requireLast: true },
            singleline: { delimiter: 'semi', requireLast: false },

            overrides: {
                typeLiteral: {
                    singleline: { delimiter: 'comma', requireLast: false },
                },
            },
        } ],

        /**
         * Enforces a consistent member declaration order.
         *
         * @see {@link https://typescript-eslint.io/rules/member-ordering}
         */
        '@typescript-eslint/member-ordering': 'error',

        /**
         * Enforces naming conventions for everything across a codebase.
         *
         * @see {@link https://typescript-eslint.io/rules/naming-convention}
         */
        '@typescript-eslint/naming-convention': [ 'error', {
            selector: 'interface',
            format: [ 'PascalCase' ],
            custom: { regex: '^I[A-Z]', match: false },
        } ],

        /**
         * Allows the declaration of empty interfaces.
         *
         * @see {@link https://typescript-eslint.io/rules/no-empty-interface}
         */
        '@typescript-eslint/no-empty-interface': 'off',

        /**
         * Allows to use of the `any` type.
         *
         * @see {@link https://typescript-eslint.io/rules/no-explicit-any}
         */
        '@typescript-eslint/no-explicit-any': 'off',

        /**
         * Allows to assign `any` to variables and properties.
         *
         * @see {@link https://typescript-eslint.io/rules/no-unsafe-assignment}
         */
        '@typescript-eslint/no-unsafe-assignment': 'off',

        /**
         * Allows to call an `any` type value.
         *
         * @see {@link https://typescript-eslint.io/rules/no-unsafe-call}
         */
        '@typescript-eslint/no-unsafe-call': 'off',

        /**
         * Allows member access on `any` typed variables.
         *
         * @see {@link https://typescript-eslint.io/rules/no-unsafe-member-access}
         */
        '@typescript-eslint/no-unsafe-member-access': 'off',

        /**
         * Allows to return `any` from a function.
         *
         * @see {@link https://typescript-eslint.io/rules/no-unsafe-return}
         */
        '@typescript-eslint/no-unsafe-return': 'off',

        /**
         * Prefers to use concise optional chain expressions instead of chained logical `&&` operators.
         *
         * @see {@link https://typescript-eslint.io/rules/prefer-optional-chain}
         */
        '@typescript-eslint/prefer-optional-chain': 'error',

        /**
         * Prefers to use of the nullish coalescing operator instead of logical chaining.
         *
         * @see {@link https://typescript-eslint.io/rules/prefer-nullish-coalescing}
         */
        '@typescript-eslint/prefer-nullish-coalescing': 'error',

        /**
         * Enforces the use of `String#startsWith` and `String#endsWith` instead of other equivalent methods of checking substrings.
         *
         * @see {@link https://typescript-eslint.io/rules/prefer-string-starts-ends-with}
         */
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',

        /**
         * Allows to explicit type assertion on template expressions.
         *
         * @see {@link https://typescript-eslint.io/rules/no-unnecessary-type-assertion}
         */
        '@typescript-eslint/restrict-template-expressions': 'off',

        /**
         * Enforces consistent spacing around type annotations.
         *
         * @see {@link https://typescript-eslint.io/rules/type-annotation-spacing}
         */
        '@typescript-eslint/type-annotation-spacing': 'error',
    }),
})

export default configuration
