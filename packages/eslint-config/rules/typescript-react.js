/**
 * ESLint rules for TypeScript files with React.
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
module.exports = {
    /**
     * Prefers to use TypeScript's typings instead of `prop-types` module.
     *
     * @see {@link https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md}
     */
    'react/prop-types': 'off'
};
